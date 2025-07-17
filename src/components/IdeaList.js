// src/components/IdeaList.js
import React from "react";
import LazyLoad from "react-lazyload";
import dayjs from "dayjs";

const IdeaList = ({ ideas = [] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {ideas.map((idea) => {
        console.log(idea.small_image); // 🔍 Tambahkan DI SINI

        return (
          <div
            key={idea.id}
            className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition"
          >
            <LazyLoad height={200} once>
              <img
                src={
                  idea.small_image?.url?.full ??
                  "https://via.placeholder.com/300x200?text=No+Image"
                }
                alt={idea.title}
                className="w-full h-48 object-cover"
              />
            </LazyLoad>

            <div className="p-4">
              <p className="text-sm text-gray-500">
                {dayjs(idea.published_at).format("DD MMMM, YYYY").toUpperCase()}
              </p>
              <h3 className="mt-2 text-lg font-semibold">{idea.title}</h3>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default IdeaList;
