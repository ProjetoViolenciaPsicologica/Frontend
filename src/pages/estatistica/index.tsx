import React from "react";
import Layout from "@/components/Layout";
import { Raleway, DM_Sans } from "next/font/google";
import dynamic from "next/dynamic";
import {api} from "@/services/";
import { GetServerSideProps } from "next";
import { parseCookies } from 'nookies';
import { useRouter } from "next/router";
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

export default function Index({dataPie, dataBar}: any) {
    const router = useRouter()
  return (
    <Layout>
      <div className="flex h-full w-full flex-col items-center pl-4 lg:items-start lg:pl-12">
        <div className="mt-4 flex h-full flex-col w-full  md:mt-4">
        <button onClick={()=> {
              router.back()
          }} className="mr-6 hover:cursor-pointer my-6">
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
            Disponibilização e visualização dos dados reunidos com base no
            registro de formulários
          </span>
        </div>

        <div className="mt-10 md:mt-24 gap-y-5 md:gap-y-0 md:gap-x-5 w-full flex flex-col flex-wrap md:flex-row items-center">
          <div className="w-[80vw] md:w-80 h-[360px] flex flex-col justify-center items-center bg-[#D9D9D9]">
          <button onClick={()=> {
              router.back()
          }} className="mr-6 hover:cursor-pointer">
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