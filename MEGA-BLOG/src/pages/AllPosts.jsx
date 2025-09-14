import React, { useState, useEffect } from "react";
import appWriteService from "../appwrite/config";
import { Container } from "../components";
import PostCard from "../components/Postcard";
import { Search } from "lucide-react"; // icon for search

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    appWriteService.getAllPost().then((posts) => {
      if (posts && posts.documents) {
        setPosts(posts.documents);
      }
    });
  }, []);

  // filter posts based on search query
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="min-h-screen w-full bg-gray-50 py-10">
      <Container>
        {/* Search Bar */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-lg">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search blogs..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-purple-500 focus:outline-none shadow-sm text-gray-700 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Responsive Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredPosts.map((post) => (
              <PostCard key={post.$id} {...post} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10 text-lg">
            No posts found for "<span className="font-semibold">{query}</span>"
          </p>
        )}
      </Container>
    </div>
  );
}

export default AllPosts;
