import React, { useRef, useState } from "react";
import Layout from "@/components/Layout";
import { Raleway, DM_Sans } from "next/font/google";
import dynamic from "next/dynamic";
import { api } from "@/services/";
import { Button, Dropdown, Menu, Spin } from "antd";
import { FaDownload } from "react-icons/fa";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

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

const IndexPage: React.FC<any> = ({ dataPie, dataBar }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [loadingP, setLoadingP] = useState(false);
  const [loadingB, setLoadingB] = useState(false);
  const [loadingD, setLoadingD] = useState(false);
  const [loadingDisp, setLoadingDisp] = useState(false);
  const cookies = parseCookies();
  const token = cookies["psi-token"];

  const handleDownloadPNG = async (chartId: string) => {
    try {
      if (chartId === "Pizza") setLoadingP(true);
      else if (chartId === "Barra") setLoadingB(true);
      else if (chartId === "Desvio") setLoadingD(true);
      else if (chartId === "Dispersao") setLoadingDisp(true);

      const response = await api.get("graficosPDF", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const chartData = response.data[chartId];
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      const img = new Image();
      img.src = `data:image/jpeg;base64,${chartData}`;
      img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
        ctx?.drawImage(img, 0, 0);

        canvas.toBlob((blob) => {
          const link = document.createElement("a");
          link.href = URL.createObjectURL(blob!);
          link.download = `${chartId}.png`;
          link.click();
          if (chartId === "Pizza") setLoadingP(false);
          else if (chartId === "Barra") setLoadingB(false);
          else if (chartId === "Desvio") setLoadingD(false);
          else if (chartId === "Dispersao") setLoadingDisp(false);
        }, "image/png");
      };
    } catch (error) {
      console.error("Erro ao fazer download do PNG:", error);
      if (chartId === "Pizza") setLoadingP(false);
      else if (chartId === "Barra") setLoadingB(false);
      else if (chartId === "Desvio") setLoadingD(false);
      else if (chartId === "Dispersao") setLoadingDisp(false);
    }
  };

  const menu = (
    <Menu>
      <Menu.Item key="1">
        <Button
          type="text"
          onClick={() => handleDownloadPNG("Desvio")}
          className="w-full flex"
          disabled={loadingD}
        >
          {loadingD ? <Spin /> : "Desvio"}
        </Button>
      </Menu.Item>
      <Menu.Item key="2">
        <Button
          type="text"
          className="w-full flex"
          onClick={() => handleDownloadPNG("Dispersao")}
          disabled={loadingDisp}
        >
          {loadingDisp ? <Spin /> : "Dispersão"}
        </Button>
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout>
      <div
        ref={contentRef}
        className="flex h-full flex-col items-center pl-4 lg:items-start"
      >
        <div className="flex w-[92%] gap-y-4 md:items-center flex-col md:flex-row">
          <div className="mt-4 flex h-full flex-col w-full md:mt-4">
            <h1 className={`${raleway.className} text-3xl font-normal `}>
              ESTATÍSTICA
            </h1>
            <span
              className={`${raleway.className} w-[309px] mt-4 text-black text-sm font-normal leading-tight`}
            >
              Disponibilização e visualização dos dados reunidos com base no
              registro de questionários
            </span>
          </div>

          <Dropdown overlay={menu} trigger={["click"]}>
            <Button
              type="default"
              icon={<FaDownload />}
              className="w-[200px] flex items-center justify-center mt-2"
            >
              {loadingD || loadingDisp ? <Spin /> : "Baixar Gráficos"}
            </Button>
          </Dropdown>
        </div>

        <div className="mt-10 gap-y-5 lg:gap-x-3 w-full flex flex-col flex-wrap md:flex-row items-center">
          <div className="w-[90vw] lg:w-[80vw] h-[400px] flex flex-col justify-center items-center bg-[#D9D9D9] rounded-[10px]">
            <div className="flex items-center justify-center w-full">
              <h1
                className={`${dm.className} text-center text-[22px] font-medium text-black`}
              >
                Resultado por sinalização
              </h1>
              {dataPie && (
                <div className="flex ml-4">
                  <Button
                    id="download-button"
                    type="default"
                    icon={<FaDownload />}
                    onClick={() => handleDownloadPNG("Pizza")}
                    className="w-[200px] flex items-center justify-center"
                    disabled={loadingP}
                  >
                    {loadingP && <Spin />}
                  </Button>
                </div>
              )}
            </div>
            {dataPie ? (
              <Pie chartData={dataPie} />
            ) : (
              <Spin size="large" className="text-white" />
            )}
          </div>
          <div className="w-[90vw] md:w-[80vw] h-[360px] flex flex-col justify-center items-center bg-[#D9D9D9] rounded-[10px]">
            <div className="flex items-center justify-center w-full">
              <h1
                className={`${dm.className} text-[22px] font-medium text-black`}
              >
                Respostas por opção
              </h1>
              {dataPie && (
                <div className="flex ml-4">
                  <Button
                    id="download-button"
                    type="default"
                    icon={<FaDownload />}
                    onClick={() => handleDownloadPNG("Barra")}
                    className="w-[200px] flex items-center justify-center"
                    disabled={loadingB}
                  >
                    {loadingB && <Spin />}
                  </Button>
                </div>
              )}
            </div>
            <Bar data={dataBar} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = parseCookies({ req });
  const token = cookies["psi-token"];
  const isAuthenticated = !!cookies["psi-token"];
  if (!isAuthenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  const response4 = await api.get("desvio", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

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

  const response5 = await api.get("dispersao", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data1 = response5.data;
  const d1 = calcularSomatorioCampoQuestoes(verde);
  const d2 = calcularSomatorioCampoQuestoes(amarelo);
  const d3 = calcularSomatorioCampoQuestoes(vermelho);
  const data = [d1, d2, d3];
  const response = await api.get("formulario/sinalizacao", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const response1 = await api.get("formulario/quantidadeRespostas", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const arrayTransformado = data1.map((objeto: any) => {
    const pontuacoes = objeto.campo_questoes.split(",").map(Number);
    const pontuacaoTotal = pontuacoes.reduce(
      (total: any, pontuacao: any) => total + pontuacao,
      0
    );
    return { idade: objeto.idade, pontuacao: pontuacaoTotal };
  });

  const dataDispersal = arrayTransformado;
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
