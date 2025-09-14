import React from "react";
import appWriteService from "../appwrite/config";
import { Link } from "react-router-dom";

function Postcard({ $id, title, featuredImage }) {
  const imgUrl = featuredImage
    ? appWriteService.getFileView(featuredImage)
    : "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg bg-white border border-gray-300 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1">
        {/* Image */}
        <div className="relative w-full h-40 sm:h-48 md:h-56 lg:h-64 overflow-hidden">
          <img
            src={imgUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Title + Button */}
        <div className="p-4 flex flex-col items-center justify-center">
          <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800 mb-4 text-center bg-blue-300 px-3 py-2 rounded-lg w-full">
            {title}
          </h2>
          <button className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 rounded-lg font-semibold bg-blue-700 text-white py-2 cursor-pointer hover:bg-blue-600 transition">
            Read More
          </button>
        </div>
      </div>
    </Link>
  );
}

export default Postcard;
