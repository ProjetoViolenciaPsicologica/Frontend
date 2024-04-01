import Layout from "@/components/LayoutUser";
import { Raleway, Montserrat, Inter } from "next/font/google";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
const raleway = Raleway({
  style: "normal",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  style: "normal",
  subsets: ["latin"],
});

const inter = Inter({
  style: "normal",
  subsets: ["latin"],
});

export default function Index() {
  const router = useRouter();
  const [page, setPage] = useState<number>(1);

  function handlePage() {
    if (page < 3) {
      setPage(page + 1);
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  }

  function handleBackPage() {
    setPage(page - 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
  return (
    <Layout>
      <div className="flex w-full flex-col items-center pl-4 lg:items-start lg:pl-12">
        {/* Desktop */}

        <div className="mt-8 hidden lg:flex flex-col w-full">
          <h1 className={`${raleway.className} text-3xl font-bold `}>
            INSTRUÇÕES PARA APLICAÇÃO
          </h1>
        </div>
        <div className="mt-8 flex lg:hidden flex-col w-full">
          <h1 className={`${raleway.className} text-2xl font-normal `}>
            {page === 1
              ? "INTRODUÇÃO PARA A APLICAÇÃO"
              : "INSTRUÇÕES PARA APLICAÇÃO"}
          </h1>
        </div>
        <div className="mt-8 w-[870px] hidden lg:flex flex-col">
          <span
            className={`${montserrat.className} text-justify text-black text-lg font-semibold font-['Montserrat']`}
          >
            O protótipo é dividido em Categoria 1, Categoria 2 e Categoria 3.
            Estas dimensões são divididas em valores que juntas formam uma
            análise. E para isso, a análise sugere 3 casos específicos:
          </span>
          <ul
            className={`${montserrat.className} text-black text-lg font-semibold list-disc pl-10 mt-4`}
          >
            <li className="mb-4">
              {" "}
              Caso o avaliado pontue entre 15 (quinze) e 30 (trinta), o software
              apresenta o sinal verde, dispensando o avaliado de outros
              encaminhamentos.
            </li>
            <li className="mb-4">
              Caso o avaliado pontue entre 31 (trinta e um) e 38 (trinta e
              oito), é ligado o sinal amarelo para violência psicológica e
              consequente encaminhamento para atendimento multidisciplinar
              médico-psicológico-social.
            </li>
            <li>
              Caso o avaliado pontue entre 39 (trinta e nove) e 60 (sessenta), é
              ligado o sinal vermelho para violência psicológica e consequente
              encaminhamento urgente para atendimento multidisciplinar
              médico-psicológico-social.
            </li>
          </ul>
        </div>

        <div className="mt-8 w-[870px] hidden lg:flex flex-col">
          <span
            className={`${montserrat.className} text-justify text-black text-lg font-semibold font-['Montserrat']`}
          >
            Na suspeita de vítima de violência, é imporante dirigir-se a pessoa
            com a seguinte informação:
          </span>
        </div>

        <div className="mt-8 pl-6 w-[870px] hidden lg:flex flex-col">
          <ul
            className={`${montserrat.className} text-black text-lg font-semibold list-disc`}
          >
            <li>
              {`“Farei agora algumas perguntas sobre a conduta de pessoas próximas a você (sr., sra.). Por favor, responda com nunca; ou, às vezes; ou, frequentemente; ou, sempre, de acordo com o que lhe acontece no convívio com a pessoa de quem você (sr., sra.) se lembrar.”`}
            </li>
          </ul>
        </div>

        <Link
          href={"/formularioUser"}
          className="hidden lg:flex justify-center w-full mt-12"
        >
          <button
            className={`${inter.className} w-[202px] h-[59px] bg-emerald-950 rounded-[32px] text-white text-xl font-bold`}
          >
            AVANÇAR
          </button>
        </Link>

        {/* Mobile */}

        {page === 1 && (
          <div className="mt-8 pl-6  flex lg:hidden flex-col">
            <ul
              className={`${montserrat.className} text-black text-lg font-semibold list-disc`}
            >
              <li className="mb-8">
                O KM-QUEST é um questionário que possui 15 questões. Sua
                finalidade é reunir as informações de um entrevistado e realizar
                uma análise crítica. Por meio das seleção de cada resposta das
                questões, será levantado uma pontuação que irá interpretar uma
                classificação para o estado da saúde mental do entrevistado que
                esteve sob exposição de violência psicológica.
              </li>
              <li>
                Para o embasamento das questões do questionário, foram
                considerados tópicos que envolvem{" "}
                <span className="font-bold">
                  Medo, Dependência Emocional e Controle Absoluto.
                </span>
              </li>
            </ul>
          </div>
        )}
        {page === 2 && (
          <div className="mt-8 flex lg:hidden flex-col px-4">
            <span
              className={`${montserrat.className} text-justify text-black text-lg font-semibold font-['Montserrat']`}
            >
              O protótipo é dividido em Categoria 1, Categoria 2 e Categoria 3.
              Estas dimensões são divididas em valores que juntas formam uma
              análise. E para isso, a análise sugere 3 casos específicos:
            </span>
            <ul
              className={`${montserrat.className} text-black text-lg font-semibold list-disc pl-10 mt-4`}
            >
              <li className="mb-4">
                {" "}
                Caso o avaliado pontue entre 15 (quinze) e 30 (trinta), o
                software apresenta o sinal verde, dispensando o avaliado de
                outros encaminhamentos.
              </li>
              <li className="mb-4">
                Caso o avaliado pontue entre 31 (trinta e um) e 38 (trinta e
                oito), é ligado o sinal amarelo para violência psicológica e
                consequente encaminhamento para atendimento multidisciplinar
                médico-psicológico-social.
              </li>
              <li>
                Caso o avaliado pontue entre 39 (trinta e nove) e 60 (sessenta),
                é ligado o sinal vermelho para violência psicológica e
                consequente encaminhamento urgente para atendimento
                multidisciplinar médico-psicológico-social.
              </li>
            </ul>
          </div>
        )}
        {page === 3 && (
          <div className="mt-8 flex lg:hidden flex-col px-4">
            <span
              className={`${montserrat.className} text-justify text-black text-lg font-semibold font-['Montserrat']`}
            >
              Na suspeita de vítima de violência, é imporante dirigir-se a
              pessoa com a seguinte informação:
            </span>
            <ul
              className={`${montserrat.className} text-black text-lg font-semibold list-disc pl-10 mt-4`}
            >
              <li className="">
                {`“Farei agora algumas perguntas sobre a conduta de pessoas próximas a você (sr., sra.). Por favor, responda com nunca; ou, às vezes; ou, frequentemente; ou, sempre, de acordo com o que lhe acontece no convívio com a pessoa de quem você (sr., sra.) se lembrar.”`}
              </li>
            </ul>
          </div>
        )}
        {page < 3 ? (
          <div className="flex lg:hidden justify-center w-full mt-12 mb-4">
            <button
              className={`${inter.className} w-[295px] h-[59px] bg-emerald-950 rounded-[32px] text-white text-xl font-bold`}
              onClick={handlePage}
            >
              {page === 1 ? "INICIAR QUESTIONÁRIO" : "AVANÇAR"}
            </button>
          </div>
        ) : (
          <Link
            href={"/formularioUser"}
            className="flex lg:hidden justify-center w-full mt-12 mb-4"
          >
            <button
              className={`${inter.className} w-[295px] h-[59px] bg-emerald-950 rounded-[32px] text-white text-xl font-bold`}
              onClick={handlePage}
            >
              {page === 1 ? "INICIAR QUESTIONÁRIO" : "AVANÇAR"}
            </button>
          </Link>
        )}
        {page > 1 && (
          <div className="flex lg:hidden justify-center w-full mb-4">
            <button
              className={`${inter.className} w-[295px] h-[59px] bg-yellow-400 rounded-[32px] text-white text-xl font-bold`}
              onClick={handleBackPage}
            >
              VOLTAR
            </button>
          </div>
        )}
      </div>
    </Layout>
  );
}
