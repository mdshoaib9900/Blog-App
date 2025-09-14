import React, { useState, useEffect } from 'react'
import appWriteService from "../appwrite/config"
import { Container } from '../components'
import PostCard from '../components/Postcard'

function AllPosts() {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    appWriteService.getAllPost().then((posts) => {
      if (posts && posts.documents) {
        setPosts(posts.documents)
      }
    })
  }, []) 

  return (
   <div className="min-h-screen w-full bg-white relative">
  {/* Grid Background */}
  <div
    className="absolute inset-0 z-0"
    style={{
      backgroundImage: `
        linear-gradient(to right, #e5e7eb 1px, transparent 1px),
        linear-gradient(to bottom, #e5e7eb 1px, transparent 1px)
      `,
      backgroundSize: "40px 40px",
    }}
  />
    <div className="w-full py-8 ">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} /> 
            </div>
          ))}
        </div>
      </Container>
    </div>
    </div>
  )
}

export default AllPosts
