import numeral from "numeral";
import * as d3 from "d3";
import classNames from "classnames";

import styles from "./PercentageCircleChart.module.css";
import { useEffect, useRef } from "react";
import useResizeObserver from "use-resize-observer";

export interface PercentageCircleChartProps {
  color: string;
  value: number;
  total: number;
  className?: string;
}

export function PercentageCircleChart({
  color,
  value,
  total,
  className,
}: PercentageCircleChartProps) {
  const svgRef = useRef(null);
  const {
    ref: containerRef,
    width: containerWidth = 0,
    height: containerHeight = 0,
  } = useResizeObserver<HTMLDivElement>();

  useEffect(() => {
    const part = value / total;
    const percentage = numeral(part).format("0%");

    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove();
    const chart = svgEl.append("g");

    const outerRadius = Math.min(containerWidth, containerHeight) * 0.5;
    const thickness = 8;

    const bgArc: any = d3
      .arc()
      .startAngle(0)
      .endAngle(2 * Math.PI)
      .innerRadius(outerRadius - thickness)
      .outerRadius(outerRadius);
    chart
      .append("path")
      .attr("fill", "#DCDCDC")
      .attr(
        "transform",
        `translate(${containerWidth / 2},${containerHeight / 2})`
      )
      .attr("d", bgArc());

    const arc: any = d3
      .arc()
      .startAngle(0)
      .endAngle(part * 2 * Math.PI)
      .innerRadius(outerRadius - thickness)
      .outerRadius(outerRadius)
      .cornerRadius(5);
    chart
      .append("path")
      .attr("fill", color)
      .attr(
        "transform",
        `translate(${containerWidth / 2},${containerHeight / 2})`
      )
      .attr("d", arc());

    chart
      .append("text")
      .attr("class", styles.text)
      .attr("data-testid", "PercentageCircleChart_text")
      .attr("fill", color)
      .attr("font-size", percentage.length > 3 ? "0.6rem" : "0.8rem")
      .attr(
        "transform",
        `translate(${containerWidth / 2},${containerHeight / 2})`
      )
      .text(percentage);
  }, [containerWidth, containerHeight, value, total, color]);

  return (
    <div ref={containerRef} className={classNames(styles.container, className)}>
      <svg ref={svgRef} width={containerWidth} height={containerHeight}></svg>
    </div>
  );
}
