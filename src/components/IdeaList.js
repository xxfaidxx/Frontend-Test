// src/components/IdeaList.js
import React from "react";
import LazyLoad from "react-lazyload";
import dayjs from "dayjs";

const IdeaList = ({ ideas = [] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {ideas.map((idea) => (
        <div
          key={idea.id}
          className="border rounded-lg overflow-hidden shadow-sm bg-white"
        >
          <LazyLoad height={180} offset={100}>
            <div className="aspect-[16/9] w-full overflow-hidden">
              <img
                src={
                  idea.medium_image_url ||
                  "https://placehold.co/600x400?text=No+Image"
                }
                alt={idea.title}
                className="w-full h-full object-cover"
              />
            </div>
          </LazyLoad>
          <div className="p-4">
            <p className="text-xs text-gray-500 uppercase mb-1">
              {dayjs(idea.published_at).format("D MMM YYYY")}
            </p>
            <h2 className="text-base font-semibold leading-tight line-clamp-3">
              {idea.title}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IdeaList;
