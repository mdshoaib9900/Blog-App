import React,{useEffect,useState} from 'react'
import appWriteService from "../appwrite/config"
import {Container} from '../components'
import Postcard from '../components/Postcard'
import { useSelector } from 'react-redux'
import Hero from './Hero'
function Home() {
    const [posts,setPosts]=useState([])
    const active=useSelector((state)=> state.auth.status)

    useEffect(()=>{
        appWriteService.getAllPost().then((posts)=>{
             if (posts && posts.documents) {
          setPosts(posts.documents)
        } else {
          setPosts([]) // fallback
        }
      })
      .catch(() => setPosts([]))
},[] )

    if(!active){
        return (
            <div className='w-full py-8 mt-4 text-center'>

                <div className='p-2 w-full'>
                    <h1 className='text-2xl
                    font-bold hover:text-gray-500'>
                        Login to read posts
                    </h1>
                </div>
            </div>
        )
    }
     if(active && posts.length === 0 ){
        return(

            <div className='w-full py-8 mt-4 text-center'>
                <div className='p-2 w-full'>
                    <h1 className='text-2xl
                    font-bold hover:text-gray-500'>
                       No posts uploaded yet.
                    </h1>
                </div>
            </div>
            )
    }

     
  return (
      <div className="min-h-screen w-full bg-[#fafafa] relative text-gray-900">
    {/* Diagonal Grid with Light */}
    <div
      className="absolute inset-0 z-0 pointer-events-none"
      style={{
        backgroundImage: `
          repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px),
        repeating-linear-gradient(-45deg, rgba(0, 0, 0, 0.1) 0, rgba(0, 0, 0, 0.1) 1px, transparent 1px, transparent 20px)
        `,
        backgroundSize: "40px 40px",
      }}
    />
    {/* Your Content/Components */}
    <div className='w-full py-8'> 
    <Container>
        <div  className='flex flex-wrap'>
            {posts.map((post)=>(
                <div key={post.$id} className='p-2 w-1/4'>
                    <Postcard {...post}/>
                </div>
            ))}
        </div>
    </Container>
    </div>
    </div>
  )
}

export default Home