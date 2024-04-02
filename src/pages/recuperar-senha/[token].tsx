import React, { useState } from "react";
import Image from "next/image";
import { Karla, Quicksand, Montserrat } from "next/font/google";
import { Form, Input, Button } from "antd";
import { useRouter } from "next/router";
import api from "@/pages/api";
import { toast } from "react-toastify";
import { destroyCookie } from "nookies";

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

type form = {
  senha: string;
  senha_confirm: string;
};

export default function Index() {
  const [errors, setError] = useState<any>(null);
  const router = useRouter();
  const token = router.query.token;
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  async function onSubmit(data: form) {
    const dataSubmit: any = {
      password: data.senha,
      token: token,
    };
    setLoading(true);
    try {
      await api.password_reset(dataSubmit);

      setError(null);
      toast.success("Senha mudada com sucesso");
      router.push("/login");
    } catch (error: any) {
      error?.response.data.password &&
        setError(Array?.from(error?.response.data.password));
      if (error.response.data.detail) {
        toast.error("Tempo expirado");
        router.push("/recuperar-senha");
      }
      if (error?.response?.status === 401) {
        toast.error("Tempo expirado");
        destroyCookie(null, "psi-token");
        destroyCookie(null, "psi-refreshToken");
        router.push("/login");
      }
    } finally {
      setLoading(false);
    }
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
        className={`${quicksand.className} flex flex-col items-center gap-x-2 text-white truncate whitespace-nowrap p-4 `}
      >
        <Image src="/icon.svg" width={150} height={150} alt={"icon"} />
        <h1
          className={`${montserrat.className} text-center text-neutral-700 text-4xl font-bold leading-[46.80px]`}
        >
          KM-QUEST
        </h1>
      </div>

      <div className="mt-10 px-4 w-full flex  flex-col items-center">
        <h1 className={`${karla.className} text-black text-2xl font-bold`}>
          Cadastro de nova senha de usuário
        </h1>
        <Form form={form} onFinish={onSubmit}>
          <div className="flex flex-col mt-4">
            <label htmlFor="senha" className="text-xl font-bold ml-4">
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
              <Input.Password
                placeholder="Digite sua nova senha"
                className="text-neutral-400 text-lg font-normal font-['Roboto'] md:w-[618px] h-[60px] bg-white rounded-[10px] shadow border border-black border-opacity-10  "
              />
            </Form.Item>
          </div>
          <div className="flex flex-col mt-8">
            <label htmlFor="senha_confirm" className="text-xl font-bold ml-4">
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
              <Input.Password
                placeholder="Repita sua senha"
                className="text-neutral-400 text-lg font-normal font-['Roboto'] w-[90vw] md:w-[618px] h-[60px] bg-white rounded-[10px] shadow border border-black border-opacity-10  "
              />
            </Form.Item>
          </div>

          <div className="mt-4 flex justify-center w-full">
            <Button
              htmlType="submit"
              loading={loading}
              className="w-[212px] h-[51px] bg-emerald-950 rounded-[32px] text-white text-xl font-bold font-['Inter']"
            >
              MUDAR SENHA
            </Button>
          </div>
        </Form>

        {errors?.map((error: any, i: number) => (
          <span
            className={`${karla.className} text-red-500 text-base mt-2`}
            key={i}
          >
            {error}
          </span>
        ))}
      </div>
    </div>
  );
}
