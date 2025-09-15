import React, { useState } from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, X, User, LogOut } from "lucide-react"; // lucide-react icons
import Profile from "../../pages/Profile";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData); // assuming you store user info
  const navigate = useNavigate();

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "Signup", slug: "/signup", active: !authStatus },
    { name: "community blogs", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b shadow-sm">
      <Container>
        <nav className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-2xl text-purple-600"
          >
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center gap-6">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className="px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition cursor-pointer"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}

            {/* Profile Dropdown */}
            {authStatus && (
              <li className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-100 hover:bg-purple-200 transition cursor-pointer"
                >
                  <span className="font-medium text-purple-700">
                    {userData?.name || "User"}
                  </span>
                  <img
                    src={`https://ui-avatars.com/api/?name=${userData?.name || "U"}&background=8b5cf6&color=fff`}
                    alt="avatar"
                    className="w-8 h-8 rounded-full border border-purple-400"
                  />
                </button>

                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-lg shadow-lg border p-2 z-50 cursor-pointer">
                    <button 
                      onClick={() => {
                        navigate("/profile");
                        setProfileOpen(false);
                      }}
                      className="flex cursor-pointer items-center gap-2 w-full px-3 py-2 rounded-md hover:bg-purple-50 text-gray-700"
                    >
                      <User size={16} /> Profile
                    </button>
                    <div className="border-t my-1"></div>
                    <div
                      onClick={() => setProfileOpen(false)}
                      className="flex items-center gap-2 px-3 py-2 rounded-md hover:bg-red-50 text-black cursor-pointer"
                    >
                      <LogOut size={16} /> <LogoutBtn />
                    </div>
                  </div>
                )}
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
                <button
                  onClick={() => {
                    navigate("/Profile");
                    setMenuOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 rounded-lg font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 transition"
                >
                  Profile
                </button>
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
