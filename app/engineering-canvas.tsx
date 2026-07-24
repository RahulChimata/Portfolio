"use client";

import { useEffect, useRef, useState } from "react";

type Point3D = { x: number; y: number; z: number };

function rotatePoint(point: Point3D, angleX: number, angleY: number) {
  const cosY = Math.cos(angleY);
  const sinY = Math.sin(angleY);
  const x1 = point.x * cosY - point.z * sinY;
  const z1 = point.x * sinY + point.z * cosY;
  const cosX = Math.cos(angleX);
  const sinX = Math.sin(angleX);

  return {
    x: x1,
    y: point.y * cosX - z1 * sinX,
    z: point.y * sinX + z1 * cosX,
  };
}

export function EngineeringCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [canvasReady, setCanvasReady] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) {
      setCanvasReady(false);
      return;
    }

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;
    let width = 0;
    let height = 0;
    let pointerX = 0;
    let pointerY = 0;
    let currentX = 0;
    let currentY = 0;
    let scrollInfluence = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.7);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.max(1, Math.floor(width * ratio));
      canvas.height = Math.max(1, Math.floor(height * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerX = ((event.clientX - rect.left) / rect.width - 0.5) * 2;
      pointerY = ((event.clientY - rect.top) / rect.height - 0.5) * 2;
    };
    const onPointerLeave = () => {
      pointerX = 0;
      pointerY = 0;
    };
    const onScroll = () => {
      scrollInfluence = Math.min(window.scrollY / window.innerHeight, 1);
    };

    const project = (point: Point3D, angleX: number, angleY: number) => {
      const rotated = rotatePoint(point, angleX, angleY);
      const perspective = 4.8 / (5.8 + rotated.z);
      const scale = Math.min(width, height) * 0.19;
      return {
        x: width / 2 + rotated.x * scale * perspective,
        y: height / 2 + rotated.y * scale * perspective,
      };
    };

    const torusPoint = (u: number, v: number): Point3D => {
      const major = 1.58;
      const minor = 0.52;
      return {
        x: (major + minor * Math.cos(v)) * Math.cos(u),
        y: minor * Math.sin(v),
        z: (major + minor * Math.cos(v)) * Math.sin(u),
      };
    };

    const drawPath = (
      points: Point3D[],
      angleX: number,
      angleY: number,
      alpha: number,
    ) => {
      context.beginPath();
      points.forEach((point, index) => {
        const projected = project(point, angleX, angleY);
        if (index === 0) context.moveTo(projected.x, projected.y);
        else context.lineTo(projected.x, projected.y);
      });
      context.strokeStyle = `rgba(99, 102, 241, ${alpha})`;
      context.stroke();
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);
      currentX += (pointerX - currentX) * 0.045;
      currentY += (pointerY - currentY) * 0.045;

      const idle = reducedMotion.matches ? 0.3 : time * 0.00018;
      const angleX = -0.42 + currentY * 0.24 + scrollInfluence * 0.22;
      const angleY = idle + currentX * 0.42 + scrollInfluence * 0.3;
      const glow = context.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.min(width, height) * 0.42,
      );
      glow.addColorStop(0, "rgba(99, 102, 241, 0.16)");
      glow.addColorStop(0.55, "rgba(34, 211, 238, 0.045)");
      glow.addColorStop(1, "rgba(255, 255, 255, 0)");
      context.fillStyle = glow;
      context.fillRect(0, 0, width, height);

      context.lineWidth = 0.8;
      const uSegments = 34;
      const vSegments = 14;
      for (let vIndex = 0; vIndex < vSegments; vIndex += 1) {
        const points: Point3D[] = [];
        for (let uIndex = 0; uIndex <= uSegments; uIndex += 1) {
          points.push(
            torusPoint(
              (uIndex / uSegments) * Math.PI * 2,
              (vIndex / vSegments) * Math.PI * 2,
            ),
          );
        }
        drawPath(points, angleX, angleY, 0.22 + (vIndex % 3) * 0.055);
      }
      for (let uIndex = 0; uIndex < uSegments; uIndex += 2) {
        const points: Point3D[] = [];
        for (let vIndex = 0; vIndex <= vSegments; vIndex += 1) {
          points.push(
            torusPoint(
              (uIndex / uSegments) * Math.PI * 2,
              (vIndex / vSegments) * Math.PI * 2,
            ),
          );
        }
        drawPath(points, angleX, angleY, 0.17);
      }

      [0.12, 1.2, 2.3].forEach((offset, orbitIndex) => {
        const orbit: Point3D[] = [];
        for (let i = 0; i <= 80; i += 1) {
          const theta = (i / 80) * Math.PI * 2;
          orbit.push(
            rotatePoint(
              {
                x: Math.cos(theta) * (2.45 + orbitIndex * 0.1),
                y: Math.sin(theta) * 0.74,
                z: Math.sin(theta) * 0.35,
              },
              offset,
              offset * 0.42,
            ),
          );
        }
        context.setLineDash([4, 8]);
        drawPath(orbit, angleX, angleY, 0.18);
        context.setLineDash([]);

        const particleAngle =
          idle * (2.2 + orbitIndex * 0.25) + offset * 4.2;
        const particle = project(
          rotatePoint(
            {
              x:
                Math.cos(particleAngle) *
                (2.45 + orbitIndex * 0.1),
              y: Math.sin(particleAngle) * 0.74,
              z: Math.sin(particleAngle) * 0.35,
            },
            offset,
            offset * 0.42,
          ),
          angleX,
          angleY,
        );
        context.beginPath();
        context.arc(
          particle.x,
          particle.y,
          orbitIndex === 1 ? 3.2 : 2.2,
          0,
          Math.PI * 2,
        );
        context.fillStyle =
          orbitIndex === 1 ? "rgba(34, 211, 238, .9)" : "#6366f1";
        context.fill();
      });

      if (!reducedMotion.matches) frame = window.requestAnimationFrame(draw);
    };

    const observer = new ResizeObserver(() => {
      resize();
      if (reducedMotion.matches) draw(0);
    });
    observer.observe(canvas);
    resize();
    onScroll();
    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);
    window.addEventListener("scroll", onScroll, { passive: true });
    frame = window.requestAnimationFrame(draw);

    return () => {
      observer.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="engineering-visual" aria-hidden="true">
      {canvasReady ? (
        <canvas ref={canvasRef} className="engineering-canvas" />
      ) : (
        <div className="engineering-fallback">
          <span />
          <span />
          <span />
        </div>
      )}
      <div className="visual-index visual-index--top">X 42.17</div>
      <div className="visual-index visual-index--bottom">Y 08.96</div>
    </div>
  );
}
