import React from "react";
import { News } from "./Second"; // Make sure to import the correct file path for 'Second'

interface CardProps {
  item: News; // Specify the type for the 'item' prop
  handleDelete: (id: number) => void; // Add the type for the 'handleDelete' prop
}

const Card: React.FC<CardProps> = ({ item, handleDelete }) => {
  return (
    <div
      className="swiper-slide homepage-slide swiper-slide-active"
      style={{ width: "530px", height: "415px" }}
    >
      <div
        className="flex-grow w-full flex items-center relative flex-shrink-0"
        style={{ background: "#171717" }}
      >
        <div className="px-8 mt-2">
          <span
            data-tb-title
            className="line-clamp-2 font-bold text-24 text-white"
            data-tb-shadow-region-title="0"
          >
            {item.header}
          </span>
        </div>
      </div>
      <p style={{ fontSize: "1rem" }}>{item.content}</p>

      <div
        data-tb-region-item
        className="swiper-slide homepage-slide swiper-slide-active"
        style={{ width: "600px", height: "415px" }}
        data-swiper-slide-index="13"
        data-tb-owning-region-name="HeadlineSlider"
        data-tb-owning-region-index="13"
        data-tb-shadow-region-item="0-13"
      >
        <div className="w-full relative" style={{ paddingBottom: "56.25%" }}>
          {item.image && (
            <img
              src={`data:image/jpeg;base64,${item.image}`}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
              alt="News"
            />
          )}
        </div>
      </div>

      <button type="button" onClick={() => handleDelete(item.id)}>
        Delete
      </button>
    </div>
  );
};

export default Card;
