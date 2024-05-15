import Layout from "@/components/LayoutUser";
import { Raleway, Montserrat, Inter } from "next/font/google";

import Link from "next/link";

const inter = Inter({
  style: "normal",
  subsets: ["latin"],
});

const raleway = Raleway({
  style: "normal",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  style: "normal",
  subsets: ["latin"],
});

export default function Index() {
  return (
    <Layout>
      <div className="flex flex-col w-full items-center pl-4 lg:items-start lg:pl-12 flex-wrap">
        {/* Desktop */}

        <div className="mt-8 flex flex-col ">
          <h1 className={`${raleway.className} text-2xl font-normal `}>
            INSTRUÇÕES PARA APLICAÇÃO
          </h1>
        </div>

        <div className="mt-7">
          <span
            className={`${montserrat.className} text-black text-xl font-normal`}
          >
            Esta é uma orientação para a aplicação do Questionário.{" "}
            <span className="font-bold">
              É importante enfatizar que as orientações aqui contidas não devem
              ser ditas ao respondente para não induzir as respostas.
            </span>
          </span>
        </div>

        <div className="mt-10">
          <h2
            className={`${montserrat.className} text-black text-xl font-normal mb-2`}
          >
            Aplique este questionário se existir qualquer uma dessas condições
            prévias:
          </h2>
          <div
            className={`flex flex-col font-bold ${montserrat.className} gap-y-4`}
          >
            <span>
              1. Atendimento pelos órgãos de segurança pública por suspeita de
              violência por conviventes próximos.
            </span>
            <span>
              2. Mudança de comportamento na escola, perceptível por um ou mais
              profissionais, que indiquem medo, ansiedade, tristeza persistente
              ou conflitos visíveis.{" "}
            </span>
            <span>
              3.{" "}
              {`No atendimento em saúde, queixas persistentes, por quatro meses ou mais, com teor ansioso (ansiedade, medo, pânico, palpitações, sensação de viver "pisando em ovos"); ou com manifestações depressivas (tristeza, melancolia, vazio existencial, desânimo, embotamento emocional, pensamentos ou tentativas suicidas).`}
            </span>
          </div>
        </div>

        <div className="mt-6">
          <h1
            className={`text-black text-xl font-normal ${montserrat.className} mb-8`}
          >
            Este instrumento é dividido em Categoria 1, Categoria 2 e Categoria
            3. Estas dimensões são divididas em valores que juntas formam uma
            análise. E para isso, a análise sugere 3 casos específicos:
          </h1>

          <ul className={`list-disc	text-black text-xl font-normal px-8`}>
            <li>
              Caso o avaliado pontue entre 15 (quinze) e 30 (trinta), o software
              apresenta o sinal verde, dispensando o avaliado de outros
              encaminhamentos.{" "}
            </li>
            <li>
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

        <div className="mt-8 w-full mb-6">
          <h1
            className={`text-justify text-black text-xl font-bold ${montserrat.className} pr-4 md:pr-0`}
          >
            Na suspeita de vítima de violência, é imporante dirigir-se a pessoa
            com a seguinte informação:{" "}
          </h1>
          <ul
            className={`w-full px-8 mt-11 list-disc text-justify text-black text-xl font-bold ${montserrat.className}`}
          >
            <li>{`“Farei agora algumas perguntas sobre a conduta de pessoas próximas a você (sr., sra.). Por favor, responda com nunca; ou, às vezes; ou, frequentemente; ou, sempre, de acordo com o que lhe acontece no convívio com a pessoa de quem você (sr., sra.) se lembrar.”`}</li>
          </ul>
        </div>

        <div className="flex justify-center w-full mb-8 mt-10 md:mt-20">
          <Link href="/formularioUser">
            <span
              className={`text-white text-xl font-bold ${inter.className} px-8 py-4 bg-emerald-950 rounded-[32px]`}
            >Iniciar QUESTIONÁRIO</span>
          </Link>
        </div>
      </div>
    </Layout>
  );
}
