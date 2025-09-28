"use client";
import React, { useEffect, useRef, useState } from "react";
import { Story } from "../types";
import Image from "next/image";

type Props = {
  stories: Story[];
  startIndex: number;
  onClose: () => void;
};

export default function StoryViewer({ stories, startIndex, onClose }: Props) {
  const [index, setIndex] = useState(startIndex);
  const [loading, setLoading] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    startAutoAdvance();
    return () => stopTimer();
  }, [index]);

  function startAutoAdvance() {
    stopTimer();
    if (progressRef.current) {
      progressRef.current.style.transition = "none";
      progressRef.current.style.width = "0%";
      requestAnimationFrame(() =>
        requestAnimationFrame(() => {
          if (progressRef.current) {
            progressRef.current.style.transition = "width 15s linear";
            progressRef.current.style.width = "100%";
          }
        })
      );
    }
    timerRef.current = setTimeout(() => goNext(), 15000);
  }

  function stopTimer() {
    if (timerRef.current) clearTimeout(timerRef.current);
  }

  function goPrev() {
    if (index > 0) setIndex((i) => i - 1);
    else onClose();
  }
  function goNext() {
    if (index < stories.length - 1) setIndex((i) => i + 1);
    else onClose();
  }

  const item = stories[index];
  if (!item) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/90 z-50"
      role="dialog"
      aria-modal="true"
    >
      {/* Mobile Frame */}
      <div className="relative w-full max-w-[420px] h-[calc(100vh-10px)] bg-black overflow-hidden rounded-xl">
        {/* Progress Bar */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gray-700 z-20">
          <div ref={progressRef} className="h-full bg-white" />
        </div>

        {/* Header */}
        <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-20">
          <div className="flex items-center gap-2">
            <Image
              src={item.profile}
              alt="profile"
              width={32}
              height={32}
              className="rounded-full border border-white"
            />
            <span className="text-white font-semibold text-sm">Mohnish</span>
          </div>
          <button
            onClick={onClose}
            className="text-white text-xl"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Loader */}
        {loading && (
          <div className="absolute inset-0 flex items-center justify-center text-white z-10">
            Loading...
          </div>
        )}

        {/* Story Image */}
        <div className="relative w-full h-full z-0">
          <Image
            onLoad={() => setLoading(false)}
            onError={() => setLoading(false)}
            key={item.id}
            src={item.image}
            alt={`story-${item.id}`}
            fill
            priority
            className="object-contain"
            sizes="100vw"
          />
        </div>

        {/* Tap Zones */}
        <button
          className="absolute top-0 left-0 w-1/2 h-full z-10"
          onClick={goPrev}
          aria-label="previous"
        />
        <button
          className="absolute top-0 right-0 w-1/2 h-full z-10"
          onClick={goNext}
          aria-label="next"
        />
      </div>
    </div>
  );
}
