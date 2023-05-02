import { useEffect, useRef } from "react";
import * as d3 from "d3";
import useResizeObserver from "use-resize-observer";
import classNames from "classnames";
import numeral from "numeral";

import { getKeysSortedByField } from "@/shared/utils";

import styles from "./StackedBarChart.module.css";

export interface StackedBarChartData {
  stackConfig: { [stack: string]: StackedBarStackItem };
  values: { [group: string]: StackedBarChartDataItem };
}

export interface StackedBarStackItem {
  title: string;
  color: string;
  order?: number;
}

export interface StackedBarChartDataItem {
  title: string;
  stack: Record<string, number>;
}

export interface StackedBarChartProps {
  data: StackedBarChartData;
  className?: string;
  margin?: Margin;
}

interface Margin {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

function addXAxis({
  xScale,
  data,
  chart,
  margin,
  containerHeight,
}: {
  xScale: d3.ScaleBand<string>;
  data: StackedBarChartData;
  chart: d3.Selection<SVGGElement, unknown, null, undefined>;
  margin: Margin;
  containerHeight: number;
}) {
  const xAxis = d3
    .axisBottom(xScale)
    .tickSize(0)
    .tickFormat((d) => data.values[d].title)
    .tickPadding(10);
  const xAxisGroup = chart
    .append("g")
    .attr(
      "transform",
      `translate(${margin.left},${containerHeight - margin.bottom})`
    )
    .call(xAxis);
  xAxisGroup.select(".domain").remove();
  xAxisGroup
    .selectAll("text")
    .attr("color", "#343434")
    .attr("font-size", "0.875rem");
}

function addYAxis({
  yScale,
  chart,
  margin,
  containerWidth,
}: {
  yScale: d3.ScaleLinear<number, number>;
  chart: d3.Selection<SVGGElement, unknown, null, undefined>;
  margin: Margin;
  containerWidth: number;
}) {
  const yAxis = d3
    .axisLeft(yScale)
    .tickSize(-containerWidth + margin.right + margin.left)
    .tickFormat((d) => numeral(d).format("0.[0]a"))
    .ticks(5);
  const yAxisGroup = chart
    .append("g")
    .attr("transform", `translate(${margin.left},${margin.top})`)
    .call(yAxis);
  yAxisGroup.select(".domain").remove();
  yAxisGroup
    .selectAll("line")
    .attr("stroke", "#B9B9B9")
    .attr("stroke-dasharray", 8);
  yAxisGroup
    .selectAll("text")
    .attr("color", "#343434")
    .attr("font-size", "0.875rem");
}

function addTooltip({
  svgEl,
  data,
  containerWidth,
  containerHeight,
}: {
  svgEl: d3.Selection<null, unknown, null, undefined>;
  data: StackedBarChartData;
  containerWidth: number;
  containerHeight: number;
}) {
  const tooltip = svgEl.append("g").style("opacity", 0);

  const showTooltip = function ({ target }: PointerEvent, d: any) {
    const {
      x: segmentX,
      y: segmentY,
      width: segmentWidth,
    } = (target as SVGGraphicsElement)?.getBBox();

    tooltip.attr("transform", "scale(1, 1)");
    let translateX = segmentX + segmentWidth + 6;
    let translateY = segmentY;
    tooltip.attr("transform", `translate(${translateX}, ${translateY})`);

    const background = tooltip
      .append("rect")
      .attr("class", styles.tooltipBackground);

    const tooltipMargin = { top: 24, right: 16, bottom: 12, left: 16 };

    const tooltipTitle = tooltip
      .append("text")
      .attr("class", styles.tooltipTitle)
      .attr(
        "transform",
        `translate(${tooltipMargin.left}, ${tooltipMargin.top})`
      )
      .attr("dominant-baseline", "middle")
      .text(data.values[d.data._group].title);

    const tooltipTitleHeight =
      tooltipTitle.node()?.getBoundingClientRect().height ?? 0;

    const items: { item: any; value: string }[] = [];
    getKeysSortedByField(data.stackConfig, "order")
      .reverse()
      .forEach((key, index) => {
        const item = tooltip
          .append("g")
          .attr(
            "transform",
            `translate(${tooltipMargin.left}, ${
              tooltipMargin.top + tooltipTitleHeight + 12 + 24 * index
            })`
          )
          .attr("class", styles.tooltipItem);

        const indicatorRadius = 5;
        item
          .append("circle")
          .attr("r", indicatorRadius)
          .attr("cx", indicatorRadius)
          .attr("fill", data.stackConfig[key].color);
        item
          .append("text")
          .attr("dominant-baseline", "middle")
          .attr("transform", `translate(${indicatorRadius * 2 + 6}, 1)`)
          .text(`${key}:`);

        items.push({ item, value: numeral(d.data[key]).format("0.[0]a") });
      });

    const maxKeyWidth = d3.max(
      items,
      ({ item }) => item.node().getBoundingClientRect().width
    );

    items.forEach(({ item, value }) => {
      item
        .append("text")
        .attr("dominant-baseline", "middle")
        .attr(
          "transform",
          `translate(${tooltipMargin.left + maxKeyWidth + 24})`
        )
        .attr("class", styles.tooltipValue)
        .text(value);
    });

    const { width: tooltipWidth = 0, height: tooltipHeight = 0 } =
      tooltip.node()?.getBBox() ?? {};

    background
      .style("width", tooltipWidth + tooltipMargin.left + tooltipMargin.right)
      .style("height", tooltipHeight + tooltipMargin.top);

    const { width: tooltipBgWidth = 0, height: tooltipBgHeight = 0 } =
      background.node()?.getBBox() ?? {};

    if (translateX + tooltipBgWidth > containerWidth) {
      translateX = segmentX - tooltipBgWidth - 6;
    }
    if (translateY + tooltipBgHeight > containerHeight - 6) {
      translateY = containerHeight - tooltipBgHeight - 6;
    }

    tooltip.attr("transform", `translate(${translateX}, ${translateY})`);

    tooltip.style("opacity", 1);
  };

  const hideTooltip = function () {
    tooltip.attr("transform", "scale(0, 1)");
    tooltip.style("opacity", 0);
    tooltip.selectAll("*").remove();
  };

  return {
    showTooltip,
    hideTooltip,
  };
}

function addStackSegment({
  chart,
  data,
  stackedData,
  xScale,
  yScale,
  margin,
  showTooltip,
  hideTooltip,
  isRounded = false,
}: {
  chart: d3.Selection<SVGGElement, unknown, null, undefined>;
  data: StackedBarChartData;
  stackedData: d3.Series<any, any>[];
  xScale: d3.ScaleBand<string>;
  yScale: d3.ScaleLinear<number, number>;
  margin: Margin;
  showTooltip: (event: PointerEvent, d: any) => void;
  hideTooltip: (event: PointerEvent, d: any) => void;
  isRounded?: boolean;
}) {
  const segment = chart
    .append("g")
    .selectAll("g")
    .data(stackedData)
    .enter()
    .append("g")
    .attr("fill", (d) => data.stackConfig[d.key].color)
    .selectAll(isRounded ? "path" : "rect")
    .data((d) => d)
    .enter()
    .append(isRounded ? "path" : "rect");

  if (isRounded) {
    segment.attr("d", (d) => {
      const xStart = (xScale(d.data._group) as number) + margin.left;
      const yStart = yScale(d[0]) + margin.top;
      const cornerRadius = 8;

      let path = `
          M${xStart},${yStart}
          h${xScale.bandwidth()}
          v${-(yScale(d[0]) - yScale(d[1]) - cornerRadius)}
          q0,${-cornerRadius} ${-cornerRadius},${-cornerRadius}
          h${-(xScale.bandwidth() - cornerRadius * 2)}
          q${-cornerRadius},0 ${-cornerRadius},${cornerRadius}
          z`;

      return path;
    });
  } else {
    segment
      .attr(
        "x",
        (d) =>
          (xScale(d.data._group as unknown as string) as number) + margin.left
      )
      .attr("y", (d) => yScale(d[1]) + margin.top)
      .attr("height", (d) => yScale(d[0]) - yScale(d[1]) + 1) // +1 to prevent tiny horizontal gaps between stack segments.
      .attr("width", xScale.bandwidth());
  }

  segment.on("mouseenter", showTooltip).on("mouseleave", hideTooltip);
}

export default function StackedBarChart({
  className,
  data,
  margin = { top: 10, right: 30, bottom: 30, left: 50 },
}: StackedBarChartProps) {
  const svgRef = useRef(null);
  const {
    ref: containerRef,
    width: containerWidth,
    height: containerHeight,
  } = useResizeObserver<HTMLDivElement>();

  useEffect(() => {
    if (!containerWidth || !containerHeight) {
      return;
    }

    const svgEl = d3
      .select(svgRef.current)
      .attr("width", containerWidth)
      .attr("height", containerHeight);
    svgEl.selectAll("*").remove();
    const chart = svgEl.append("g");

    const xScale = d3
      .scaleBand()
      .domain(Object.keys(data.values))
      .range([0, containerWidth - margin.left - margin.right])
      .padding(0.3);

    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(Object.values(data.values), (d) =>
          d3.sum(Object.values(d.stack))
        ) as number,
      ])
      .range([containerHeight - margin.top - margin.bottom, 0]);

    const stackedData = d3
      .stack<any, any>()
      .keys(getKeysSortedByField(data.stackConfig, "order"))(
      Object.entries(data.values).map(([group, { stack }]) => ({
        _group: group,
        ...stack,
      }))
    );

    // Grid
    addXAxis({
      xScale,
      data,
      chart,
      margin,
      containerHeight,
    });
    addYAxis({
      yScale,
      chart,
      margin,
      containerWidth,
    });

    const { showTooltip, hideTooltip } = addTooltip({
      svgEl,
      data,
      containerWidth,
      containerHeight,
    });

    const lastStackedDataItem = stackedData.pop();
    if (stackedData.length) {
      addStackSegment({
        chart,
        data,
        stackedData,
        xScale,
        yScale,
        margin,
        showTooltip,
        hideTooltip,
      });
    }
    if (lastStackedDataItem) {
      addStackSegment({
        chart,
        data,
        stackedData: [lastStackedDataItem],
        xScale,
        yScale,
        margin,
        showTooltip,
        hideTooltip,
        isRounded: true,
      });
    }
  }, [containerHeight, containerWidth, data, margin]);

  return (
    <div className={classNames(styles.container, className)} ref={containerRef}>
      <svg ref={svgRef}></svg>
    </div>
  );
}
