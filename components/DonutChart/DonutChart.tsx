import { useEffect, useRef } from "react";
import classNames from "classnames";
import numeral from "numeral";
import * as d3 from "d3";
import useResizeObserver from "use-resize-observer";

import { getValuesSortedByField } from "@/shared/utils";

import styles from "./DonutChart.module.css";

export interface DonutChartSegment {
  title: string;
  color: string;
  value: number;
  order?: number;
}

export interface DonutChartData {
  [segment: string]: DonutChartSegment;
}

export interface DonutChartProps {
  data: DonutChartData;
  className?: string;
  margin?: number;
}

export function DonutChart({ data, className, margin = 0 }: DonutChartProps) {
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
    const chart = svgEl
      .append("g")
      .attr(
        "transform",
        `translate(${containerWidth / 2},${containerHeight / 2})`
      );

    const radius = Math.min(containerWidth, containerHeight) / 2 - margin;
    const pieData = d3
      .pie<DonutChartSegment>()
      .sort(null)
      .value((d) => d.value)(getValuesSortedByField(data, "order"));

    const dataArc: any = d3
      .arc()
      .innerRadius(radius * 0.5)
      .outerRadius(radius * 0.8);
    const labelsArc: any = d3.arc().innerRadius(radius).outerRadius(radius);

    chart
      .selectAll("data")
      .data(pieData)
      .join("path")
      .attr("d", dataArc)
      .attr("fill", (d) => d.data.color);

    chart
      .selectAll("labels")
      .data(pieData)
      .join("text")
      .text((d) => numeral(d.data.value).format("$0.0a"))
      .each(function (d) {
        const pos = labelsArc.centroid(d);
        const midAngle = d.startAngle + (d.endAngle - d.startAngle) / 2;
        pos[0] = radius * (midAngle < Math.PI ? 1 : -1);

        const element = d3.select(this);
        element.attr("transform", `translate(${pos})`);
        element.attr("font-size", `0.825rem`);
        element.attr("fill", `#343434`);

        if (pos[0] > 0) {
          element.attr("text-anchor", "end");
        }

        if (pos[1] < 0) {
          element.attr("dominant-baseline", "hanging");
        }
      });
  }, [containerHeight, containerWidth, data, margin]);

  return (
    <div ref={containerRef} className={classNames(styles.container, className)}>
      <svg ref={svgRef} width={containerWidth} height={containerHeight}></svg>
    </div>
  );
}
