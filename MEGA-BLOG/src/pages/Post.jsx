import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const userData = useSelector((state) => state.auth.userData);
  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) setPost(post);
        else navigate("/");
      });
    } else navigate("/");
  }, [slug, navigate]);

  const deletePost = () => {
    appwriteService.deletePost(post.$id).then((status) => {
      if (status) {
        appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    });
  };

  return post ? (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4 flex items-center justify-center">
      <Container>
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">
          {/* Featured Image */}
          <div className="relative w-full">
            <img
              src={appwriteService.getFileView(post.featuredImage)}
              alt={post.title}
              className="w-full max-h-[400px] object-cover rounded-t-2xl transition-transform duration-300 hover:scale-105"
            />
            {isAuthor && (
              <div className="absolute top-4 right-4 flex gap-3">
                <Link to={`/edit-post/${post.$id}`}>
                  <Button bgColor="bg-green-500 hover:bg-green-600">Edit</Button>
                </Link>
                <Button bgColor="bg-red-500 hover:bg-red-600" onClick={deletePost}>
                  Delete
                </Button>
              </div>
            )}
          </div>

          {/* Post Content */}
          <div className="p-8">
            <h1 className="text-4xl font-extrabold text-gray-900 mb-6">
              {post.title}
            </h1>
            <div className="prose prose-lg text-gray-700 max-w-none">
              {parse(post.content)}
            </div>
          </div>
        </div>
      </Container>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <p className="text-lg text-gray-600 animate-pulse">Loading post...</p>
    </div>
  );
}
