import Link from "next/link";
import { useState } from "react";
import logo from "../../../assets/logos/main-logo.png";
import Image from "next/image";
const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menu = (
    <>
      <li>
        <Link
          href="/"
          class="font-medium tracking-wide text-gray-900 transition-colors duration-200 hover:text-primary"
        >
          Home
        </Link>
      </li>
      <li>
        <Link
          href="/services"
          class="font-medium tracking-wide text-gray-900 transition-colors duration-200 hover:text-primary"
        >
          Services
        </Link>
      </li>
      <li>
        <Link
          href="/about"
          class="font-medium tracking-wide text-gray-900 transition-colors duration-200 hover:text-primary"
        >
          About Us
        </Link>
      </li>
      <li>
        <Link
          href="/blogs"
          class="font-medium tracking-wide text-gray-900 transition-colors duration-200 hover:text-primary"
        >
          Blogs
        </Link>
      </li>
    </>
  );
  return (
    <div className="shadow-lg sticky top-0 bg-white">
      <div class="px-4 py-1 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl xl:max-w-screen-xl 2xl:max-w-screen-2xl md:px-24 lg:px-8">
        <div class="relative flex items-center justify-between">
          <Link
            href="/"
            aria-label="Ambulace Services"
            title="Ambulace Services"
            class="inline-flex items-center"
          >
            <Image src={logo} className="w-44 h-full"></Image>
          </Link>
          <ul class="flex items-center hidden space-x-8 lg:flex">{menu}</ul>
          <ul class="flex items-center hidden space-x-8 lg:flex">
            <li>
              <a
                href="/"
                class="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-primary hover:bg-secondary focus:shadow-outline focus:outline-none"
                aria-label="Login"
                title="Login"
              >
                Log In
              </a>
            </li>
          </ul>
          <div class="lg:hidden">
            <button
              aria-label="Open Menu"
              title="Open Menu"
              class="p-2 -mr-1 transition duration-200 rounded focus:outline-none focus:shadow-outline hover:bg-deep-purple-50 focus:bg-deep-purple-50"
              onClick={() => setIsMenuOpen(true)}
            >
              <svg class="w-5 text-gray-600" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M23,13H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,13,23,13z"
                />
                <path
                  fill="currentColor"
                  d="M23,6H1C0.4,6,0,5.6,0,5s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,6,23,6z"
                />
                <path
                  fill="currentColor"
                  d="M23,20H1c-0.6,0-1-0.4-1-1s0.4-1,1-1h22c0.6,0,1,0.4,1,1S23.6,20,23,20z"
                />
              </svg>
            </button>
            {isMenuOpen && (
              <div class="absolute top-0 left-0 w-full">
                <div class="p-5 bg-white border rounded shadow-sm">
                  <div class="flex items-center justify-between mb-4">
                    <div>
                      <Link
                        href="/"
                        aria-label="Ambulace Services"
                        title="Ambulace Services"
                        class="inline-flex items-center"
                      >
                        <Image src={logo} className="w-44 h-full"></Image>
                      </Link>
                    </div>
                    <div>
                      <button
                        aria-label="Close Menu"
                        title="Close Menu"
                        class="p-2 -mt-2 -mr-2 transition duration-200 rounded hover:bg-gray-200 focus:bg-gray-200 focus:outline-none focus:shadow-outline"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        <svg class="w-5 text-gray-600" viewBox="0 0 24 24">
                          <path
                            fill="currentColor"
                            d="M19.7,4.3c-0.4-0.4-1-0.4-1.4,0L12,10.6L5.7,4.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4l6.3,6.3l-6.3,6.3 c-0.4,0.4-0.4,1,0,1.4C4.5,19.9,4.7,20,5,20s0.5-0.1,0.7-0.3l6.3-6.3l6.3,6.3c0.2,0.2,0.5,0.3,0.7,0.3s0.5-0.1,0.7-0.3 c0.4-0.4,0.4-1,0-1.4L13.4,12l6.3-6.3C20.1,5.3,20.1,4.7,19.7,4.3z"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                  <nav>
                    <ul class="space-y-4">
                      {menu}
                      <li>
                        <a
                          href="/"
                          class="inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 rounded shadow-md bg-primary hover:bg-secondary focus:shadow-outline focus:outline-none"
                          aria-label="Login"
                          title="Login"
                        >
                          Log In
                        </a>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
