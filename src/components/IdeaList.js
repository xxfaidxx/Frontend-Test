// src/components/IdeaList.js
import React from "react";
import LazyLoad from "react-lazyload";
import dayjs from "dayjs";

const IdeaList = ({ ideas = [] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {ideas.map((idea) => {
        const imageUrl =
          idea.small_image?.[0]?.url ??
          "https://via.placeholder.com/300x200?text=No+Image";

        return (
          <div
            key={idea.id}
            className="border rounded-xl overflow-hidden shadow-md"
          >
            <LazyLoad height={200} offset={100}>
              <img
                src={imageUrl}
                alt={idea.title}
                className="w-full h-48 object-cover"
              />
            </LazyLoad>
            <div className="p-4">
              <p className="text-sm text-gray-500 mb-2">
                {dayjs(idea.published_at).format("DD MMMM, YYYY").toUpperCase()}
              </p>
              <h2 className="text-lg font-semibold">{idea.title}</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default IdeaList;
