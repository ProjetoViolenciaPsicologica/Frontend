import React, { useEffect, useState } from "react";
import { Modal, Divider, Button,notification } from "antd";
import { Montserrat, Inter } from "next/font/google";
import Image from "next/image";
import { useMutation } from "react-query";
import { api } from "@/services";
import { destroyCookie, parseCookies } from "nookies";
import {useRouter} from "next/router";
import { jwtDecode } from "jwt-decode";


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
  setLoadingComp?: (loading: boolean) => void;
  tipo?: string;
  setPage?: (page: number) => void;
  page?: number;
  isSuperuser?: boolean;
};

export default function Index({
  isModalOpen,
  setIsModalOpen,
  sum,
  setOkQuestion,
  data,
  tipo,
  setPage,
  page,
  setLoadingComp,
}: ValuePropsType) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [mOpen, setModalOpen] = useState(false);
  
  useEffect(() => {
    isModalOpen && setModalOpen(true);
  }, [isModalOpen]);

  const cookies = parseCookies();

  const token = cookies["psi-token"];
  const decoded : { is_superuser: boolean} = jwtDecode(token);
  const isSuperuser = decoded.is_superuser;
  const createForm = useMutation(
    async (data: any) => {
      const id = parseInt(cookies["id-entrevistado"], 10);

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      if (tipo === "saúde") {
        return await api.patch(`/formulario/${id}`, data, { headers });
      } else {
        return await api.post("/formulario/novo", data, { headers });
      }
    },
    {
      onSuccess: (response: any) => {
        if (response.status === 201 || response.status === 200) {
          notification.success({
            message: "Sucesso!",
            description: "Respostas cadastradas com sucesso!",
          });
          setLoading(false);
          destroyCookie(null, "id-entrevistado");
          setIsModalOpen(false);
          setLoadingComp && setLoadingComp(true)
          setTimeout(() => {
            isSuperuser ?
            router.push("/dashboard")
            : router.push("/inicio");
          }, 3000);
        } else {
          notification.error({
            message: "Erro!",
            description: "Erro ao enviar as respostas.",
          });
          setLoading(false);
        }
      },
      onError: (error: any) => {
        setLoading(false);
        console.error("Sessão expirada, faça login novamente:", error);
        notification.error({
          message: "Erro!",
          description: "Sessão expirada, faça login novamente.",
        });

        // Caso queira implementar logout aqui:
        destroyCookie(null, "psi-token");
        destroyCookie(null, "psi-refreshToken");
        router.push("/login");
      },
      
    }
  );

  function handleOk() {
    setLoading(true); // Set loading to true when the button is clicked
    createForm.mutateAsync(data);
  }

  function handleCancel() {
    if(tipo === 'saúde'){
      setModalOpen(false);
      setPage && page && setPage(page - 1);
    }
    setIsModalOpen(false);
    setOkQuestion(false);
  }
  return (
    <Modal
      title="Resultado Final"
      open={mOpen && isModalOpen}
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
              A pontuação do questionário foi {sum}. <span className="text-[#0FA44A]">SINAL VERDE.</span>  Dispensando o
              entrevistado de outros encaminhamentos
            </li>
          </ul>
          <Divider className="border-[#B5B5B5] w-full" />
          <ul className="w-full h-full list-disc px-10">
            <li
              className={`${montserrat.className} text-black text-center text-2xl font-bold`}
            >
              Será registrado um questionário contendo este resultado e as
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
              loading={loading}
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
              A pontuação do questionário foi {sum}. <span className="text-[#fcaf15]">SINAL AMARELO</span>. Necessário
              encaminhamento para atendimento multidisciplinar
              médico-psicológico-social.
            </li>
          </ul>
          <Divider className="border-[#B5B5B5] w-full" />
          <ul className="w-full h-full list-disc px-10">
            <li
              className={`${montserrat.className}  text-black text-center text-2xl font-bold`}
            >
              Será registrado um questionário contendo este resultado e as
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
              A pontuação do questionário foi {sum}. <span className="text-red-600">SINAL VERMELHO</span>. Necessário
              encaminhamento <span className="text-red-600">URGENTE</span> para
              atendimento multidisciplinar médico-psicológico-social.
            </li>
          </ul>
          <Divider className="border-[#B5B5B5] w-full" />
          <ul className="w-full h-full list-disc px-10">
            <li
              className={`${montserrat.className} text-black text-center text-2xl font-bold`}
            >
              Será registrado um questionário contendo este resultado e as
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
