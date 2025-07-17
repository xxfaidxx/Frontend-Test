import { useEffect, useState } from "react";
import bannerImage from "../assets/banner.jpg";

const Banner = ({
  imageUrl = bannerImage,
  title = "Ideas",
  description = "Discover creative and innovative ideas that shape the future of digital experiences.",
}) => {
  const [offsetY, setOffsetY] = useState(0);

  const handleScroll = () => {
    setOffsetY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      className="relative w-full h-[70vh] overflow-hidden"
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
        backgroundPosition: `center ${offsetY * 0.4}px`,
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="absolute inset-0 bg-black bg-opacity-40 z-0" />

      <div
        className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center px-4"
        style={{ transform: `translateY(${offsetY * 0.2}px)` }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-md">
          {title}
        </h1>
        <p className="text-lg md:text-xl max-w-2xl drop-shadow-sm">
          {description}
        </p>
      </div>

      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg
          viewBox="0 0 100 10"
          preserveAspectRatio="none"
          className="w-full h-[60px] fill-white"
        >
          <polygon points="0,10 100,5 100,10" />
        </svg>
      </div>
    </section>
  );
};

export default Banner;
