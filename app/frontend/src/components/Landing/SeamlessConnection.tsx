import React, { useCallback, useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { GoVerified } from 'react-icons/go';
import { GiProgression } from 'react-icons/gi';
import { TbTargetArrow } from 'react-icons/tb';

interface BackgroundStyle {
  background: string;
}

interface SeamlessCard {
  point: string;
  description: string;
}

interface Props {
  title: string;
  cards: SeamlessCard[];
  DashboardImg: string;
  bg_purple: BackgroundStyle;
  bg_green: BackgroundStyle;
}

const SeamlessConnection: React.FC<Props> = ({ title, cards, DashboardImg, bg_purple, bg_green }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const card1Ref = useRef<HTMLDivElement>(null);
  const card2Ref = useRef<HTMLDivElement>(null);
  const card3Ref = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const animationRef = useRef<number>();

  const updateDimensions = useCallback(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, [updateDimensions]);

  const drawLines = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    const imgElement = imgRef.current;
    const card1Element = card1Ref.current;
    const card2Element = card2Ref.current;
    const card3Element = card3Ref.current;

    if (!canvas || !container || !imgElement || !card1Element || !card2Element || !card3Element) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const calculatePositions = () => {
      const containerRect = container.getBoundingClientRect();
      const imgRect = imgElement.getBoundingClientRect();
      const card1Rect = card1Element.getBoundingClientRect();
      const card2Rect = card2Element.getBoundingClientRect();
      const card3Rect = card3Element.getBoundingClientRect();

      return {
        startX: imgRect.left + imgRect.width / 2 - containerRect.left,
        startY: imgRect.bottom - containerRect.top,
        endX1: card1Rect.left + card1Rect.width / 2 - containerRect.left,
        endY1: card1Rect.top - containerRect.top,
        endX2: card2Rect.left + card2Rect.width / 2 - containerRect.left,
        endY2: card2Rect.top - containerRect.top,
        endX3: card3Rect.left + card3Rect.width / 2 - containerRect.left,
        endY3: card3Rect.top - containerRect.top,
      };
    };

    const drawBezierLine = (startX: number, startY: number, endX: number, endY: number, control1X: number, control1Y: number, control2X: number, control2Y: number) => {
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.bezierCurveTo(control1X, control1Y, control2X, control2Y, endX, endY);
      ctx.strokeStyle = 'rgba(203, 213, 225, 0.5)';
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const drawTravelingLine = (startX: number, startY: number, endX: number, endY: number, control1X: number, control1Y: number, control2X: number, control2Y: number, progress: number, color: string) => {
      const lineLength = 0.07;
      const t1 = Math.max(0, progress - lineLength / 2);
      const t2 = Math.min(1, progress + lineLength / 2);

      const getPointOnCurve = (t: number) => {
        const x = Math.pow(1 - t, 3) * startX +
          3 * Math.pow(1 - t, 2) * t * control1X +
          3 * (1 - t) * Math.pow(t, 2) * control2X +
          Math.pow(t, 3) * endX;

        const y = Math.pow(1 - t, 3) * startY +
          3 * Math.pow(1 - t, 2) * t * control1Y +
          3 * (1 - t) * Math.pow(t, 2) * control2Y +
          Math.pow(t, 3) * endY;

        return { x, y };
      };

      const point1 = getPointOnCurve(t1);
      const point2 = getPointOnCurve(t2);

      ctx.beginPath();
      ctx.moveTo(point1.x, point1.y);
      ctx.lineTo(point2.x, point2.y);
      ctx.strokeStyle = color;
      ctx.lineWidth = 5;
      ctx.lineCap = 'round';
      ctx.stroke();
    };

    let animationProgress1 = 0;
    let animationProgress2 = 0;
    let animationProgress3 = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { startX, startY, endX1, endY1, endX2, endY2, endX3, endY3 } = calculatePositions();

      const control1X1 = startX;
      const control1Y1 = startY + 170;
      const control2X1 = endX1;
      const control2Y1 = endY1 - 100;

      const control1X2 = startX;
      const control1Y2 = startY;
      const control2X2 = endX2;
      const control2Y2 = endY2 - 50;

      const control1X3 = startX;
      const control1Y3 = startY + 170;
      const control2X3 = endX3;
      const control2Y3 = endY3 - 100;

      drawBezierLine(startX, startY, endX1, endY1, control1X1, control1Y1, control2X1, control2Y1);
      drawBezierLine(startX, startY, endX2, endY2, control1X2, control1Y2, control2X2, control2Y2);
      drawBezierLine(startX, startY, endX3, endY3, control1X3, control1Y3, control2X3, control2Y3);

      animationProgress1 = (animationProgress1 + 0.008) % 1;
      animationProgress2 = (animationProgress2 + 0.012) % 1;
      animationProgress3 = (animationProgress3 + 0.006) % 1;

      drawTravelingLine(startX, startY, endX1, endY1, control1X1, control1Y1, control2X1, control2Y1, animationProgress1, '#5677e8');
      drawTravelingLine(startX, startY, endX2, endY2, control1X2, control1Y2, control2X2, control2Y2, animationProgress2, '#bd7cf8');
      drawTravelingLine(startX, startY, endX3, endY3, control1X3, control1Y3, control2X3, control2Y3, animationProgress3, '#4ade80');

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      updateDimensions();
      drawLines();
    }, 500);

    return () => {
      clearTimeout(timer);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [updateDimensions, drawLines]);

  return (
    <div ref={containerRef} className="w-full flex flex-col items-center justify-between relative font-sans">
      {/* Title and description */}
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold">{title}</h2>
      </div>

      {/* Dashboard image */}
      <motion.div
        ref={imgRef}
        className="relative w-full max-w-[1250px] mx-auto rounded-2xl shadow-2xl shadow-teal-100/50 border-8 border-[#d3d6fe] bg-gradient-to-r from-indigo-300 via-purple-300 to-blue-400 opacity-90"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="flex-1 p-2 sm:p-4 md:p-6 lg:p-8 flex items-center justify-center rounded-2xl m-2 sm:m-4 overflow-hidden">
          <img
            src={DashboardImg}
            alt="Dashboard"
            className="rounded-md sm:rounded-xl w-full h-auto max-w-full max-h-full object-contain"
          />
        </div>
      </motion.div>

      <canvas
        ref={canvasRef}
        className="absolute top-0 left-0 w-full h-full"
        width={dimensions.width}
        height={dimensions.height}
      />

      {/* Cards */}
      <div className="lg:mt-40 mt-20 max-w-[1250px] min-h-60 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 mx-auto z-10">
        {cards.map((card, index) => (
          <motion.div
            ref={index === 0 ? card1Ref : index === 1 ? card2Ref : card3Ref}
            key={index}
            className={`flex flex-col justify-around gap-5 rounded-xl shadow-lg overflow-hidden ${index === 0 ? 'bg-indigo-200 border-4 border-[#d3d6fe]' : index === 1 ? 'bg-purple-200 border-4 border-violet-200' : 'bg-blue-200 border-4 border-blue-100'}`}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
          >
            <div className="flex flex-row gap-2 p-4 items-center justify-between">
              <h3 className="text-xl font-semibold text-black">{card.point}</h3>
              {index === 0 ? <GoVerified size={40} className="text-white" /> : index === 1 ? <GiProgression size={40} className="text-white" /> : <TbTargetArrow size={40} className="text-white" />}
            </div>
            <div className="p-4">
              <p className="text-gray-600 font-medium">{card.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default SeamlessConnection;
