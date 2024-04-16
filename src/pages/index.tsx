import Image from "next/image";
import Link from "next/link";
import { Aclonica, Montserrat } from "next/font/google";

const aclonica = Aclonica({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  style: "normal",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <main className="flex w-screen h-screen justify-between bg-[#f6fbf9]">
      <div className="h-full hidden lg:flex lg:w-[50vw]">
        <Image
          src="/garota.png"
          alt="logo"
          width={1000}
          height={200}
          className="h-full "
        />
      </div>
      <div className="h-full w-full lg:w-[50vw] flex flex-col items-center justify-between">
        <Image src="/icon.svg" alt="logo" width={150} height={150} />
        <h1
          className={`text-4xl font-medium ${montserrat.className} text-[#2D3A3A]`}
        >
          KM-QUEST
        </h1>
        <div className="flex items-center h-full justify-center flex-col w-full">
          <p
            className={`text-4xl text-justify px-12 mb-8  text-[#2D3A3A] ${aclonica.className}`}
          >
            O formulário de rastreamento de violência psicológica (KM-QUEST)
          </p>

          <Link href="/login">
            <span className="px-8 py-3 rounded-[32px] bg-[#093520] text-white">
              ENTRAR
            </span>
          </Link>
        </div>
      </div>
    </main>
  );
}
