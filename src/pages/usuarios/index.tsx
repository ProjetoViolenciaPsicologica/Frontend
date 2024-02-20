import Layout from "@/components/Layout"
import { Raleway} from "next/font/google";
import { FaSearch } from "react-icons/fa";
import { TbPencil } from "react-icons/tb";
import { SlTrash } from "react-icons/sl";

const raleway = Raleway({
    weight: "400",
    style: "normal",
    subsets: ["latin"],
  });

  export interface DataUserType {
   nome:string,
   sobrenome:string,
   email:string,
   tipo:string
  }
  
export default function Index() {

    const fakeData:DataUserType[] = [{
        nome:"João",
        sobrenome:"Oliveira",
        email:"joao@gmail.com",
        tipo:"Agente de Saúde"
    },
    {
    nome:"João1",
    sobrenome:"Oliveiras",
    email:"joao1@gmail.com",
    tipo:"Professor"
}
]
    return (
      <Layout>
           <div className="mt-4 flex flex-col w-full  md:mt-4">
              <h1 className={`${raleway.className} text-3xl font-normal `}>USUÁRIOS</h1>
              <span className={`${raleway.className} w-[256px] mt-4 text-black text-sm font-normal leading-tight`}>Gerenciamento de usuários cadastrados no sistema</span>
         </div>

         <div className="flex w-full justify-between pr-5 mt-9">
         <div className="relative">
  <button
    type="button"
    className="absolute left-3 top-1/2 transform -translate-y-1/2"
  >
    <FaSearch />
  </button>
  <input
    type="text"
    placeholder="Pesquisa..."
    className="w-[212px] h-[37px] bg-white rounded-lg border border-neutral-200 pl-10"
  />
</div>
            <button className="w-[197px] h-10 bg-emerald-950 shadow text-white text-base font-normal font-['DM Sans'] ">ADICIONAR USUÁRIO</button> 
            
         </div>
         <div className="flex flex-col w-full mt-2">
            <div className="h-[49px] bg-zinc-300 flex items-center pl-7">
                <div className="flex items-center w-[20%]">
                <input type="checkbox" className="w-6 h-6 mr-10"/>
                <button className="w-[98px] h-[28.62px] bg-emerald-950 rounded-[32px] text-white text-base font-normal font-['DM Sans']">DELETAR</button>
                </div>
                <div className="flex items-center w-[20%]">
                <span className="text-black text-base font-normal font-['Inter']">NOME</span>
                </div>
                <div className="flex items-center w-[20%]">
                <span className="text-black text-base font-normal font-['Inter']">SOBRENOME</span>
                </div>
                <div className="flex items-center w-[20%]">
                <span className="text-black text-base font-normal font-['Inter']">EMAIL</span>
                </div>
                <div className="flex items-center w-[20%]">
                <span className="text-black text-base font-normal font-['Inter']">TIPO</span>
                </div>
                <div className="flex items-center w-[20%]">
                <span className="text-black text-base font-normal font-['Inter']"></span>
                </div>
                
            </div>
            {fakeData.map((user, i) => (
          <div className={`h-[49px] bg-zinc-300 flex items-center pl-7 ${i%2==0 && "bg-opacity-20"}`}>
            <div className="flex items-center w-[20%]">
              <input type="checkbox" className="w-6 h-6 mr-10" />
            </div>
            <div className="flex items-center w-[20%]">
              <span className="text-black text-base font-normal font-['Inter']">
                {user.nome}
              </span>
            </div>
            <div className="flex items-center w-[20%]">
              <span className="text-black text-base font-normal font-['Inter']">
                {user.sobrenome}
              </span>
            </div>
            <div className="flex items-center w-[20%]">
              <span className="text-black text-base font-normal font-['Inter']">
                {user.email}
              </span>
            </div>
            <div className="flex items-center w-[20%]">
              <span className="text-black text-base font-normal font-['Inter']">
                {user.tipo}
              </span>
            </div>
            <div className="flex items-center pl-auto w-[20%] gap-x-4">
            <TbPencil className="w-5 h-[22px] text-[#616161] hover:cursor-pointer" />
            <SlTrash className="w-5 h-[22px] text-[#616161] hover:cursor-pointer" />


            </div>
          </div>
        ))}
           
         </div>
    
         
         </Layout>
    )
}