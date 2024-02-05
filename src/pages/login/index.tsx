import Image from "next/image";
import Link from "next/link";
import { useState } from 'react';
import { Roboto, Montserrat, Karla } from "next/font/google";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

const roboto = Roboto({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  weight: "700",
  style: "normal",
  subsets: ["latin"],
});

const karla = Karla({
    weight: "700",
    style: "normal",
    subsets: ["latin"],
  });

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="flex w-screen h-screen justify-between bg-[#f6fbf9]">
      <div className="h-full hidden md:flex md:w-[50vw]">
        <Image
          src="/garota.png"
          alt="logo"
          width={1000}
          height={200}
          className="h-full "
        />
      </div>
      <div className="h-full w-full md:w-[50vw] flex flex-col items-center justify-between">
        <Link href="/"><Image src="/icon.svg" alt="logo" width={150} height={150} /></Link>
        <h1
          className={`text-4xl font-bold ${montserrat.className} text-[#2D3A3A]`}
        >
          Nome do sistema
        </h1>

        <div className="flex items-center h-full justify-center flex-col w-full">
        <form className="w-full flex flex-col items-center gap-y-8">
            
            <div className="flex flex-col w-[82vw] md:w-[447px]">
            <label htmlFor="username" className={`${karla.className} font-bold text-2xl`}>Usuário</label>
            <input type="text" name="username" placeholder="Digite seu nome de usuário" className={`py-4 bg-white pl-4 text-[#969696] ${roboto.className} text-lg placeholder:text-[#969696]  placeholder:${roboto.className} placeholder:text-lg rounded-xl shadow border border-black border-opacity-10`}/>
            </div>
            <div className="flex flex-col w-[82vw] md:w-[447px]">
    <label htmlFor="password" className={`${karla.className} font-bold text-2xl`}>Senha</label>
    <div className="relative">
      <input 
        type={showPassword ? "text" : "password"} 
        name="password" 
        placeholder="Digite sua senha" 
        className={`py-4 w-full bg-white pl-4 placeholder:text-[#969696] placeholder:${roboto.className} placeholder:text-lg rounded-xl shadow border border-black border-opacity-10`}
      />
      <button 
        type="button" 
        onClick={() => setShowPassword(!showPassword)} 
        className="absolute right-3 top-1/2 transform -translate-y-1/2"
      >
        {showPassword ?  <FaRegEyeSlash /> : <FaRegEye /> }
      </button>
    </div>
  </div>

            <button type="submit" className="px-8 py-3 rounded-[32px] bg-[#093520] text-white" >ENTRAR</button>
            <span className={`text-center text-[#32403B] text-sm font-normal ${karla.className} leading-[18.20px] cursor-pointer`} >Esqueceu sua senha?</span>
        </form>
        </div>
      </div>
    </main>
  );
}
