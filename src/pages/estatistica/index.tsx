import React, { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Layout from "@/components/Layout";
import { Raleway, DM_Sans } from "next/font/google";
import dynamic from "next/dynamic";
import { api } from "@/services/";
import { Button, Tooltip } from "antd";
import { FaDownload } from "react-icons/fa";

import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

const Pie = dynamic(() => import("@/components/Charts/Pie"), { ssr: false });
const Bar = dynamic(() => import("@/components/Charts/BarHorizontal"), {
  ssr: false,
});
const Box = dynamic(() => import("@/components/Charts/Box"), { ssr: false });
const Dispersal = dynamic(() => import("@/components/Charts/Dispersal"), {
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

const IndexPage: React.FC<any> = ({
  dataPie,
  dataBar,
  data,
  dataDispersal,
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;

    const canvas = await html2canvas(contentRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF();
    const imgWidth = 210;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
    pdf.save("download.pdf");
  };

  return (
    <Layout>
      <div
        ref={contentRef}
        className="flex h-full w-full flex-col items-center pl-4 lg:items-start lg:pl-12"
      >
        <div className="flex w-[92%] gap-y-4 md:items-center  flex-col md:flex-row">
          <div className="mt-4 flex h-full flex-col w-full  md:mt-4">
            <h1 className={`${raleway.className} text-3xl font-normal `}>
              ESTATÍSTICA
            </h1>
            <span
              className={`${raleway.className} w-[309px] mt-4 text-black text-sm font-normal leading-tight`}
            >
              Disponibilização e visualização dos dados reunidos com base no
              registro de formulários
            </span>
          </div>
          <Button
            type="default"
            icon={<FaDownload />}
            onClick={handleDownloadPDF}
            className={`mt-4 w-[200px] flex items-center justify-center`}
          >
            Baixar PDF
          </Button>
        </div>

        <div className="mt-10 gap-y-5 md:gap-x-5 w-full flex flex-col flex-wrap md:flex-row items-center">
          <div className="w-[80vw] lg:w-[30vw] h-[360px] flex flex-col justify-center items-center bg-[#D9D9D9] rounded-[10px]">
            <h1
              className={`${dm.className} text-[22px] font-medium text-black`}
            >
              Resultado por sinalização
            </h1>
            <Pie chartData={dataPie} />
          </div>
          <div className="w-[80vw] lg:w-[49vw] h-[360px] flex flex-col justify-center items-center bg-[#D9D9D9] rounded-[10px]">
            <h1
              className={`${dm.className} text-[22px] font-medium text-black`}
            >
              Respostas por opção
            </h1>
            <Bar data={dataBar} />
          </div>

          <div className="w-[80vw] h-[380px] flex flex-col justify-center items-center bg-[#D9D9D9] rounded-[10px]">
            <Box data={data} />
          </div>
          {/* <div className="w-[80vw] h-[380px] flex flex-col justify-center items-center bg-[#D9D9D9] mb-8">
            <Dispersal data={dataDispersal} />
          </div> */}
        </div>
      </div>
    </Layout>
  );
};

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
  const response4 = await api.get("desvio");
  const quantidade = response4.data;
  const verde = quantidade.filter((item: any) => item.sinalizacao === "Verde");
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
  const data = [d1, d2, d3];
  const response = await api.get("formulario/sinalizacao");
  const response1 = await api.get("formulario/quantidadeRespostas");
  //const response3 = await api.get("dispersao")
  const dataDispersal = quantidade;
  const dataPie = response.data;
  const dataBar = response1.data;
  return {
    props: {
      dataPie,
      dataBar,
      data,
      dataDispersal,
    },
  };
};

export default IndexPage;
