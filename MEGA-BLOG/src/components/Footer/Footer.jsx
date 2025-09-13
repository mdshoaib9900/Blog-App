import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa'

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-200 py-12 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap -mx-6">
          {/* Logo & copyright */}
          <div className="w-full md:w-1/3 px-6 mb-8 md:mb-0">
            <Logo width="120px" />
            <p className="mt-4 text-gray-400 text-sm">
              &copy; 2023 DevUI. All rights reserved.
            </p>
            <div className="flex mt-4 space-x-4">
              <a href="#" className="hover:text-blue-500 transition-colors">
                <FaFacebookF />
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors">
                <FaTwitter />
              </a>
              <a href="#" className="hover:text-blue-700 transition-colors">
                <FaLinkedinIn />
              </a>
              <a href="#" className="hover:text-pink-500 transition-colors">
                <FaInstagram />
              </a>
            </div>
          </div>

          {/* Company */}
          <div className="w-1/2 md:w-1/6 px-6 mb-8 md:mb-0">
            <h3 className="text-xs font-semibold uppercase text-gray-400 mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Features</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">Pricing</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">Affiliate Program</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">Press Kit</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div className="w-1/2 md:w-1/6 px-6 mb-8 md:mb-0">
            <h3 className="text-xs font-semibold uppercase text-gray-400 mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Account</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">Help</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">Contact Us</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">Customer Support</Link>
              </li>
            </ul>
          </div>

          {/* Legals */}
          <div className="w-full md:w-1/3 px-6">
            <h3 className="text-xs font-semibold uppercase text-gray-400 mb-4">Legals</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Terms &amp; Conditions</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/" className="hover:text-white transition-colors">Licensing</Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
