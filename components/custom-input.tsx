"use client";

import type React from "react";

import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function CustomInput({
  className,
  value,
  onChange,
  ...props
}: CustomInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [textWidthPx, setTextWidthPx] = useState(0);
  const [leftOffsetPx, setLeftOffsetPx] = useState(0);

  const inputValue = useMemo(() => value?.toString() || "", [value]);

  useEffect(() => {
    if (!inputRef.current) return;
    if (!canvasRef.current) {
      canvasRef.current = document.createElement("canvas");
    }

    const inputEl = inputRef.current;
    const style = window.getComputedStyle(inputEl);
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) return;

    // Build a font string that matches the input's rendered font
    const font = `${style.fontStyle} ${style.fontVariant} ${style.fontWeight} ${style.fontSize} / ${style.lineHeight} ${style.fontFamily}`;
    ctx.font = font;

    // Respect text transform for width calculations
    let textToMeasure = inputValue;
    const transform = style.textTransform;
    if (transform === "uppercase") textToMeasure = inputValue.toUpperCase();
    else if (transform === "lowercase")
      textToMeasure = inputValue.toLowerCase();
    else if (transform === "capitalize")
      textToMeasure = inputValue.replace(/\b\w/g, (c) => c.toUpperCase());

    const metrics = ctx.measureText(textToMeasure);

    // Account for letter-spacing if set
    const letterSpacing =
      style.letterSpacing === "normal"
        ? 0
        : parseFloat(style.letterSpacing || "0");
    const additionalSpacing =
      Math.max(0, textToMeasure.length - 1) *
      (isNaN(letterSpacing) ? 0 : letterSpacing);
    const measuredWidth = Math.ceil(metrics.width + additionalSpacing);
    setTextWidthPx(measuredWidth);

    // Align underline with the start of the text (account for input padding-left)
    const paddingLeft = parseFloat(style.paddingLeft || "0");
    setLeftOffsetPx(isNaN(paddingLeft) ? 0 : paddingLeft);
  }, [inputValue]);

  useEffect(() => {
    const handleResize = () => {
      // Recalculate when layout might change
      if (!inputRef.current) return;
      const style = window.getComputedStyle(inputRef.current);
      const paddingLeft = parseFloat(style.paddingLeft || "0");
      setLeftOffsetPx(isNaN(paddingLeft) ? 0 : paddingLeft);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative">
      <input
        ref={inputRef}
        {...props}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "w-full bg-transparent border-0 outline-none text-zinc-100 placeholder:text-zinc-400",
          className
        )}
      />
      <div
        className={cn(
          "pointer-events-none absolute bottom-0 h-px bg-white/40 transition-[width,opacity] duration-200",
          isFocused ? "opacity-100" : "opacity-0"
        )}
        style={{
          left: leftOffsetPx,
          width: isFocused ? `${textWidthPx}px` : "0px",
        }}
      />
    </div>
  );
}
