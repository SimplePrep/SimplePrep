
interface CurvedLineProps {
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    isStraight?: boolean;
    color?: string; // Add color prop
  }
  
  const CurvedLine: React.FC<CurvedLineProps> = ({ startX, startY, endX, endY, isStraight = false, color = "#4B5563" }) => {
    if (isStraight) {
      return (
        <line
          x1={startX}
          y1={startY}
          x2={endX}
          y2={endY}
          stroke={color}
          strokeWidth="2"
          strokeDasharray="5,5"
        />
      );
    }
  
    const controlPointX = (startX + endX) / 2;
    const controlPointY = startY + (endY - startY) / 2 - 50;
  
    return (
      <path
        d={`M ${startX},${startY} Q ${controlPointX},${controlPointY} ${endX},${endY}`}
        fill="none"
        stroke={color} // Use the passed color
        strokeWidth="2"
        strokeDasharray="5,5"
      />
    );
  };

  export default CurvedLine;