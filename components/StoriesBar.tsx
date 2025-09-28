"use client";
import React, { useRef } from "react";
import { Story } from "../types";
import Image from "next/image";

type Props = { stories: Story[]; onOpen: (index: number) => void };

export default function StoriesBar({ stories, onOpen }: Props) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -150, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 150, behavior: "smooth" });
    }
  };

  return (
    <div className="relative flex items-center">
     

      {/* Scrollable Stories */}
      <div
        ref={scrollRef}
        className="flex gap-4 overflow-x-auto px-3 py-3 stories-scrollbar"
      >
        {stories.map((s, i) => (
          <button
            key={s.id}
            className="flex-shrink-0 flex flex-col items-center"
            onClick={() => onOpen(i)}
            aria-label={`Open story ${i + 1}`}
          >
            <Image
              src={s.profile}
              alt={`profile-${s.id}`}
              width={70}
              height={70}
              className="rounded-full object-cover border-2 border-pink-500"
            />
            <span className="text-xs text-white mt-1">Mohnish</span>
          </button>
        ))}
      </div>

    
    </div>
  );
}
