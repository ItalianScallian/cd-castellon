import * as d3 from 'd3';
import { useEffect, useRef, useState } from 'react';
import castellonData from '../../../data/data.json';
import { countPassesAndValue } from '@/services/countPassesAndValue';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import findAveragePlayerPositions from '@/services/findAveragePlayerPositions';
import commonPlayerCombinations from '@/services/mostCommonPlayerCombinations';

type SoccerPitchProps = {
  matchId?: number;
};

type TeamOption = {
  team_id: number;
  team_name: string;
};

const SoccerPitch = ({ matchId }: SoccerPitchProps) => {
  const ref = useRef(null);
  const { matches, formation_players, passes } = castellonData;
  const [teamOptions, setTeamOptions] = useState<TeamOption[]>([]);
  const [teamName, setTeamName] = useState('');
  const pitchWidth = 120;
  const pitchHeight = 80;
  const keeperBoxWidth = 18;
  const keeperBoxHeight = 44;
  const yardBoxWidth = 6;
  const yardBoxHeight = 20;
  const scaleX = 8;
  const scaleY = 8;

  useEffect(() => {
    setTeamName('');
    const match = matches.find((m) => m.match_id === matchId);
    if (match) {
      setTeamOptions([
        { team_id: match.home_team_id, team_name: match.home_team_name },
        { team_id: match.away_team_id, team_name: match.away_team_name },
      ]);
    } else {
      const teamSet = new Set(); // Using a set to avoid duplicates
      matches.forEach((match) => {
        teamSet.add(JSON.stringify({ team_id: match.home_team_id, team_name: match.home_team_name }));
        teamSet.add(JSON.stringify({ team_id: match.away_team_id, team_name: match.away_team_name }));
      });

      // @ts-ignore
      const uniqueTeams = Array.from(teamSet).map((team) => JSON.parse(team));
      setTeamOptions(uniqueTeams);
    }
  }, [matchId]);

  useEffect(() => {
    const filtered_players = formation_players
      .filter((player) => player.match_id === matchId || matchId === undefined)
      .filter((player) => player.team_name === teamName || teamName === '');
    const combinations = commonPlayerCombinations(matchId, teamName);
    const svg = d3
      .select(ref.current)
      .attr('width', pitchWidth * scaleX)
      .attr('height', 100 * scaleY)
      .attr('viewBox', `0 0 ${pitchWidth} ${100}`)
      .style('border', '2px solid #000')
      .attr('class', 'soccer-pitch');

    // create pitch
    svg
      .append('rect')
      .attr('x', 0)
      .attr('y', 0)
      .attr('width', pitchWidth)
      .attr('height', pitchHeight)
      .attr('fill', 'none')
      .attr('stroke', 'grey')
      .attr('stroke-width', 0.5)
      .attr('class', 'soccer-pitch');

    // create keeper boxes
    svg
      .append('rect')
      .attr('x', 102)
      .attr('y', 18)
      .attr('width', keeperBoxWidth)
      .attr('height', keeperBoxHeight)
      .attr('fill', 'none')
      .attr('stroke', 'grey')
      .attr('stroke-width', 0.5)
      .attr('class', 'soccer-pitch');

    svg
      .append('rect')
      .attr('x', 0)
      .attr('y', 18)
      .attr('width', keeperBoxWidth)
      .attr('height', keeperBoxHeight)
      .attr('fill', 'none')
      .attr('stroke', 'grey')
      .attr('stroke-width', 0.5)
      .attr('class', 'soccer-pitch');

    // create 6 yard boxes
    svg
      .append('rect')
      .attr('x', 114)
      .attr('y', 30)
      .attr('width', yardBoxWidth)
      .attr('height', yardBoxHeight)
      .attr('fill', 'none')
      .attr('stroke', 'grey')
      .attr('stroke-width', 0.5)
      .attr('class', 'soccer-pitch');

    svg
      .append('rect')
      .attr('x', 0)
      .attr('y', 30)
      .attr('width', yardBoxWidth)
      .attr('height', yardBoxHeight)
      .attr('fill', 'none')
      .attr('stroke', 'grey')
      .attr('stroke-width', 0.5)
      .attr('class', 'soccer-pitch');

    // create center circle
    svg
      .append('circle')
      .attr('cx', 60)
      .attr('cy', 40)
      .attr('r', 9.15)
      .attr('fill', 'none')
      .attr('stroke', 'grey')
      .attr('stroke-width', 0.5)
      .attr('class', 'soccer-pitch');

    // Add the center line
    svg
      .append('line')
      .attr('x1', 60)
      .attr('y1', 0)
      .attr('x2', 60)
      .attr('y2', 80)
      .attr('stroke', 'grey')
      .attr('stroke-width', 0.3)
      .attr('class', 'soccer-pitch');

    // add points for penalty spots and center
    svg
      .append('circle')
      .attr('cx', 12)
      .attr('cy', 40)
      .attr('r', 0.5)
      .attr('fill', 'grey')
      .attr('class', 'soccer-pitch');
    svg
      .append('circle')
      .attr('cx', 60)
      .attr('cy', 40)
      .attr('r', 0.5)
      .attr('fill', 'grey')
      .attr('class', 'soccer-pitch');
    svg
      .append('circle')
      .attr('cx', 108)
      .attr('cy', 40)
      .attr('r', 0.5)
      .attr('fill', 'grey')
      .attr('class', 'soccer-pitch');

    // add two lines to be the goals in a darker color (red)
    svg
      .append('line')
      .attr('x1', 0)
      .attr('y1', 36)
      .attr('x2', 0)
      .attr('y2', 44)
      .attr('stroke', 'red')
      .attr('stroke-width', 2)
      .attr('class', 'soccer-pitch');

    svg
      .append('line')
      .attr('x1', 120)
      .attr('y1', 36)
      .attr('x2', 120)
      .attr('y2', 44)
      .attr('stroke', 'red')
      .attr('stroke-width', 2)
      .attr('class', 'soccer-pitch');

    const { passCount, passValue } = countPassesAndValue(teamName, matchId);
    const passCountsByTeamArray = Array.from(passCount.values());
    const passValuesByTeamArray = Array.from(passValue.values());

    const extentPassCounts = d3.extent(passCountsByTeamArray);
    const safeMaxPasses = extentPassCounts[1] ?? 0;
    const extentPassValues = d3.extent(passValuesByTeamArray);
    const safeMaxValues = extentPassValues[1] ?? 0;
    const safeMinValues = extentPassValues[0] ?? 0;

    const maxCountCombinationPasses = combinations[0]?.count;
    const maxValueCombinationPasses = combinations.sort((a, b) => b.totalValueAdded - a.totalValueAdded)[0]
      ?.totalValueAdded;
    const minValueCombinationPasses = combinations[combinations.length - 1]?.totalValueAdded;
    const dotColorScale = d3.scaleSequential(d3.interpolateRgb('blue', 'red')).domain([safeMinValues, safeMaxValues]);
    const dotSizeScale = d3.scaleSqrt().domain([0, safeMaxPasses]).range([0.5, 2]); // range of circle radius
    const lineColorScale = d3
      .scaleSequential(d3.interpolateRgb('blue', 'red'))
      .domain([minValueCombinationPasses, maxValueCombinationPasses]);
    const lineSizeScale = d3.scaleLinear().domain([0, maxCountCombinationPasses]).range([0, 0.5]);
    const findAveragePosition = findAveragePlayerPositions(matchId, teamName);

    d3.select('.player-circles').remove();
    d3.select('.player-passes').remove();
    d3.select('.player-text').remove();
    d3.select('.changing-legend').remove();

    const playerPassesLayer = svg.append('g').attr('class', 'player-passes');
    const playerCirclesLayer = svg.append('g').attr('class', 'player-circles');
    const playerTextLayer = svg.append('g').attr('class', 'player-text');

    // draw the passes first so they appear in the background of d3.js
    combinations.forEach((combination) => {
      playerPassesLayer
        .append('line')
        .attr('x1', findAveragePosition[combination.passer_id].avgX)
        .attr('y1', findAveragePosition[combination.passer_id].avgY)
        .attr('x2', findAveragePosition[combination.recipient_id].avgX)
        .attr('y2', findAveragePosition[combination.recipient_id].avgY)
        .attr('stroke', lineColorScale(combination.totalValueAdded))
        .attr('stroke-width', lineSizeScale(combination.count));
    });

    // handle all the drawings for each player - also I know this isnt the fastest way to do this but i haven't worked with d3.js before
    filtered_players.forEach((position) => {
      playerCirclesLayer
        .append('circle')
        .attr('cx', findAveragePosition[position.player_id].avgX)
        .attr('cy', findAveragePosition[position.player_id].avgY)
        .attr('r', dotSizeScale(passCount.get(position.player_id) || 0)) // Size of the dot
        .attr('fill', 'none')
        .attr('stroke', dotColorScale(passValue.get(position.player_id) || 0))
        .attr('stroke-width', 0.2);
      playerTextLayer
        .append('text')
        .attr('x', findAveragePosition[position.player_id].avgX)
        .attr('y', findAveragePosition[position.player_id].avgY)
        .attr('dy', '.35em') // Center the text vertically
        .text(position.player_name)
        .attr('text-anchor', 'middle') // Center the text horizontally
        .style('font-size', '1.5px')
        .style('fill', 'grey');
    });

    const legend = svg.append('g').attr('class', 'legend');
    legend.append('text').attr('x', 0).attr('y', 83).text('Legend').style('font-size', '3px').style('fill', 'grey');
    legend
      .append('text')
      .attr('x', 0)
      .attr('y', 87)
      .text('Line Width:')
      .style('font-size', '1.5px')
      .style('fill', 'grey');
    legend
      .append('text')
      .attr('x', 45)
      .attr('y', 87)
      .text('Line Color:')
      .style('font-size', '1.5px')
      .style('fill', 'grey');
    legend
      .append('text')
      .attr('x', 0)
      .attr('y', 94)
      .text('Circle Size:')
      .style('font-size', '1.5px')
      .style('fill', 'grey');
    legend
      .append('text')
      .attr('x', 45)
      .attr('y', 94)
      .text('Circle Color:')
      .style('font-size', '1.5px')
      .style('fill', 'grey');
    const changingLegend = svg.append('g').attr('class', 'changing-legend');
    changingLegend
      .append('text')
      .attr('x', 10)
      .attr('y', 87)
      .text('1 completed pass')
      .style('font-size', '1.5px')
      .style('fill', 'grey');
    changingLegend
      .append('text')
      .attr('x', 25)
      .attr('y', 87)
      .text(`${maxCountCombinationPasses} completed passes`)
      .style('font-size', '1.5px')
      .style('fill', 'grey');
    changingLegend
      .append('line')
      .attr('x1', 12)
      .attr('y1', 85)
      .attr('x2', 20)
      .attr('y2', 83)
      .attr('stroke', 'grey')
      .attr('stroke-width', lineSizeScale(1));
    changingLegend
      .append('line')
      .attr('x1', 27)
      .attr('y1', 85)
      .attr('x2', 35)
      .attr('y2', 83)
      .attr('stroke', 'grey')
      .attr('stroke-width', lineSizeScale(maxCountCombinationPasses));
    changingLegend
      .append('text')
      .attr('x', 55)
      .attr('y', 87)
      .text(`${minValueCombinationPasses} added value`)
      .style('font-size', '1.5px')
      .style('fill', 'grey');
    changingLegend
      .append('text')
      .attr('x', 75)
      .attr('y', 87)
      .text(`${maxValueCombinationPasses} added value`)
      .style('font-size', '1.5px')
      .style('fill', 'grey');
    changingLegend
      .append('line')
      .attr('x1', 57)
      .attr('y1', 85)
      .attr('x2', 65)
      .attr('y2', 83)
      .attr('stroke', lineColorScale(minValueCombinationPasses))
      .attr('stroke-width', 0.3);
    changingLegend
      .append('line')
      .attr('x1', 77)
      .attr('y1', 85)
      .attr('x2', 85)
      .attr('y2', 83)
      .attr('stroke', lineColorScale(maxValueCombinationPasses))
      .attr('stroke-width', 0.3);
    changingLegend
      .append('circle')
      .attr('cx', 12)
      .attr('cy', 91)
      .attr('r', 0.5)
      .attr('fill', 'none')
      .attr('stroke', 'grey')
      .attr('stroke-width', 0.2);
    changingLegend
      .append('circle')
      .attr('cx', 30)
      .attr('cy', 90)
      .attr('r', dotSizeScale(safeMaxPasses))
      .attr('fill', 'none')
      .attr('stroke', 'grey')
      .attr('stroke-width', 0.2);
    changingLegend
      .append('text')
      .attr('x', 10)
      .attr('y', 94)
      .text('0 passes')
      .style('font-size', '1.5px')
      .style('fill', 'grey');
    changingLegend
      .append('text')
      .attr('x', 25)
      .attr('y', 94)
      .text(`${safeMaxPasses} passes`)
      .style('font-size', '1.5px')
      .style('fill', 'grey');

    changingLegend
      .append('circle')
      .attr('cx', 61)
      .attr('cy', 90)
      .attr('r', 1)
      .attr('fill', 'none')
      .attr('stroke', dotColorScale(safeMinValues))
      .attr('stroke-width', 0.2);
    changingLegend
      .append('circle')
      .attr('cx', 80)
      .attr('cy', 90)
      .attr('r', 1)
      .attr('fill', 'none')
      .attr('stroke', dotColorScale(safeMaxValues))
      .attr('stroke-width', 0.2);
    changingLegend
      .append('text')
      .attr('x', 55)
      .attr('y', 94)
      .text(`${safeMinValues.toFixed(4)} value added`)
      .style('font-size', '1.5px')
      .style('fill', 'grey');
    changingLegend
      .append('text')
      .attr('x', 75)
      .attr('y', 94)
      .text(`${safeMaxValues.toFixed(4)} value added`)
      .style('font-size', '1.5px')
      .style('fill', 'grey');
  }, [matchId, teamName]);

  return (
    <div className='flex flex-col w-full'>
      <div className='flex items-center mx-auto p-2'>
        <Select onValueChange={(value) => setTeamName(value)}>
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Select a team' />
          </SelectTrigger>
          <SelectContent>
            {teamOptions.map((team, i) => (
              <SelectItem key={i} value={team.team_name}>
                {team.team_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className='flex justify-center items-center shadow-lg rounded-lg overflow-hidden'>
        <svg ref={ref}></svg>
      </div>
    </div>
  );
};

export default SoccerPitch;
