import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authslice'
import { Button, Input, Logo } from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import { useForm } from 'react-hook-form'
import logo from '../assets/ink_logo.png'

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()
  const [error, setError] = useState("")

  const login = async (data) => {
    setError("")
    try {
      const session = await authService.login(data)
      if (session) {
        const userData = await authService.getCurrentUser()
        if (userData) dispatch(authLogin(userData))
        navigate("/")
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-50 to-white">
      <div className="flex flex-col md:flex-row w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        
        {/* Left Illustration */}
        <div className="hidden md:block md:w-1/2 bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 p-10 relative">
          <h2 className="text-white text-4xl font-bold mb-4">Welcome Back!</h2>
          <p className="text-white/90">Sign in to continue exploring blogs, share your thoughts, and connect with the community.</p>
          <div className="absolute bottom-10 left-10">
            <img src={logo} alt="Blog Illustration" className="rounded-xl shadow-lg h-[60px] w-[150px]" />
          </div>
        </div>

        {/* Right Form */}
        <div className="w-full md:w-1/2 p-10 bg-white">
          <div className="flex justify-center mb-6">
            <span className="inline-block w-24">
              <Logo width="100%" />
            </span>
          </div>

          <h2 className="text-2xl font-bold text-center mb-2">Sign in to Your Account</h2>
          <p className="text-center text-gray-500 mb-6">
            Don't have an account?&nbsp;
            <Link to="/signup" className="text-purple-500 font-medium hover:underline">
              Sign Up
            </Link>
          </p>

          {error && <p className="text-red-600 mb-4 text-center">{error}</p>}

          <form onSubmit={handleSubmit(login)} className="space-y-5">
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be valid",
                },
              })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: true })}
            />

            <Button
              type="submit"
              className="w-full py-3 mt-2 font-semibold text-white rounded-lg 
                         bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 
                         shadow-md hover:shadow-lg transform hover:-translate-y-0.5 
                         transition-all duration-300 ease-in-out cursor-pointer"
            >
              Sign In
            </Button>
          </form>

          <div className="mt-6 text-center text-gray-400 text-sm">
            By signing in, you agree to our <Link className="text-purple-500 hover:underline">Terms</Link> and <Link className="text-purple-500 hover:underline">Privacy Policy</Link>.
          </div>
        </div>
      </div>
    </div>
  )
}
