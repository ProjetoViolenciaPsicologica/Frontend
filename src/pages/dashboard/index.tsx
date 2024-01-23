import React from 'react'
import Layout from "@/components/Layout"
import { Raleway} from "next/font/google";
import CardDashboard from "@/components/CardDashboard"
const raleway = Raleway({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});


function index() {
  return (
    <Layout>
        <div className="flex h-full w-full flex-col items-center pl-4 lg:items-start lg:pl-12">
        <div className="mt-4 flex h-full flex-col w-full  md:mt-10">
            <h1 className={`${raleway.className} text-3xl font-normal `}>DASHBOARD</h1>
            <span className={`${raleway.className} w-[256px] mt-4 text-black text-sm font-normal leading-tight`}>Gestão e visualização de informações sobre violência psicológica</span>
       </div>
       <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-6 md:gap-y-0 md:gap-x-14 mt-7'>
        <CardDashboard title='USUÁRIOS' svg="user" />
        <CardDashboard title='FORMULÁRIOS' qtForm={420} />
        <CardDashboard title='EXPORTAR' svg="export" />
        <CardDashboard title='ESTATISTICAS' svg="statistic" />
        
        </div>
       </div>
    </Layout>
  )
}

export default index