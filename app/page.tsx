"use client";
import React, { useEffect, useState } from "react";
import StoriesBar from "../components/StoriesBar";
import StoryViewer from "../components/StoryViewer";
import { Story } from "../types";

export default function Page() {
  const [stories, setStories] = useState<Story[]>([]);
  const [openIndex, setOpenIndex] = useState<number>(-1);

  useEffect(() => {
    fetch("/stories.json")
      .then((r) => r.json())
      .then((data: Story[]) => setStories(data))
      .catch((err) => console.error("Failed to load stories", err));
  }, []);

  return (
    <main className="w-full bg-neutral-950">
      <div className="max-w-sm mx-auto border min-h-screen bg-neutral-900">
        <header className="px-4 py-2">
          <h1 className="text-xl font-semibold text-white">Insta Stories Demo (mobile)</h1>
          <p className="text-sm opacity-70 text-white">
            Tap preview → open story. Tap left/right → navigate. Autoplay 5s.
          </p>
        </header>

        <StoriesBar stories={stories} onOpen={setOpenIndex} />

        <div className="p-4 text-gray-300 flex items-center justify-center mt-8">
          <p>
            More Content here
          </p>
        </div>

        {openIndex >= 0 && (
          <StoryViewer
            stories={stories}
            startIndex={openIndex}
            onClose={() => setOpenIndex(-1)}
          />
        )}
      </div>
    </main>
  );
}
