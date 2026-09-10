"use client";

import Image from "next/image";
import { useState } from "react";

type YouTubeVideoProps = {
  id: string;
};

export default function YouTubeVideo({ id }: YouTubeVideoProps) {
  const [playing, setPlaying] = useState(false);
  const [loading, setLoading] = useState(true);

  if (playing) {
    return (
      <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
        {/* Loading */}
        {loading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-black">
            <div className="flex flex-col items-center gap-3">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-white/30 border-t-white" />
              <span className="text-sm text-white/80">
                Loading video...
              </span>
            </div>
          </div>
        )}

        <iframe
          className="absolute inset-0 h-full w-full"
          src={`https://www.youtube.com/embed/${id}?autoplay=1`}
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          onLoad={() => setLoading(false)}
        />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => {
        setLoading(true);
        setPlaying(true);
      }}
      className="group relative block w-full overflow-hidden rounded-2xl bg-black"
    >
      {/* Thumbnail */}
      <Image
        src={`https://img.youtube.com/vi/${id}/maxresdefault.jpg`}
        alt="KG Car Care video"
        width={500}
        height={500}
        className="aspect-video w-full object-cover transition duration-700 group-hover:scale-105"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20 transition duration-300 group-hover:bg-black/40" />

      {/* Play Button */}
      <div className="absolute inset-0 flex cursor-pointer items-center justify-center">
        <div className="flex h-14 w-20 items-center justify-center rounded-[14px] bg-[#FF0000] shadow-2xl transition-all duration-300 group-hover:scale-110 group-hover:bg-[#e60000]">
          <svg
            viewBox="0 0 24 24"
            className="ml-1 h-7 w-7 fill-white"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>
    </button>
  );
}