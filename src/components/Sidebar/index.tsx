import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Raleway, Quicksand } from "next/font/google";
import { Squash as Hamburger } from "hamburger-react";
import Router from "next/router";
import { destroyCookie } from "nookies";
import { Modal, Divider } from "antd";
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
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleCancel() {
    setIsModalOpen(false);
  }
  function handleLogout() {
    destroyCookie(null, "psi-token");
    destroyCookie(null, "psi-refreshToken");
    Router.push("/login");
  }
  return (
    <>
      <input type="checkbox" id="menu-open" className="hidden" />

      <header className="flex w-screen items-center justify-between bg-gray text-gray-100 md:hidden pr-4">
        <div className="flex w-full ">
          <Link
            href="/dashboard"
            className={`${quicksand.className} flex items-center gap-x-2 text-white block truncate whitespace-nowrap p-4 `}
          >
            <Image src="/icon.svg" width={44} height={44} alt={"icon"} />
            <h1 className="text-neutral-700 text-2xl font-bold font-['Montserrat'] leading-[46.80px]">
              KM-QUEST
            </h1>
          </Link>
        </div>

        <Hamburger
          toggled={isOpen}
          toggle={setOpen}
          color="black"
          distance="lg"
        />
      </header>

      <aside
        id="sidebar"
        className={`absolute inset-y-0 left-0 z-50 w-3/4 min-w-56 transform space-y-6  bg-gray px-0 pt-6 text-gray-100 transition duration-200 ease-in-out md:relative md:flex md:w-64 md:translate-x-0 md:flex-col md:justify-between ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="flex flex-col space-y-6"
          data-dev-hint="optional div for having an extra footer navigation"
        >
          <Link
            href="/dashboard"
            className="text-white flex flex-col items-center justify-center mb-24"
          >
            <Image src="/icon.svg" width={144} height={144} alt={"icon"} />
            <h1 className="text-neutral-700 text-4xl font-bold font-['Montserrat'] leading-[46.80px]">
              KM-QUEST
            </h1>
          </Link>

          <nav
            data-dev-hint="main navigation"
            className={`${raleway.className} flex flex-col justify-center md:gap-y-4 text-bgGray  font-normal`}
          >
            <Link href="/dashboard" className="flex items-center pl-7 gap-x-2">
              <Image src="/home.svg" width={29} height={29} alt={"icon"} />
              <span className="">INÍCIO</span>
            </Link>
            <Link
              href="/arquivo"
              className="flex items-center pl-7 mt-4 md:mt-0 gap-x-2"
            >
              <Image src="/arquivo.svg" width={29} height={29} alt={"icon"} />
              <span className="">ARQUIVOS</span>
            </Link>
            <Link
              href="/formulario"
              className="flex items-center pl-7 py-4 md:py-0 gap-x-2"
            >
              <Image src="/form.svg" width={29} height={29} alt={"form"} />
              <span>FORMULÁRIO</span>
            </Link>
            <Link href="/usuarios" className="flex items-center pl-7  gap-x-2">
              <Image src="/user.svg" width={29} height={29} alt={"user"} />
              <span>USUÁRIOS</span>
            </Link>
            <Link
              href="/estatistica"
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
            <button
              type="button"
              onClick={() => {
                setIsModalOpen(true);
              }}
              className={`group flex w-full items-center space-x-2 px-3 py-2 ${raleway.className} transition duration-200 ml-4 text-bgGray  font-normal`}
            >
              <svg
                fill="black"
                width="29"
                height="29"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                viewBox="0 0 330 330"
                xmlSpace="preserve"
              >
                <g id="XMLID_2_">
                  <path
                    id="XMLID_4_"
                    d="M51.213,180h173.785c8.284,0,15-6.716,15-15s-6.716-15-15-15H51.213l19.394-19.393
		c5.858-5.857,5.858-15.355,0-21.213c-5.856-5.858-15.354-5.858-21.213,0L4.397,154.391c-0.348,0.347-0.676,0.71-0.988,1.09
		c-0.076,0.093-0.141,0.193-0.215,0.288c-0.229,0.291-0.454,0.583-0.66,0.891c-0.06,0.09-0.109,0.185-0.168,0.276
		c-0.206,0.322-0.408,0.647-0.59,0.986c-0.035,0.067-0.064,0.138-0.099,0.205c-0.189,0.367-0.371,0.739-0.53,1.123
		c-0.02,0.047-0.034,0.097-0.053,0.145c-0.163,0.404-0.314,0.813-0.442,1.234c-0.017,0.053-0.026,0.108-0.041,0.162
		c-0.121,0.413-0.232,0.83-0.317,1.257c-0.025,0.127-0.036,0.258-0.059,0.386c-0.062,0.354-0.124,0.708-0.159,1.069
		C0.025,163.998,0,164.498,0,165s0.025,1.002,0.076,1.498c0.035,0.366,0.099,0.723,0.16,1.08c0.022,0.124,0.033,0.251,0.058,0.374
		c0.086,0.431,0.196,0.852,0.318,1.269c0.015,0.049,0.024,0.101,0.039,0.15c0.129,0.423,0.28,0.836,0.445,1.244
		c0.018,0.044,0.031,0.091,0.05,0.135c0.16,0.387,0.343,0.761,0.534,1.13c0.033,0.065,0.061,0.133,0.095,0.198
		c0.184,0.341,0.387,0.669,0.596,0.994c0.056,0.088,0.104,0.181,0.162,0.267c0.207,0.309,0.434,0.603,0.662,0.895
		c0.073,0.094,0.138,0.193,0.213,0.285c0.313,0.379,0.641,0.743,0.988,1.09l44.997,44.997C52.322,223.536,56.161,225,60,225
		s7.678-1.464,10.606-4.394c5.858-5.858,5.858-15.355,0-21.213L51.213,180z"
                  />
                  <path
                    id="XMLID_5_"
                    d="M207.299,42.299c-40.944,0-79.038,20.312-101.903,54.333c-4.62,6.875-2.792,16.195,4.083,20.816
		c6.876,4.62,16.195,2.794,20.817-4.083c17.281-25.715,46.067-41.067,77.003-41.067C258.414,72.299,300,113.884,300,165
		s-41.586,92.701-92.701,92.701c-30.845,0-59.584-15.283-76.878-40.881c-4.639-6.865-13.961-8.669-20.827-4.032
		c-6.864,4.638-8.67,13.962-4.032,20.826c22.881,33.868,60.913,54.087,101.737,54.087C274.956,287.701,330,232.658,330,165
		S274.956,42.299,207.299,42.299z"
                  />
                </g>
              </svg>

              <span>SAIR</span>
            </button>
          </nav>
        </div>
      </aside>

      <Modal
        title="TEM CERTEZA QUE DESEJA SAIR?"
        open={isModalOpen}
        onCancel={handleCancel}
        className=" h-[478px]"
        footer={null}
      >
        <Divider />
        <span className="mt-8 text-center text-black text-2xl font-semibold font-['Montserrat']">
          Ao deixar a página, todas as informações preenchidas e selecionadas
          para formulário serão perdidas.{" "}
        </span>
        <Divider />

        <div className="flex justify-center mt-4 gap-x-5">
          <button
            onClick={handleCancel}
            className="w-[172px] h-[59px]  bg-red-600 rounded-[32px] text-white text-xl font-bold font-['Inter']"
          >
            CANCELAR
          </button>
          <button
            onClick={handleLogout}
            className="w-[172px] h-[59px] hover:bg-esmerald-900 bg-black rounded-[32px] text-white text-xl font-bold font-['Inter']"
          >
            SAIR
          </button>
        </div>
      </Modal>
    </>
  );
}
