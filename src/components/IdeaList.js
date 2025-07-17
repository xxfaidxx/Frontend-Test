import React from "react";
import LazyLoad from "react-lazyload";
import dayjs from "dayjs";

const IdeaList = ({ ideas = [] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {ideas.map((idea) => (
        <div
          key={idea.id}
          className="border rounded-lg overflow-hidden shadow-md"
        >
          <LazyLoad height={200} offset={100}>
            <img
              src={
                idea.medium_image?.url ||
                "https://via.placeholder.com/400x200?text=No+Image"
              }
              alt={idea.title}
              className="w-full h-48 object-cover"
            />
          </LazyLoad>
          <div className="p-4">
            <p className="text-gray-500 text-xs mb-1 uppercase">
              {dayjs(idea.published_at).format("D MMMM, YYYY")}
            </p>
            <h2 className="text-xl font-semibold mb-2 line-clamp-3">
              {idea.title}
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IdeaList;
