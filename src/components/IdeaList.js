import React from "react";
import LazyLoad from "react-lazyload";
import dayjs from "dayjs";

const IdeaList = ({ ideas = [] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {ideas.map((idea) => (
        <div
          key={idea.id}
          className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
        >
          <LazyLoad height={200} once>
            <img
              src={
                idea.medium_image?.url ||
                idea.small_image?.url ||
                "https://placehold.co/600x400?text=No+Image"
              }
              alt={idea.title}
              className="w-full h-[200px] object-cover"
              loading="lazy"
            />
          </LazyLoad>

          <div className="p-4">
            <p className="text-sm text-gray-500">
              {dayjs(idea.published_at).format("DD MMMM, YYYY").toUpperCase()}
            </p>
            <h3 className="mt-2 text-lg font-semibold line-clamp-3">
              {idea.title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default IdeaList;
