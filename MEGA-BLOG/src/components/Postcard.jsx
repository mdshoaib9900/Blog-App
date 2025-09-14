import React from 'react'
import appWriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function Postcard({ $id, title, featuredImage }) {
  const imgUrl = featuredImage
    ? appWriteService.getFilePreview(featuredImage)
    : "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-white border-2 border-black rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
        {/* Image */}
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={imgUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Title + Button */}
        <div className="p-4 flex flex-col items-center justify-center ">
          <h2 className="text-xl font-bold text-gray-800 mb-4 text-center bg-blue-300 p-2 rounded-xl">
            Title : {title}
          </h2>
          <button className="w-3/4 rounded-xl font-bold bg-blue-700 text-white py-2 cursor-pointer hover:bg-blue-600 text-center">
            Read More
          </button>
        </div>
      </div>
    </Link>
  )
}

export default Postcard
