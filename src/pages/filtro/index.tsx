import React, { useRef } from "react";
import Layout from "@/components/Layout";
import { Raleway, DM_Sans } from "next/font/google";
import dynamic from "next/dynamic";
import { api } from "@/services/";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Button, Tooltip } from "antd";
import { FaDownload } from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const Box = dynamic(() => import("@/components/Charts/Box"), { ssr: false });

const Pie = dynamic(() => import("@/components/Charts/Pie"), { ssr: false });

const Bar = dynamic(() => import("@/components/Charts/BarHorizontal"), {
  ssr: false,
});

const raleway = Raleway({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

const dm = DM_Sans({
  weight: "500",
  style: "normal",
  subsets: ["latin"],
});

export interface Root {
  grau_de_instrucao: string;
  sexo: string;
  idade: number;
  local_aplicacao: string;
  data_inicio: string;
  area: string;
  definicaoLocalForm: string;
  data_fim: string;
  tipo_usuario: string;
  usuario: string;
}

export default function Index({ cookies }: { cookies: any }) {
  const [data, setData] = useState<Root>();
  const [qtForm, setQtForm] = useState<number>(0);
  const [dataBar, setdBar] = useState<any>();
  const [dataPie, setDPie] = useState<any>();
  const [dataD, setDataD] = useState<any>();
  const [hiddenButton, setHiddenButton] = useState<boolean>(false);

  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;
    setHiddenButton(true);
    const canvas = await html2canvas(contentRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("download.pdf");
    setHiddenButton(false);
  };

  async function getData() {
    const cookies = parseCookies();
    const data1: any = JSON.parse(cookies.dataFilter);
    const data2: any = cookies.dataSearch;

    setData(data1);

    // Definindo params corretamente como um objeto
    const params = { ...data1 }; // ou Object.assign({}, data1);

    try {
      const response = await api.get("formulario/sinalizacao", { params });
      const response1 = await api.get("formulario/quantidadeRespostas", {
        params,
      });
      const response4 = await api.get("desvio", { params });
      const quantidade = response4.data;
      const verde = quantidade.filter(
        (item: any) => item.sinalizacao === "Verde"
      );
      const amarelo = quantidade.filter(
        (item: any) => item.sinalizacao === "Amarelo"
      );
      const vermelho = quantidade.filter(
        (item: any) => item.sinalizacao === "Vermelho"
      );
      const calcularSomatorioCampoQuestoes = (dados: any[]) => {
        let somatorio = 0;
        dados.forEach((item) => {
          const valores = item.campo_questoes.split(",").map(Number);
          somatorio += valores.reduce((acc: any, valor: any) => acc + valor, 0);
        });
        return somatorio;
      };

      const d1 = calcularSomatorioCampoQuestoes(verde);
      const d2 = calcularSomatorioCampoQuestoes(amarelo);
      const d3 = calcularSomatorioCampoQuestoes(vermelho);
      setDataD([d1, d2, d3]);
      setQtForm(data2);
      setDPie(response.data);
      setdBar(response1.data);
    } catch (error) {
      console.error("Erro ao obter os dados:", error);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const router = useRouter();
  let startDate: any = data?.data_inicio?.split(" ")[0].split("-");
  let endDate: any = data?.data_fim?.split(" ")[0].split("-");
  if (startDate && endDate) {
    startDate = `${startDate[2]}/${startDate[1]}/${startDate[0]}`;
    endDate = `${endDate[2]}/${endDate[1]}/${endDate[0]}`;
  }

  return (
    <Layout>
      <div
        ref={contentRef}
        className="flex w-full  flex-col items-center pl-4 lg:items-start lg:pl-12 "
      >
        <div className="flex flex-col md:flex-row justify-between items-center w-full mt-4 md:mt-16 ">
          <div className=" flex h-full flex-col w-full">
            <button
              onClick={() => {
                router.back();
              }}
              className="mr-6 hover:cursor-pointer my-2"
            >
              <svg
                width="30"
                height="30"
                viewBox="0 0 30 30"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="30" height="30" rx="5" fill="#4239F2" />
                <g clipPath="url(#clip0_1450_3668)">
                  <path
                    d="M13.9023 15.0004L18.543 10.3598L17.2173 9.03418L11.2511 15.0004L17.2173 20.9667L18.543 19.6411L13.9023 15.0004Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1450_3668">
                    <rect
                      width="22.5"
                      height="22.5"
                      fill="white"
                      transform="matrix(-1 0 0 1 26.25 3.75)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </button>
            <h1 className={`${raleway.className} text-3xl font-normal `}>
              ESTATÍSTICA
            </h1>
            <span
              className={`${raleway.className} w-[309px] mt-4 text-black text-sm font-normal leading-tight`}
            >
              Disponibilização e visualização via filtro dos dados reunidos com
              base no registro de formulários
            </span>
            <span
              className={`${raleway.className} mt-3.5 mb-3 text-black text-[15px] font-normal leading-tight`}
            >
              <span className="font-bold">Local da Aplicação</span>:{" "}
              {data?.local_aplicacao ? data.local_aplicacao : "---------"}
            </span>
            <span
              className={`${raleway.className} mt-3.5 mb-3 text-black text-[15px] font-normal leading-tight`}
            >
              <span className="font-bold">Idade</span>:{" "}
              {data?.idade ? data?.idade : "---------"}
            </span>
            <span
              className={`${raleway.className} mt-3.5 mb-3 text-black text-[15px] font-normal leading-tight`}
            >
              <span className="font-bold">Sexo</span>:{" "}
              {data?.sexo ? data?.sexo : "---------"}
            </span>
            <span
              className={`${raleway.className} mt-3.5 mb-3 text-black text-[15px] font-normal leading-tight`}
            >
              <span className="font-bold">Grau de Instrução</span>:{" "}
              {data?.grau_de_instrucao ? data.grau_de_instrucao : "---------"}
            </span>
            <span
              className={`${raleway.className} mt-3.5 mb-3 text-black text-[15px] font-normal leading-tight`}
            >
              <span className="font-bold">Área</span>:{" "}
              {data?.area ? data?.area : "---------"}
            </span>
            <span
              className={`${raleway.className} mt-3.5 mb-3 text-black text-[15px] font-normal leading-tight`}
            >
              <span className="font-bold">Tipo de usuário</span>:{" "}
              {data?.definicaoLocalForm ? data.definicaoLocalForm : "---------"}
            </span>
          </div>
          <div className="flex flex-col h-full mr-16 md:mt-0 w-80">
            <h1
              className={`${raleway.className} text-black text-2xl font-normal mb-1.5`}
            >
              {data?.usuario ? data.usuario : "---------"}
            </h1>
            <span
              className={`${raleway.className} w-full text-black text-sm font-normal mb-5`}
            >
              {startDate && endDate
                ? `De ${startDate} até ${endDate}`
                : "---------"}
            </span>

            <div
              className={`bg-[#4339F2] w-[200px] h-[200px] rounded-[10px] gap-y-4 flex flex-col items-center`}
            >
              <span
                className={`${raleway.className} mt-5 text-lg font-normal text-white`}
              >
                FORMULÁRIOS
              </span>

              <span
                className={`${raleway.className} text-5xl font-normal text-white mt-4`}
              >
                {qtForm}
              </span>
            </div>
            <Button
              type="default"
              icon={<FaDownload />}
              onClick={handleDownloadPDF}
              className={`${
                hiddenButton ? "hidden" : "visible"
              } mt-4 w-[200px] flex items-center justify-center`}
            >
              Baixar PDF
            </Button>
          </div>
        </div>
        <div className="mt-10 gap-y-5 md:gap-x-5 w-full flex flex-col flex-wrap md:flex-row items-center">
          <div className="w-[80vw] lg:w-[30vw] h-[360px] flex flex-col justify-center items-center bg-[#D9D9D9] rounded-[10px]">
            <h1
              className={`${dm.className} text-[22px] font-medium text-black`}
            >
              Resultado por sinalização
            </h1>
            {dataPie && <Pie chartData={dataPie} />}
          </div>
          <div className="w-[80vw] lg:w-[49vw] h-[360px] flex flex-col justify-center items-center bg-[#D9D9D9] rounded-[10px]">
            <h1
              className={`${dm.className} text-[22px] font-medium text-black`}
            >
              Respostas por opção
            </h1>
            {dataBar && <Bar data={dataBar} />}
          </div>

          <div className="w-[80vw] h-[380px] flex flex-col justify-center items-center bg-[#D9D9D9] rounded-[10px]">
            <Box data={dataD} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = parseCookies({ req });
  const isAuthenticated = !!cookies["psi-token"];

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      cookies,
    },
  };
};
