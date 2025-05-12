import React, { useEffect, useRef, useState } from 'react';

const MiniCanvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentColor, setCurrentColor] = useState('#6B4EE6');
  const [lastPosition, setLastPosition] = useState({ x: 0, y: 0 });
  
  useEffect(() => {
    const canvas = canvasRef.current;
    // eslint-disable-next-line no-unused-vars
    const ctx = canvas.getContext('2d');
    
    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);
  
  const startDrawing = (e) => {
    setIsDrawing(true);
    
    let clientX, clientY;
    
    if (e.type === 'mousedown') {
      clientX = e.nativeEvent.offsetX;
      clientY = e.nativeEvent.offsetY;
    } else if (e.type === 'touchstart') {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = canvasRef.current.getBoundingClientRect();
      clientX = touch.clientX - rect.left;
      clientY = touch.clientY - rect.top;
    }
    
    setLastPosition({
      x: clientX,
      y: clientY
    });
  };
  
  const draw = (e) => {
    if (!isDrawing) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    let clientX, clientY;
    
    if (e.type === 'mousemove') {
      clientX = e.nativeEvent.offsetX;
      clientY = e.nativeEvent.offsetY;
    } else if (e.type === 'touchmove') {
      e.preventDefault();
      const touch = e.touches[0];
      const rect = canvas.getBoundingClientRect();
      clientX = touch.clientX - rect.left;
      clientY = touch.clientY - rect.top;
    }
    
    ctx.strokeStyle = currentColor;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 5;
    
    ctx.beginPath();
    ctx.moveTo(lastPosition.x, lastPosition.y);
    ctx.lineTo(clientX, clientY);
    ctx.stroke();
    
    setLastPosition({
      x: clientX,
      y: clientY
    });
  };
  
  const endDrawing = () => {
    setIsDrawing(false);
  };
  
  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };
  
  return (
    <div className="w-full h-[300px] bg-white rounded-xl overflow-hidden relative shadow-lg shadow-purple/8 mt-10">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full cursor-crosshair"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseOut={endDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={endDrawing}
      />
      <div className="absolute bottom-5 left-1/2 transform -translate-x-1/2 flex gap-2.5 bg-white p-2 rounded-full shadow-md">
        <div 
          className={`w-[30px] h-[30px] rounded-full cursor-pointer transition-transform ${currentColor === '#6B4EE6' ? 'scale-110 border-2 border-charcoal' : 'border-2 border-transparent hover:scale-110'}`}
          style={{ backgroundColor: '#6B4EE6' }}
          onClick={() => setCurrentColor('#6B4EE6')}
        />
        <div 
          className={`w-[30px] h-[30px] rounded-full cursor-pointer transition-transform ${currentColor === '#4EC5E6' ? 'scale-110 border-2 border-charcoal' : 'border-2 border-transparent hover:scale-110'}`}
          style={{ backgroundColor: '#4EC5E6' }}
          onClick={() => setCurrentColor('#4EC5E6')}
        />
        <div 
          className={`w-[30px] h-[30px] rounded-full cursor-pointer transition-transform ${currentColor === '#FF7F6B' ? 'scale-110 border-2 border-charcoal' : 'border-2 border-transparent hover:scale-110'}`}
          style={{ backgroundColor: '#FF7F6B' }}
          onClick={() => setCurrentColor('#FF7F6B')}
        />
        <button 
          className="bg-charcoal text-white border-none py-1.5 px-3 rounded-full cursor-pointer text-xs transition-all hover:bg-[#444455]"
          onClick={clearCanvas}
        >
          Clear
        </button>
      </div>
    </div>
  );
};

export default MiniCanvas;