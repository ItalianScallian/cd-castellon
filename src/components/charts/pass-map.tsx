import { useEffect } from 'react';
import * as d3 from 'd3';
import castellonData from '../../../data/data.json';

type PassMapProps = {
  currentMatch?: string;
};

const PassMap = ({ currentMatch }: PassMapProps) => {
  const passes = castellonData.passes;

  useEffect(() => {
    // Assuming the SVG is already in place
    const svg = d3.select('#passMapSvg');
    const width = +svg.attr('width');
    const height = +svg.attr('height');

    // Scale functions
    const xScale = d3.scaleLinear().domain([0, 120]).range([0, width]);
    const yScale = d3.scaleLinear().domain([0, 80]).range([0, height]);

    // Color scale
    const colorScale = d3.scaleSequential(d3.interpolateBlues).domain([0, 1]);

    // Clear previous passes
    svg.selectAll('line').remove();

    // Draw passes
    svg
      .selectAll('line')
      .data(passes)
      .enter()
      .append('line')
      .attr('x1', (d) => xScale(d.location_x))
      .attr('y1', (d) => yScale(d.location_y))
      .attr('x2', (d) => xScale(d.pass_end_location_x))
      .attr('y2', (d) => yScale(d.pass_end_location_y))
      .attr('stroke', (d) => colorScale(d.obv_added))
      .attr('stroke-width', 2);
  }, [passes]);

  return <svg id='passMapSvg' width='600' height='400' style={{ border: '1px solid black' }}></svg>;
};

export default PassMap;
