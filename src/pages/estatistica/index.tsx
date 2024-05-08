import React, { useRef, useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import Layout from "@/components/Layout";
import { Raleway, DM_Sans } from "next/font/google";
import dynamic from "next/dynamic";
import { api } from "@/services/";
import { Button, Spin } from "antd";
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
  const [loading, setLoading] = useState(false); // Estado para controlar o carregamento
  const cookies = parseCookies();
  const token = cookies["psi-token"];
  const handleDownloadPDF = async () => {
    if (!contentRef.current) return;

    setLoading(true); // Define o estado de carregamento como verdadeiro

    try {
      // Faça a solicitação para o endpoint
      const response = await api.get("graficosPDF", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      // Obtenha os dados da resposta
      const {  Desvio, Dispersao } = response.data;

      // Crie um novo objeto jsPDF
      const pdf = new jsPDF();

      // Adicione as imagens ao PDF
      pdf.addImage(Desvio, "JPEG", 10, 120, 100, 100);
      setTimeout(() => {}, 1000);
      pdf.addImage(Dispersao, "JPEG", 10, 10, 100, 100);
      
      // Salve o PDF
      pdf.save("download.pdf");
    } catch (error) {
      console.error("Erro ao fazer download do PDF:", error);
    }

    setLoading(false); // Define o estado de carregamento como falso após a conclusão
  };

  return (
    <Layout>
      <div
        ref={contentRef}
        className="flex h-full flex-col items-center pl-4 lg:items-start"
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
          id="download-button"
          type="default"
          icon={<FaDownload />}
          onClick={handleDownloadPDF}
          className={`mt-4 w-[200px] flex items-center justify-center`}
          disabled={loading} // Desabilita o botão enquanto o PDF está sendo gerado
        >
          {loading ? <Spin /> : "Baixar PDF"}
        </Button>
        </div>

        <div className="mt-10 gap-y-5 lg:gap-x-3 w-full flex flex-col flex-wrap md:flex-row items-center">
          <div className="w-[80vw] lg:w-[20vw] h-[360px] flex flex-col justify-center items-center bg-[#D9D9D9] rounded-[10px]">
            <h1
              className={`${dm.className} text-[22px] font-medium text-black`}
            >
              Resultado por sinalização
            </h1>
            {dataPie ? (
              <Pie chartData={dataPie} />
            ) : (
              <Spin size="large" className="text-white" />
            )}
          </div>
          <div className=" w-[80vw] lg:w-[59.8vw] h-[360px] flex flex-col justify-center items-center bg-[#D9D9D9] rounded-[10px]">
            <h1
              className={`${dm.className} text-[22px] font-medium text-black`}
            >
              Respostas por opção
            </h1>
            <Bar data={dataBar} />
          </div>

          <div className="w-[80vw] h-[380px] flex flex-col justify-center items-center bg-[#D9D9D9] rounded-[10px]">
            {data && <Box data={data} />}
          </div>
          <div className="w-[80vw] px-4 h-[380px] flex flex-col justify-center items-center bg-[#D9D9D9] mb-8">
            <Dispersal data={dataDispersal} />
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
  //const response3 = await api.get("dispersao")
  const arrayTransformado = data1.map((objeto: any) => {
    // Dividindo a string 'campo_questoes' em um array de números
    const pontuacoes = objeto.campo_questoes.split(",").map(Number);
    // Calculando a pontuação total
    const pontuacaoTotal = pontuacoes.reduce(
      (total: any, pontuacao: any) => total + pontuacao,
      0
    );
    // Retornando um novo objeto com as chaves 'idade' e 'pontuacao'
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
