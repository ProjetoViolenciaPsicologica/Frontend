/* eslint-disable @next/next/no-img-element */
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Raleway, Quicksand, Montserrat, Inter } from "next/font/google";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import Router from "next/router";
import { destroyCookie } from "nookies";
import { Modal, Divider } from "antd";

const raleway = Raleway({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  style: "normal",
  subsets: ["latin"],
});

const inter = Inter({
  style: "normal",
  subsets: ["latin"],
});

const quicksand = Quicksand({
  weight: "600",
  style: "normal",
  subsets: ["latin"],
});

export default function AppSidebar() {
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
  const items = [
    {
      title: "DASHBOARD",
      url: "/dashboard",
      icon: "home",
    },
    {
      title: "ARQUIVOS",
      url: "/arquivo",
      icon: "arquivo",
    },
    {
      title: "USUÁRIOS",
      url: "/usuarios",
      icon: "user",
    },
    {
      title: "ESTATÍSTICA",
      url: "/estatistica",
      icon: "statistic",
    },
    {
      title: "QUESTIONÁRIO",
      url: "/formulario",
      icon: "form",
    },
    {
      title: "EDIT QUEST",
      url: "/editar_formulario",
      icon: "edit_form",
    },
  ]
  return (
    <>
      <Sidebar className="bg-gray text-black">
        <SidebarHeader className="p-4">
        <div className="flex w-full ">
          <Link
            href="/dashboard"
            className={`${quicksand.className} flex  flex-col items-center justify-center text-white `}
          >
            <Image src="/icon.svg" width={44} height={44} alt={"icon"} className="w-36 h-36"/>
            <h1
              className={`text-neutral-700 text-xl font-medium ${montserrat.className} leading-[46.80px] truncate`}
            >
              Quest. Kurt Mendonça
            </h1>
          </Link>
        </div>

        </SidebarHeader>
        <SidebarContent className="px-3 py-4 text-gray-100">
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title}>
                
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                    >
                        <div
                          className={`ml-1 fill-white-default text-white-default `}
                        >
                          <Image src={`/${item.icon}.svg`} width={29} height={29} alt={item.icon} />
                        </div>
                    
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
         
        </SidebarContent>
        <SidebarFooter className="p-4">
        <Button
            variant="ghost"
            className="text-black w-full justify-start"
            onClick={() => {
              if (
                Router.asPath === "/formularioUser" ||
                Router.asPath === "/formulario"
              ) {
                setIsModalOpen(true);
              } else {
                handleLogout();
              }
            }}
          >
            <img src="/logout.svg" alt="Logout" className="mr-2" />
            <span className={quicksand.className}>Sair</span>
          </Button>
        </SidebarFooter>
      </Sidebar>

      <Modal
        title="TEM CERTEZA QUE DESEJA SAIR?"
        open={isModalOpen}
        onCancel={handleCancel}
        className=" h-[478px]"
        footer={null}
      >
        <Divider />
        <span
          className={`mt-8 text-center text-black text-2xl font-semibold ${montserrat.className}`}
        >
          Ao deixar a página, todas as informações preenchidas e selecionadas
          para questionário serão perdidas.{" "}
        </span>
        <Divider />

        <div className="flex justify-center mt-4 gap-x-5">
          <button
            onClick={handleCancel}
            className={`w-[172px] h-[59px]  bg-red-600 rounded-[32px] text-white text-xl font-bold ${inter.className}`}
          >
            CANCELAR
          </button>
          <button
            onClick={handleLogout}
            className={`w-[172px] h-[59px] hover:bg-esmerald-900 bg-black rounded-[32px] text-white text-xl font-bold ${inter.className}`}
          >
            SAIR
          </button>
        </div>
      </Modal>
    </>
  );
}
