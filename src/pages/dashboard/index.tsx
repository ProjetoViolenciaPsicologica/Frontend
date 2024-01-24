import React from 'react'
import Layout from "@/components/Layout"
import { Raleway} from "next/font/google";
import CardDashboard from "@/components/CardDashboard"
import { GetServerSideProps } from "next";
import dynamic from 'next/dynamic';

const ColumnChart = dynamic(() => import('@/components/ColumnChart'), { ssr: false });

const raleway = Raleway({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});
export type quantidadeType = {
  total_formularios: number;
}

export interface dadosGraficoType {
  Jan: number
  Fev: number
  Mar: number
  Abr: number
  Mai: number
  Jun: number
  Jul: number
  Ago: number
  Set: number
  Out: number
  Nov: number
  Dez: number
}

export default function Index({quantidade, dadosGrafico}: { quantidade: quantidadeType, dadosGrafico: dadosGraficoType }) {
  return (
    <Layout>
        <div className="flex h-full w-full flex-col items-center pl-4 lg:items-start lg:pl-12">
        <div className="mt-4 flex h-full flex-col w-full  md:mt-4">
            <h1 className={`${raleway.className} text-3xl font-normal `}>DASHBOARD</h1>
            <span className={`${raleway.className} w-[256px] mt-4 text-black text-sm font-normal leading-tight`}>Gestão e visualização de informações sobre violência psicológica</span>
       </div>
       <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-y-14 gap-x-14 mt-4 mx-auto'>
        <CardDashboard title='USUÁRIOS' svg="user" />
        <CardDashboard title='FORMULÁRIOS' qtForm={quantidade.total_formularios} />
        <CardDashboard title='EXPORTAR' svg="export" />
        <CardDashboard title='ESTATISTICAS' svg="statistic" />
        
        </div>
        <div className='w-screen md:w-[90%] h-96 md:h-[80vh] mt-4'>
        {typeof window !== 'undefined' && <ColumnChart data={dadosGrafico} />}
        </div>
       </div>
    </Layout>
  )
}



export const getServerSideProps: GetServerSideProps = async () => {
  
  const response = await fetch(`http://projpsi.pythonanywhere.com/api/psicoapp/formulario/quantidade`);
  const response1 = await fetch(`http://projpsi.pythonanywhere.com/api/psicoapp/formulario/porMes`);
  const quantidade = await response.json();
  const dadosGrafico = await response1.json();
  return {
    props: {
     quantidade,
     dadosGrafico,
    },
  };
};