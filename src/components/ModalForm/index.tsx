import React, { useState } from "react";
import { Modal, Divider, Button } from "antd";
import { Montserrat, Inter } from "next/font/google";
import Image from "next/image";
import { useMutation } from "react-query";
import { toast } from "react-toastify";
import { api } from "@/services";
import nookies from "nookies";
import Router from "next/router";

const montserrat = Montserrat({
  style: "normal",
  subsets: ["latin"],
});

const inter = Inter({
  style: "normal",
  subsets: ["latin"],
});

export type ValuePropsType = {
  isModalOpen: boolean;
  setIsModalOpen: (isModal: boolean) => void;
  sum: number;
  setOkQuestion: (ok: boolean) => void;
  data: any;
};

export default function Index({
  isModalOpen,
  setIsModalOpen,
  sum,
  setOkQuestion,
  data,
}: ValuePropsType) {
  const [loading, setLoading] = useState(false);
  const { mutate } = useMutation(
    async (data: any) => {
      const token = nookies.get()["psi-token"];
      const response = await api.post("/formulario/novo", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response;
    },
    {
      onError: (error) => {
        setLoading(false);
        console.error("Sessão expirada, faça login novamente:", error);
        toast.error("Sessão expirada, faça login novamente.", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        // destroyCookie(null, "psi-token");
        // destroyCookie(null, "psi-refreshToken");
        // Router.push("/login");
      },
      onSuccess: (response) => {
        if (response.status === 201) {
          setLoading(false);
          toast.success("Respostas cadastradas com sucesso!", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });

          setTimeout(() => {
            Router.push("/dashboard");
          }, 2000);
        } else {
          toast.error("Erro ao enviar as respostas.", {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      },
      onMutate: () => {
        setLoading(true); // Ativa o estado de loading quando a mutação é iniciada
      },
    }
  );

  function handleOk() {
    setLoading(true); // Set loading to true when the button is clicked
    mutate(data);
    setIsModalOpen(false);
  }

  function handleCancel() {
    setIsModalOpen(false);
    setOkQuestion(false);
  }
  return (
    <Modal
      title="Resultado Final"
      open={isModalOpen}
      onCancel={handleCancel}
      className=" h-[478px]"
      footer={null}
    >
      {sum >= 15 && sum <= 30 && (
        <div className="flex flex-col justify-center items-center w-full h-full ">
          <Image src="/green.svg" width={52} height={52} alt={"sinal verde"} />
          <Divider className="border-[#B5B5B5] w-full" />
          <ul className="w-full h-full list-disc px-10">
            <li
              className={`${montserrat.className}  text-black text-center text-2xl font-bold`}
            >
              A pontuação do formulário foi {sum}. SINAL VERDE. Dispensando o
              entrevistado de outros encaminhamentos
            </li>
          </ul>
          <Divider className="border-[#B5B5B5] w-full" />
          <ul className="w-full h-full list-disc px-10">
            <li
              className={`${montserrat.className} text-black text-center text-2xl font-bold`}
            >
              Será registrado um formulário contendo este resultado e as
              informações de um entrevistado.
            </li>
          </ul>
          <Divider className="border-[#B5B5B5] w-full" />
          <div className="flex flex-col-reverse md:flex-row gap-y-2 md:justify-center md:mt-4  md:gap-x-5">
            <button
              onClick={handleCancel}
              className={`w-[172px] h-[59px]  bg-red-600 rounded-[32px] text-white text-xl font-bold ${inter.className}`}
            >
              CANCELAR
            </button>
            <Button
              loading={false}
              onClick={handleOk}
              className={`w-[172px] h-[59px] hover:bg-esmerald-900 bg-emerald-950 rounded-[32px] text-white text-xl font-bold ${inter.className}`}
            >
              REGISTRAR
            </Button>
          </div>
        </div>
      )}
      {sum >= 31 && sum <= 38 && (
        <div className="flex flex-col justify-center items-center w-full h-full ">
          <Image
            src="/yellow.svg"
            width={52}
            height={52}
            alt={"sinal Amarelo"}
          />

          <Divider className="border-[#B5B5B5] w-full" />
          <ul className="w-full h-full list-disc px-10">
            <li
              className={`${montserrat.className}  text-black text-center text-2xl font-bold`}
            >
              A pontuação do formulário foi {sum}. SINAL AMARELO. Necessário
              encaminhamento para atendimento multidisciplinar
              médico-psicológico-social.
            </li>
          </ul>
          <Divider className="border-[#B5B5B5] w-full" />
          <ul className="w-full h-full list-disc px-10">
            <li
              className={`${montserrat.className}  text-black text-center text-2xl font-bold`}
            >
              Será registrado um formulário contendo este resultado e as
              informações de um entrevistado.
            </li>
          </ul>
          <Divider className="border-[#B5B5B5] w-full" />
          <div className="flex justify-center mt-4 gap-x-5">
            <button
              onClick={handleCancel}
              className={`w-[172px] h-[59px]  bg-red-600 rounded-[32px] text-white text-xl font-bold ${inter.className}`}
            >
              CANCELAR
            </button>
            <Button
              loading={loading}
              onClick={handleOk}
              className={`w-[172px] h-[59px] hover:bg-esmerald-900 bg-emerald-950 rounded-[32px] text-white text-xl font-bold ${inter.className}`}
            >
              REGISTRAR
            </Button>
          </div>
        </div>
      )}
      {sum >= 39 && sum <= 60 && (
        <div className="flex flex-col justify-center items-center w-full h-full ">
          <Image src="/red.svg" width={52} height={52} alt={"sinal Amarelo"} />

          <Divider className="border-[#B5B5B5] w-full" />
          <ul className="w-full h-full list-disc px-10">
            <li
              className={`${montserrat.className} text-black text-center text-2xl font-bold`}
            >
              A pontuação do formulário foi {sum}. SINAL VERMELHO. Necessário
              encaminhamento <span className="text-red-600">URGENTE</span> para
              atendimento multidisciplinar médico-psicológico-social.
            </li>
          </ul>
          <Divider className="border-[#B5B5B5] w-full" />
          <ul className="w-full h-full list-disc px-10">
            <li
              className={`${montserrat.className} text-black text-center text-2xl font-bold`}
            >
              Será registrado um formulário contendo este resultado e as
              informações de um entrevistado.
            </li>
          </ul>
          <Divider className="border-[#B5B5B5] w-full" />
          <div className="flex justify-center mt-4 gap-x-5">
            <button
              onClick={handleCancel}
              className={`w-[172px] h-[59px]  bg-red-600 rounded-[32px] text-white text-xl font-bold ${inter.className}`}
            >
              CANCELAR
            </button>
            <Button
              loading={false}
              onClick={handleOk}
              className={`w-[172px] h-[59px] hover:bg-esmerald-900 bg-emerald-950 rounded-[32px] text-white text-xl font-bold ${inter.className}`}
            >
              REGISTRAR
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
