import React, { useState } from "react";
import Image from "next/image";
import { Karla, Quicksand, Montserrat, Roboto, Inter } from "next/font/google";
import { Form, Input, Button } from "antd";
import { api } from "@/services";
import { toast } from "react-toastify";

const montserrat = Montserrat({
  style: "normal",
  subsets: ["latin"],
});

const inter = Inter({
  style: "normal",
  subsets: ["latin"],
});

const roboto = Roboto({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

const karla = Karla({
  weight: "700",
  style: "normal",
  subsets: ["latin"],
});

const quicksand = Quicksand({
  weight: "600",
  style: "normal",
  subsets: ["latin"],
});

type form = {
  email: string;
};

export default function Index() {
  const [loading, setLoading] = useState(false);
  async function onSubmit(data: form) {
    setLoading(true);
    try {
      const response = await api.post("password_reset/", data);
      toast.success("Um email foi enviado para mudança de senha");
    } catch (error) {
      toast.error("Email não pertence a sua conta cadastrada");
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="h-screen w-full bg-[#F6FBF9] flex flex-col items-center">
      <div
        className={`${quicksand.className} flex flex-col items-center gap-x-2 text-white truncate whitespace-nowrap p-4 `}
      >
        <Image src="/icon.svg" width={150} height={150} alt={"icon"} />
        <h1
          className={`${montserrat.className} text-center text-neutral-700 text-4xl font-medium leading-[46.80px]`}
        >
          KM-QUEST
        </h1>
      </div>

      <div className="mt-10 w-full flex flex-col items-center px-4">
        <h1
          className={`${karla.className} ml-4 md:ml-0 text-black text-2xl font-bold`}
        >
          Esqueceu a sua senha?
        </h1>
        <span
          className={`${karla.className}w-full text-zinc-600 md:px-0 text-xl font-bold ml-4 md:text-start text-center px-4`}
        >
          Insira o e-mail cadastrado de sua conta para poder resetar e recuperar
          sua senha.
        </span>
        <Form onFinish={onSubmit}>
          <div className="flex flex-col mt-11">
            <label
              htmlFor="usuario"
              className={`${karla.className} ml-4  text-xl font-bold`}
            >
              E-mail:
            </label>
            <Form.Item
              className="w-96 md:w-full h-full"
              name={"email"}
              rules={[
                { required: true, message: "Por favor, insira o email" },
                { type: "email", message: "Email inválido" },
              ]}
            >
              <Input
                placeholder="Digite seu E-mail aqui"
                name={"email"}
                className={`text-neutral-400 text-lg font-normal  md:w-[926px] h-[60px] bg-white rounded-[10px] shadow border border-black border-opacity-10  ${roboto.className}`}
              />
            </Form.Item>
          </div>
          <div className="mt-4 md:mt-10  flex justify-center w-full">
            <Button
              htmlType="submit"
              loading={loading}
              className={`w-[175px] h-[51px] bg-emerald-950 rounded-[32px] text-white text-xl font-bold ${inter.className}`}
            >
              ENVIAR
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
