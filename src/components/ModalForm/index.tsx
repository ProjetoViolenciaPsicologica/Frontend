import React from "react";
import { Modal, Divider, Button } from "antd";
import { Montserrat } from "next/font/google";
import Image from 'next/image'

const montserrat = Montserrat({
  style: "normal",
  subsets: ["latin"],
});

export type ValuePropsType = {
  isModalOpen: boolean;
  setIsModalOpen: (isModal: boolean) => void;
  sum: number;
  setOkQuestion:(ok:boolean)=>void;
};

export default function Index({
  isModalOpen,
  setIsModalOpen,
  sum,
  setOkQuestion
}: ValuePropsType) {
  function handleOk() {
    setIsModalOpen(false);
  }
  function handleCancel() {
    setIsModalOpen(false);
    setOkQuestion(false)
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
              className={`${montserrat.className} text-center text-black text-center text-2xl font-bold`}
            >
              A pontuação do formulário foi {sum}. SINAL VERDE. Dispensando o
              entrevistado de outros encaminhamentos
            </li>
          </ul>
          <Divider className="border-[#B5B5B5] w-full" />
          <ul className="w-full h-full list-disc px-10">
            <li
              className={`${montserrat.className} text-center text-black text-center text-2xl font-bold`}
            >
              Será registrado um formulário contendo este resultado e as
              informações de um entrevistado.
            </li>
          </ul>
          <Divider className="border-[#B5B5B5] w-full" />
          <div className="flex justify-center mt-4 gap-x-5">
            <button
              onClick={handleCancel}
              className="w-[172px] h-[59px]  bg-red-600 rounded-[32px] text-white text-xl font-bold font-['Inter']"
            >
              CANCELAR
            </button>
            <Button
              loading={false}
              onClick={handleOk}
              className="w-[172px] h-[59px] hover:bg-esmerald-900 bg-emerald-950 rounded-[32px] text-white text-xl font-bold font-['Inter']"
            >
              REGISTRAR
            </Button>
          </div>
        </div>
      )}
      {sum >= 31 && sum <= 38 && (
        <div className="flex flex-col justify-center items-center w-full h-full ">
                   <Image src="/yellow.svg" width={52} height={52} alt={"sinal Amarelo"} />


          <Divider className="border-[#B5B5B5] w-full" />
          <ul className="w-full h-full list-disc px-10">
            <li
              className={`${montserrat.className} text-center text-black text-center text-2xl font-bold`}
            >
              A pontuação do formulário foi {sum}. SINAL AMARELO. Necessário encaminhamento para atendimento multidisciplinar médico-psicológico-social.
            </li>
          </ul>
          <Divider className="border-[#B5B5B5] w-full" />
          <ul className="w-full h-full list-disc px-10">
            <li
              className={`${montserrat.className} text-center text-black text-center text-2xl font-bold`}
            >
              Será registrado um formulário contendo este resultado e as informações de um entrevistado.
            </li>
          </ul>
          <Divider className="border-[#B5B5B5] w-full" />
          <div className="flex justify-center mt-4 gap-x-5">
            <button
              onClick={handleCancel}
              className="w-[172px] h-[59px]  bg-red-600 rounded-[32px] text-white text-xl font-bold font-['Inter']"
            >
              CANCELAR
            </button>
            <Button
              loading={false}
              onClick={handleOk}
              className="w-[172px] h-[59px] hover:bg-esmerald-900 bg-emerald-950 rounded-[32px] text-white text-xl font-bold font-['Inter']"
            >
              REGISTRAR
            </Button>
          </div>
        </div>
      )}
      {sum >= 39 && sum <= 60 &&<div className="flex flex-col justify-center items-center w-full h-full ">
                   <Image src="/red.svg" width={52} height={52} alt={"sinal Amarelo"} />


          <Divider className="border-[#B5B5B5] w-full" />
          <ul className="w-full h-full list-disc px-10">
            <li
              className={`${montserrat.className} text-center text-black text-center text-2xl font-bold`}
            >
             A pontuação do formulário foi {sum}. SINAL VERMELHO. Necessário encaminhamento <span className="text-red-600">URGENTE</span> para atendimento multidisciplinar médico-psicológico-social.
            </li>
          </ul>
          <Divider className="border-[#B5B5B5] w-full" />
          <ul className="w-full h-full list-disc px-10">
            <li
              className={`${montserrat.className} text-center text-black text-center text-2xl font-bold`}
            >
              Será registrado um formulário contendo este resultado e as informações de um entrevistado.
            </li>
          </ul>
          <Divider className="border-[#B5B5B5] w-full" />
          <div className="flex justify-center mt-4 gap-x-5">
            <button
              onClick={handleCancel}
              className="w-[172px] h-[59px]  bg-red-600 rounded-[32px] text-white text-xl font-bold font-['Inter']"
            >
              CANCELAR
            </button>
            <Button
              loading={false}
              onClick={handleOk}
              className="w-[172px] h-[59px] hover:bg-esmerald-900 bg-emerald-950 rounded-[32px] text-white text-xl font-bold font-['Inter']"
            >
              REGISTRAR
            </Button>
          </div>
        </div>}
    </Modal>
  );
}
