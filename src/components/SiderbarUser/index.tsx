/* eslint-disable jsx-a11y/alt-text */
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
import Router, { useRouter } from "next/router";
import { destroyCookie, parseCookies } from "nookies";
import { Modal, Divider, notification } from "antd";
import { api } from "@/services";

const montserrat = Montserrat({
  style: "normal",
  subsets: ["latin"],
});

const inter = Inter({
  style: "normal",
  subsets: ["latin"],
});

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

export default function AppSidebar({
  disabledLink,
}: {
  disabledLink?: boolean;
}) {
  const router = useRouter();
  const [isOpen, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cookies = parseCookies();
  const token = cookies["psi-token"];
  const id = parseInt(cookies["id-entrevistado"], 10);
  const id2 = cookies["id-entrevistado"];
  function handleCancel() {
    setIsModalOpen(false);
  }
  async function handleLogout() {
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await api.get(`formulario/${id}`, { headers });
      const form: { campo_questoes: string } = response.data;
      if (form.campo_questoes === null || form.campo_questoes === "") {
        await api.delete(`formulario/${id}`, { headers });
      }
    } catch (error) {
      console.log(error);
    }
    destroyCookie(null, "id-entrevistado");
    destroyCookie(null, "psi-token");
    destroyCookie(null, "psi-refreshToken");
    Router.push("/login");
  }
  const items = [
    {
      title: "INÍCIO",
      url: "/inicio",
      icon: "home",
    },
  ];
  return (
    <>
      <Sidebar className="bg-gray text-black">
        <SidebarHeader className="p-4">
          <div className="flex w-full ">
            <Link
              href="/dashboard"
              className={`${quicksand.className} flex  flex-col items-center justify-center text-white `}
            >
              <Image
                src="/icon.svg"
                width={44}
                height={44}
                alt={"icon"}
                className="w-36 h-36"
              />
              <h1
                className={`text-neutral-700 text-xl font-medium ${montserrat.className} leading-[46.80px] truncate`}
              >
                Quest. Kurt Mendonça
              </h1>
            </Link>
          </div>
        </SidebarHeader>
        <SidebarContent className="px-3 py-3 text-gray-100">
          <SidebarMenu>
            {items.map((item) => (
              <SidebarMenuItem key={item.title} className="cursor-pointer">
                <SidebarMenuButton
                  asChild
                  onClick={() => {
                    disabledLink && notification.warning({
                      message: "Proibido",
                      description: "Responda o questionário para voltar",
                    });
                  }}
                >
                  <a
                    href={!disabledLink ? item.url : undefined}
                    className="cursor-pointer"
                  >
                    <div
                      className={`ml-1 fill-white-default text-white-default `}
                    >
                      <Image
                        src={`/${item.icon}.svg`}
                        width={29}
                        height={29}
                        alt={item.icon}
                      />
                    </div>

                    <span className="font-medium">{item.title}</span>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
          <Button
            variant="ghost"
            className="text-black font-normal w-full justify-start"
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
            <img src="/logout.svg" alt="Logout" className="mr-1" />
            <span className={quicksand.className}>SAIR</span>
          </Button>
        </SidebarContent>
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
