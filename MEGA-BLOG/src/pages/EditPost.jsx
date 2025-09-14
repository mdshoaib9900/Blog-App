import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import appWriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      appWriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        } else {
          navigate("/");
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 py-12 px-4">
      <Container>
        <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-200 p-8">
          <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8">
             Edit Your Post
          </h1>
          <PostForm post={post} />
        </div>
      </Container>
    </div>
  ) : (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <p className="text-lg text-gray-600 animate-pulse">Loading post...</p>
    </div>
  );
}

export default EditPost;
