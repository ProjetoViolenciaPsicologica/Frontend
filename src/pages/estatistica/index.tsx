import React from "react";
import Layout from "@/components/Layout";
import { Raleway, DM_Sans } from "next/font/google";
import dynamic from "next/dynamic";
import {api} from "@/services/";
import { GetServerSideProps } from "next";
import { parseCookies } from 'nookies';

const Pie = dynamic(() => import("@/components/Charts/Pie"), { ssr: false });

const Bar = dynamic(() => import("@/components/Charts/BarHorizontal"), { ssr: false });

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

export default function index({dataPie, dataBar}: any) {
    
  return (
    <Layout>
      <div className="flex h-full w-full flex-col items-center pl-4 lg:items-start lg:pl-12">
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

        <div className="mt-10 md:mt-24 gap-y-5 md:gap-y-0 md:gap-x-5 w-full flex flex-col flex-wrap md:flex-row items-center">
          <div className="w-[80vw] md:w-80 h-[360px] flex flex-col justify-center items-center bg-[#D9D9D9]">
            <h1
              className={`${dm.className} text-[22px] font-medium text-black`}
            >
              Resultado por sinalização
            </h1>
            <Pie chartData={dataPie}/>
          </div>
          <div className="w-[80vw] md:w-[701px] h-[360px] flex flex-col justify-center items-center bg-[#D9D9D9]">
            <h1
              className={`${dm.className} text-[22px] font-medium text-black`}
            >
              Respostas por opção
            </h1>
            <Bar data={dataBar} />
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
    const cookies = parseCookies({ req });
    const isAuthenticated = !!cookies['psi-token'];
    if (!isAuthenticated){
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
   }
  
   const response = await api.get("formulario/sinalizacao")
   const response1 = await api.get("formulario/quantidadeRespostas")
   const dataPie = response.data
    const dataBar = response1.data
   return {
    props: {
        dataPie,
        dataBar
    }
   }
  }