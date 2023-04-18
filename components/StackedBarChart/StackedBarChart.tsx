import { useEffect, useRef } from "react";
import * as d3 from "d3";
import useResizeObserver from "use-resize-observer";
import classNames from "classnames";

import styles from "./StackedBarChart.module.css";

export interface StackedBarChartData {
  groups: { [group: string]: { title: string } };
  subgroups: { [subgroup: string]: { title: string; color: string } };
  values: Array<{
    group: string;
    subgroups: { [subgroup: string]: number };
  }>;
}

export interface StackedBarChartProps {
  data: StackedBarChartData;
  className?: string;
  margin?: { top: number; right: number; bottom: number; left: number };
}

export default function StackedBarChart({
  className,
  data,
  margin = { top: 10, right: 30, bottom: 50, left: 50 },
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
      .domain(Object.keys(data.groups))
      .range([0, containerWidth - margin.left - margin.right])
      .padding(0.3);

    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data.values, (d) =>
          d3.sum(Object.values(d.subgroups))
        ) as number,
      ])
      .range([containerHeight - margin.top - margin.bottom, 0]);

    const stackedData = d3.stack().keys(Object.keys(data.subgroups))(
      data.values.map(({ group, subgroups }) => ({
        _group: group as unknown as number,
        ...subgroups,
      }))
    );

    // Grid
    const xAxis = d3
      .axisBottom(xScale)
      .tickSize(0)
      .tickFormat((d) => data.groups[d].title)
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

    const yAxis = d3
      .axisLeft(yScale)
      .tickSize(-containerWidth + margin.right + margin.left)
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

    // Chart
    // Draw bottom items using plain "rect" and then top items separately - they need rounded corners
    // and require "path" usage.
    const lastStackedDataItem = stackedData.pop();

    if (stackedData.length) {
      chart
        .append("g")
        .selectAll("g")
        .data(stackedData)
        .enter()
        .append("g")
        .attr("fill", (d) => data.subgroups[d.key].color)
        .selectAll("rect")
        .data((d) => d)
        .enter()
        .append("rect")
        .attr(
          "x",
          (d) =>
            (xScale(d.data._group as unknown as string) as number) + margin.left
        )
        .attr("y", (d) => yScale(d[1]) + margin.top)
        .attr("height", (d) => yScale(d[0]) - yScale(d[1]))
        .attr("width", xScale.bandwidth())
        .attr("y", (d) => yScale(d[1]) + margin.top);
    }

    if (lastStackedDataItem) {
      chart
        .append("g")
        .selectAll("g")
        .data([lastStackedDataItem])
        .enter()
        .append("g")
        .attr("fill", () => data.subgroups[lastStackedDataItem.key].color)
        .selectAll("path")
        .data((d) => d)
        .enter()
        .append("path")
        .attr("d", (d) => {
          const xStart =
            (xScale(d.data._group as unknown as string) as number) +
            margin.left;
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
    }
  }, [containerHeight, containerWidth, data]);

  return (
    <div className={classNames(styles.container, className)} ref={containerRef}>
      <svg ref={svgRef}></svg>
    </div>
  );
}
