import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { Link } from "react-router-dom";

function Profile() {
  const userData = useSelector((state) => state.auth.userData);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    if (userData?.$id) {
      appwriteService.getUserPosts(userData.$id).then((posts) => {
        if (posts && posts.documents) {
          setUserPosts(posts.documents);
        }
      });
    }
  }, [userData]);

  if (!userData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-lg font-semibold text-gray-600">
          Please log in to view your profile.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <Container>
        {/* Profile Card */}
        <div className="bg-white shadow-lg rounded-2xl p-6 mb-10 flex flex-col md:flex-row items-center md:items-start gap-6">
          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold">
            {userData.name?.charAt(0).toUpperCase()}
          </div>

          {/* Info */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-800">{userData.name}</h2>
            <p className="text-gray-600">{userData.email}</p>
            <p className="mt-2 text-sm text-gray-500">User ID: {userData.$id}</p>
            <p className="mt-1 text-sm text-gray-500">
              Member since:{" "}
              {new Date(userData.$createdAt).toLocaleDateString()}
            </p>

            {/* Stats */}
            <div className="mt-4 flex gap-6">
              <div className="bg-purple-100 px-4 py-2 rounded-lg text-center">
                <p className="text-lg font-bold text-purple-700">
                  {userPosts.length}
                </p>
                <p className="text-sm text-gray-600">Posts</p>
              </div>
              {/* Future expansion: likes, comments, followers */}
              <div className="bg-pink-100 px-4 py-2 rounded-lg text-center">
                <p className="text-lg font-bold text-pink-700">0</p>
                <p className="text-sm text-gray-600">Followers</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-6 flex gap-4">
              <Link
                to="/add-post"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
              >
                ➕ Add New Post
              </Link>
              <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition">
                ✏️ Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* User Posts */}
        <h3 className="text-xl font-semibold mb-4 text-gray-800">Your Posts</h3>
        {userPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {userPosts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        ) : (
          <p className="text-gray-600 text-center mt-10">
            You haven’t created any posts yet.
          </p>
        )}
      </Container>
    </div>
  );
}

export default Profile;
