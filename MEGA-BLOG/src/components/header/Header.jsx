import React, { useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X } from "lucide-react"; // using lucide-react for icons

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active:true},
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "My Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b shadow-sm">
      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-2xl text-purple-600">
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-6">
            {navItems.map(
              (item) =>
                item.active  && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      
                      className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition
                      cursor-pointer"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>

        {/* Mobile Nav Dropdown */}
        {menuOpen && (
          <div className="md:hidden mt-2 bg-white shadow-md rounded-lg p-4 space-y-3">
            {navItems.map(
              (item) =>
                item.active && (
                  <button
                    key={item.name}
                    onClick={() => {
                      navigate(item.slug);
                      setMenuOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition"
                  >
                    {item.name}
                  </button>
                )
            )}
            {authStatus && (
              <div className="pt-2 border-t">
                <LogoutBtn />
              </div>
            )}
          </div>
        )}
      </Container>
    </header>
  );
}

export default Header;
