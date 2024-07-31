import React from 'react';
import { Box } from '@mui/material';

interface PositonsProps {
    positions: {
        start: { x: number; y: number };
        mid: { x: number; y: number };
        end1: { x: number; y: number };
        end2: { x: number; y: number };
    };
    }

const SvgLines:React.FC<PositonsProps> = ({ positions }) => {
  const { start, mid, end1, end2 } = positions;

  return (
    <Box 
      position="absolute" 
      top={0} 
      left={0} 
      width="100%" 
      height="100%"
    >
      <svg width="100%" height="100%">
        <line x1={start.x} y1={start.y} x2={mid.x} y2={mid.y} stroke="black" strokeWidth="2" />
        <line x1={mid.x} y1={mid.y} x2={end1.x} y2={end1.y} stroke="black" strokeWidth="2" />
        <line x1={mid.x} y1={mid.y} x2={end2.x} y2={end2.y} stroke="black" strokeWidth="2" />
        <defs>
          <marker id="arrow" markerWidth="10" markerHeight="10" refX="5" refY="5" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="black" />
          </marker>
        </defs>
      </svg>
    </Box>
  );
};

export default SvgLines;
