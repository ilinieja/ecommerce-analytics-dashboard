import { useEffect, useRef } from "react";
import * as d3 from "d3";
import useResizeObserver from "use-resize-observer";
import classNames from "classnames";

import { TimelineDataItem } from "@/shared/timeline";

import styles from "./MiniTimelineChart.module.css";

export interface MiniTimelineChartProps {
  data: TimelineDataItem[];
  className?: string;
}

export default function MiniTimelineChart({
  data,
  className,
}: MiniTimelineChartProps) {
  const svgRef = useRef(null);
  const {
    ref: containerRef,
    width: containerWidth,
    height: containerHeight,
  } = useResizeObserver<HTMLDivElement>();

  useEffect(() => {
    if (!containerWidth || !containerHeight || !data.length) {
      return;
    }

    const xScale = d3
      .scaleTime()
      .domain(d3.extent(data, (d) => d.date) as [Date, Date])
      .range([0, containerWidth]);

    const yScale = d3
      .scaleLinear()
      .domain(d3.extent(data, (d) => d.value) as [number, number])
      .range([containerHeight, 0]);

    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove();
    const svg = svgEl.append("g");

    svgEl
      .append("linearGradient")
      .attr("id", "line-gradient")
      .attr("gradientUnits", "userSpaceOnUse")
      .attr("x1", 0)
      .attr("y1", yScale(0))
      .attr("x2", 0)
      .attr("y2", yScale(d3.max(data, (d) => d.value) as number))
      .selectAll("stop")
      .data([
        { offset: "50%", color: "#F95D6A" },
        { offset: "100%", color: "#2F4B7C" },
      ])
      .enter()
      .append("stop")
      .attr("offset", (d) => d.offset)
      .attr("stop-color", (d) => d.color);

    const line = d3
      .line<TimelineDataItem>()
      .x((d) => xScale(d.date))
      .y((d) => yScale(d.value))
      .curve(d3.curveBasis);

    svg
      .selectAll(".line")
      .data([data])
      .enter()
      .append("path")
      .attr("fill", "none")
      .attr("stroke", "url(#line-gradient)")
      .attr("stroke-width", 2)
      .attr("d", line(data));
  }, [containerWidth, containerHeight, data]);

  return (
    <div className={classNames(styles.container, className)} ref={containerRef}>
      <svg ref={svgRef} width={containerWidth} height={containerHeight} />
    </div>
  );
}
