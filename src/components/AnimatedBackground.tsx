import React, { useEffect, useRef } from 'react';

export const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse tracking for interactive effect
    const mouse = {
      x: -1000,
      y: -1000,
      radius: 180,
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initNodes();
    };

    window.addEventListener('resize', handleResize);

    // Node particle definition
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      baseAlpha: number;
      pulseSpeed: number;
      pulseOffset: number;
    }

    let nodes: Node[] = [];
    // Adjust density based on screen size
    const nodeCount = Math.min(Math.floor((width * height) / 22000), 55);

    function initNodes() {
      nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2 + 1.2,
          baseAlpha: Math.random() * 0.4 + 0.2,
          pulseSpeed: Math.random() * 0.02 + 0.01,
          pulseOffset: Math.random() * Math.PI * 2,
        });
      }
    }

    initNodes();

    let time = 0;

    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Render dark subtle ambient gradient backdrop
      const bgGrad = ctx.createRadialGradient(
        width * 0.5,
        height * 0.3,
        50,
        width * 0.5,
        height * 0.5,
        Math.max(width, height)
      );
      bgGrad.addColorStop(0, '#111C33');
      bgGrad.addColorStop(0.6, '#0F172A');
      bgGrad.addColorStop(1, '#0B0F19');

      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render animated soft glowing liquid mesh blobs
      const blob1X = width * 0.2 + Math.sin(time * 0.5) * 80;
      const blob1Y = height * 0.3 + Math.cos(time * 0.4) * 60;
      const blob1Grad = ctx.createRadialGradient(blob1X, blob1Y, 0, blob1X, blob1Y, 320);
      blob1Grad.addColorStop(0, 'rgba(37, 137, 208, 0.12)');
      blob1Grad.addColorStop(1, 'rgba(37, 137, 208, 0)');
      ctx.fillStyle = blob1Grad;
      ctx.beginPath();
      ctx.arc(blob1X, blob1Y, 320, 0, Math.PI * 2);
      ctx.fill();

      const blob2X = width * 0.8 + Math.cos(time * 0.6) * 90;
      const blob2Y = height * 0.7 + Math.sin(time * 0.5) * 70;
      const blob2Grad = ctx.createRadialGradient(blob2X, blob2Y, 0, blob2X, blob2Y, 380);
      blob2Grad.addColorStop(0, 'rgba(99, 102, 241, 0.09)');
      blob2Grad.addColorStop(1, 'rgba(99, 102, 241, 0)');
      ctx.fillStyle = blob2Grad;
      ctx.beginPath();
      ctx.arc(blob2X, blob2Y, 380, 0, Math.PI * 2);
      ctx.fill();

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Move node
        node.x += node.vx;
        node.y += node.vy;

        // Bounce on edges
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        // Mouse attraction/repulsion interaction
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < mouse.radius) {
          const force = (mouse.radius - dist) / mouse.radius;
          node.x -= (dx / dist) * force * 1.5;
          node.y -= (dy / dist) * force * 1.5;
        }

        // Pulsing glow
        const alpha = node.baseAlpha + Math.sin(time * 2 + node.pulseOffset) * 0.15;

        // Draw connections to nearby nodes
        for (let j = i + 1; j < nodes.length; j++) {
          const other = nodes[j];
          const ndx = other.x - node.x;
          const ndy = other.y - node.y;
          const nDist = Math.sqrt(ndx * ndx + ndy * ndy);

          const maxConnDist = 140;
          if (nDist < maxConnDist) {
            const lineAlpha = (1 - nDist / maxConnDist) * 0.22;
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            ctx.lineTo(other.x, other.y);

            const lineGrad = ctx.createLinearGradient(node.x, node.y, other.x, other.y);
            lineGrad.addColorStop(0, `rgba(37, 137, 208, ${lineAlpha})`);
            lineGrad.addColorStop(1, `rgba(56, 189, 248, ${lineAlpha * 0.8})`);

            ctx.strokeStyle = lineGrad;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        // Draw connection to mouse if close
        if (dist < mouse.radius) {
          const mouseAlpha = (1 - dist / mouse.radius) * 0.4;
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(37, 137, 208, ${mouseAlpha})`;
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        // Draw Node Particle
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(37, 137, 208, ${Math.max(0.1, alpha)})`;
        ctx.fill();

        // Node Glow Halo
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 2.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(56, 189, 248, ${Math.max(0.02, alpha * 0.2)})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
      style={{ touchAction: 'none' }}
    />
  );
};
