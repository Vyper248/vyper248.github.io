import { useRef, useEffect } from 'react'

type CanvasProps = {
    draw: (ctx: CanvasRenderingContext2D, frameCount: number)=>void;
}

const Canvas = ({ draw }: CanvasProps) => {
  
  const canvasRef = useRef(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current as HTMLCanvasElement;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const context = canvas.getContext('2d') as CanvasRenderingContext2D;

    let frameCount = 0;
    let animationFrameId: number;
    
    const render = () => {
      frameCount++;
      draw(context, frameCount);
      animationFrameId = window.requestAnimationFrame(render);
    }

    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    }
  }, [draw])
  
  return <canvas ref={canvasRef}/>
}

export default Canvas