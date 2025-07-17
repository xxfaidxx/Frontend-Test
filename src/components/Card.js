import { useState } from "react";

const Card = ({ title, imageUrl }) => {
  const [imgSrc, setImgSrc] = useState(
    imageUrl || "https://via.placeholder.com/400x300?text=No+Image"
  );

  const handleImgError = () => {
    setImgSrc("https://via.placeholder.com/400x300?text=No+Image");
  };

  return (
    <div className="rounded-2xl overflow-hidden shadow hover:shadow-lg transition duration-300">
      <img
        src={imgSrc}
        alt={title}
        loading="lazy"
        onError={handleImgError}
        crossOrigin="anonymous"
        className="w-full aspect-[4/3] object-cover rounded-t"
      />
      <div className="p-4">
        <h2 className="text-lg font-semibold line-clamp-3">{title}</h2>
      </div>
    </div>
  );
};

export default Card;
