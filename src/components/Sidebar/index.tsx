/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/label-has-associated-control */

import Link from "next/link";
import Image from "next/image";
import { Raleway, Quicksand } from "next/font/google";

const raleway = Raleway({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

const quicksand = Quicksand({
  weight: "600",
  style: "normal",
  subsets: ["latin"],
});


export default function Sidebar(){
  return (
    <>
      <input type="checkbox" id="menu-open" className="hidden" />

      <header
        className="flex w-screen justify-between bg-gray text-gray-100 md:hidden"
        data-dev-hint="mobile menu bar"
      >
        <div className="flex w-full">
          <Link
            href="/dashboard"
            className={`${quicksand.className} t text-white block truncate whitespace-nowrap p-4 `}
          >
            <Image src="/icon.svg" width={44} height={44} alt={"icon"} />
          </Link>
        </div>

        <label
          htmlFor="menu-open"
          id="mobile-menu-button"
          className="hover:text-white flex items-center rounded-md p-2 hover:cursor-pointer focus:outline-none"
        >
          <svg
            id="menu-open-icon"
            className="h-6 w-6 transition duration-200 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          <svg
            id="menu-close-icon"
            className="h-6 w-6 transition duration-200 ease-in-out"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </label>
      </header>

      <aside
        id="sidebar"
        className={` absolute inset-y-0 left-0 z-50 w-3/4 min-w-[13%] transform space-y-6 overflow-y-auto  bg-gray  px-0 pt-6 text-gray-100 transition duration-200 ease-in-out md:relative md:flex md:w-64 md:translate-x-0 md:flex-col md:justify-between `}
        data-dev-hint="sidebar; px-0 for frameless; px-2 for visually inset the navigation"
      >
        <div
          className="flex flex-col space-y-6"
          data-dev-hint="optional div for having an extra footer navigation"
        >
          <Link
            href="/dashboard"
            className="text-white flex items-center justify-center mb-24"
          >
            <Image src="/icon.svg" width={144} height={144} alt={"icon"} />
            
          </Link>

          <nav
            data-dev-hint="main navigation"
            className={`${raleway.className} flex flex-col justify-center md:gap-y-4 text-bgGray  font-normal`}
          >
          <Link href="/dashboard" className="flex items-center pl-7  gap-x-2">
          <Image src="/home.svg" width={29} height={29} alt={"icon"} />
          <span className="">INÍCIO</span>
          </Link>
          <Link href="/formulario" className="flex items-center pl-7 py-4 md:py-0 gap-x-2">
          <Image src="/form.svg" width={29} height={29} alt={"form"} />
          <span>FORMULÁRIO</span>
          </Link>
          <Link href="/dashboard" className="flex items-center pl-7  gap-x-2">
          <Image src="/user.svg" width={29} height={29} alt={"user"} />
          <span>USUÁRIOS</span>
          </Link>
          <Link href="/dashboard" className="flex items-center pl-7 pt-4 md:pt-0 gap-x-2">
          <Image src="/statistic.svg" width={29} height={29} alt={"statistic"} />
          <span>ESTATÍSTICA</span>
          </Link>
          </nav>
        </div>
      </aside>
    </>
  )
    
  
}