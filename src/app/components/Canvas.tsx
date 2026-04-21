import type { CSSProperties, ReactNode } from 'react';
import { canvasSize } from '../stacks';
import type { StackFormat } from '../stacks';

export interface CanvasProps {
  format: StackFormat;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}

export function Canvas({ format, className, style, children }: CanvasProps) {
  const { w, h } = canvasSize(format);
  const baseClass = 'flex flex-col bg-white';
  const combined = className ? `${baseClass} ${className}` : baseClass;
  return (
    <div className={combined} style={{ width: w, height: h, ...style }}>
      {children}
    </div>
  );
}
