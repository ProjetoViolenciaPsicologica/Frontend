import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Raleway, Quicksand } from "next/font/google";
import { Squash as Hamburger } from 'hamburger-react';

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

export default function Sidebar() {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <input type="checkbox" id="menu-open" className="hidden" />

      <header
        className="flex w-screen items-center justify-between bg-gray text-gray-100 md:hidden pr-4"
      >
        <div className="flex w-full ">
          <Link
            href="/dashboard"
            className={`${quicksand.className}  text-white block truncate whitespace-nowrap p-4 `}
          >
            <Image src="/icon.svg" width={44} height={44} alt={"icon"} />
          </Link>
        </div>

        <Hamburger toggled={isOpen} toggle={setOpen} color="black" distance="lg" />
      </header>

      <aside
        id="sidebar"
        className={`absolute inset-y-0 left-0 z-50 w-3/4 min-w-[13%] transform space-y-6 overflow-y-auto bg-gray px-0 pt-6 text-gray-100 transition duration-200 ease-in-out md:relative md:flex md:w-64 md:translate-x-0 md:flex-col md:justify-between ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
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
            <Link
              href="/formulario"
              className="flex items-center pl-7 py-4 md:py-0 gap-x-2"
            >
              <Image src="/form.svg" width={29} height={29} alt={"form"} />
              <span>FORMULÁRIO</span>
            </Link>
            <Link href="/dashboard" className="flex items-center pl-7  gap-x-2">
              <Image src="/user.svg" width={29} height={29} alt={"user"} />
              <span>USUÁRIOS</span>
            </Link>
            <Link
              href="/dashboard"
              className="flex items-center pl-7 pt-4 md:pt-0 gap-x-2"
            >
              <Image
                src="/statistic.svg"
                width={29}
                height={29}
                alt={"statistic"}
              />
              <span>ESTATÍSTICA</span>
            </Link>
          </nav>
        </div>
      </aside>
    </>
  );
}
