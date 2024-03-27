import React from "react";
import Image from "next/image";
import { Karla, Quicksand, Montserrat } from "next/font/google";
import { Form, Input, Space, Switch, Select, InputNumber } from "antd";

const montserrat = Montserrat({
  weight: "700",
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

export default function Index() {
    const [form] = Form.useForm();
  function onSubmit(data: any) {
    console.log(data);
  }
  const validatePasswordConfirmation = (
    _: any,
    value: string,
    callback: (message?: string) => void
  ) => {
    const { getFieldValue } = form;

    if (value && value !== getFieldValue("senha")) {
      callback("As senhas não coincidem");
    } else {
      callback();
    }
  };
  return (
    <div className="h-screen w-full bg-[#F6FBF9] flex flex-col items-center">
      <div
        className={`${quicksand.className} flex flex-col items-center gap-x-2 text-white block truncate whitespace-nowrap p-4 `}
      >
        <Image src="/icon.svg" width={150} height={150} alt={"icon"} />
        <h1
          className={`${montserrat.className} text-center text-neutral-700 text-4xl font-bold leading-[46.80px]`}
        >
          KM-QUEST
        </h1>
      </div>

      <div className="mt-20 px-4">
        <h1 className={`${karla.className} text-black text-2xl font-bold`}>
          Cadastro de nova senha de usuário
        </h1>
        <Form form={form} onFinish={onSubmit}>
        <div className="flex flex-col mt-11">
        <label htmlFor="senha" className="text-xl font-bold">
          Nova senha:
        </label>
        <Form.Item
          name="senha"
          rules={[
            { required: true, message: "Por favor, insira a senha" },
            {
              type: "string",
              min: 6,
              message: "Senha deve ter no mínimo 6 caracteres",
            },
          ]}
        >
          <Input.Password placeholder="Digite sua senha" className="text-neutral-400 text-lg font-normal font-['Roboto'] md:w-[618px] h-[60px] bg-white rounded-[10px] shadow border border-black border-opacity-10  "/>
        </Form.Item>
      </div>
      <div className="flex flex-col mt-11">
        <label htmlFor="senha_confirm" className="text-xl font-bold">
          Confirmação de senha:
        </label>
        <Form.Item
          name="senha_confirm"
          dependencies={["senha"]}
          rules={[
            { required: true, message: "Por favor, confirme a senha" },
            {
              validator: validatePasswordConfirmation,
            },
          ]}
        >
          <Input.Password placeholder="Digite sua senha novamente" className="text-neutral-400 text-lg font-normal font-['Roboto'] md:w-[618px] h-[60px] bg-white rounded-[10px] shadow border border-black border-opacity-10  "/>
        </Form.Item>
      </div>

          <div className="mt-8 md:mt-20 flex justify-center w-full">
            <button
              type="submit"
              className="w-[175px] h-[51px] bg-emerald-950 rounded-[32px] text-white text-xl font-bold font-['Inter']"
            >
              ENVIAR
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
