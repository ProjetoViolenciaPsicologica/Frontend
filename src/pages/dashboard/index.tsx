import React from 'react'
import Layout from "@/components/Layout"
import { Raleway} from "next/font/google";
import CardDashboard from "@/components/CardDashboard"
import { GetServerSideProps } from "next";
import dynamic from 'next/dynamic';
import { useQuery } from 'react-query';
import { api } from '@/services'

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

export default function Index() {
  const { data:quantidade, isLoading:isLoadingQT } = useQuery('quantidade', async () => {
    const response = await api.get('formulario/quantidade');
    return response.data;
  })
  const { data:dadosGrafico, isLoading:isLoadingDG } = useQuery('dadosGrafico', async () => {
    const response = await api.get('formulario/porMes');
    return response.data;
  })
  
  return (
    <Layout>
        <div className="flex h-full w-full flex-col items-center pl-4 lg:items-start lg:pl-12">
        <div className="mt-4 flex h-full flex-col w-full  md:mt-4">
            <h1 className={`${raleway.className} text-3xl font-normal `}>DASHBOARD</h1>
            <span className={`${raleway.className} w-[256px] mt-4 text-black text-sm font-normal leading-tight`}>Gestão e visualização de informações sobre violência psicológica</span>
       </div>
       <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 gap-y-14 gap-x-14 mt-4 mx-auto'>
        <CardDashboard title='USUÁRIOS' svg="user" />
        
        <CardDashboard title='FORMULÁRIOS' qtForm={quantidade?.total_formularios} isQT={isLoadingQT} />
        <CardDashboard title='EXPORTAR' svg="export" />
        <CardDashboard title='ESTATISTICAS' svg="statistic" />
        
        </div>
        <div className='w-screen md:w-[90%] h-96 md:h-[80vh] mt-4'>
        {typeof window !== 'undefined' && !isLoadingDG ? (<ColumnChart data={dadosGrafico} />) : (
          
<div role="status" className='flex justify-center items-center mt-8'>
    <svg aria-hidden="true" className="w-20 h-20 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg>
    <span className="sr-only">Loading...</span>
</div>

        ) }
        </div>
       </div>
    </Layout>
  )
}


