import React from 'react'
import appWriteService from "../appwrite/config"
import { Link } from 'react-router-dom'

function Postcard({ $id, title, featuredImage }) {
  const imgUrl = featuredImage
    ? appWriteService.getFilePreview(featuredImage)
    : "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <Link to={`/post/${$id}`}>
      <div className="w-full bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1">
        {/* Image */}
        <div className="relative w-full h-48 overflow-hidden">
          <img
            src={imgUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Title */}
        <div className="p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-2">{title}</h2>
          <p className="text-gray-600 text-sm">
            {/* Optional: excerpt or snippet */}
          </p>
        </div>
      </div>
    </Link>
  )
}

export default Postcard
