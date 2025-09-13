import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    { name: 'Home', slug: '/', active: true },
    { name: 'Login', slug: '/login', active: !authStatus },
    { name: 'Signup', slug: '/signup', active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post', slug: '/add-post', active: authStatus },
  ]

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-blue-200 rounded-xl shadow-md">
      <Container>
        <nav className="flex items-center py-4">
          {/* Logo */}
          <div className="mr-6">
            <Link to="/">
              <Logo  />
            </Link>
          </div>

          {/* Navigation */}
          <ul className="flex ml-auto items-center gap-3">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="px-5 py-2 rounded-full font-medium
                                 text-white bg-blue-500 hover:bg-blue-600
                                 transition duration-300 shadow-lg cursor-pointer"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}

            {/* Logout Button */}
            {authStatus && (
              <li>
                <LogoutBtn className="ml-2" />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header
