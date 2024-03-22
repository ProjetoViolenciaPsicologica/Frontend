import Layout from "@/components/LayoutUser"
import { Raleway, Montserrat } from "next/font/google";
const raleway = Raleway({
    weight: "700",
    style: "normal",
    subsets: ["latin"],
});

const montserrat = Montserrat({
    weight: "600",
    style: "normal",
    subsets: ["latin"],
});

export default function Index() {
    return (
        <Layout>
            <div className="flex h-full w-full flex-col items-center pl-4 lg:items-start lg:pl-12">
                <div className="mt-4 flex h-full flex-col w-full  md:mt-16">
                    <h1 className={`${raleway.className} text-3xl font-bold `}>
                        INSTRUÇÕES PARA APLICAÇÃO
                    </h1>
                </div>
                <div className="mt-8 pl-6">
                    <ul className={`${montserrat.className} text-black text-lg font-semibold list-disc`}>
                        <li> O protótipo é dividido em análise de Medo, Dependência Emocional e Controle Absoluto.</li>
                        <li>Estas dimensões são divididas em valores para formar uma análise.</li>
                        <li>Na suspeita de vítima de violência, dirija-se a pessoa com a seguinte informação:</li>
                    </ul>
                </div>

                <div className="mt-8 w-[90%]">
                    <span className={`${montserrat.className} text-justify text-black text-lg font-semibold font-['Montserrat']`}> “Farei agora algumas perguntas sobre a conduta de pessoas próximas a você (sr., sra.). Por favor, responda com nunca; ou, às vezes; ou, frequentemente; ou, sempre, de acordo com o que lhe acontece no convívio com a pessoa de quem você (sr., sra.) se lembrar.”</span>
                </div>

                <div className="mt-8 pl-6">
                    <ul className={`${montserrat.className} text-black text-lg font-semibold list-disc`}>
                        <li>O instrumento foi elaborado com 15 questões que remetem à ocorrência da violência psicológica e permitem a pontuação 1 para "Nunca", 2 para "Às vezes", 3 para "Frequentemente" e 4 para "Sempre". </li>
                        <li>Caso o avaliado pontue entre 15 (quinze) e 30 (trinta), o software apresenta o sinal verde, dispensando o avaliado de outros encaminhamentos. </li>
                        <li>Caso o avaliado pontue entre 31 (trinta e um) e 38 (trinta e oito), é ligado o sinal amarelo para violência psicológica e consequente encaminhamento para atendimento multidisciplinar médico-psicológico-social.</li>
                        <li>
                            Caso o avaliado pontue entre 39 (trinta e nove) e 60 (sessenta), é ligado o sinal vermelho para violência psicológica e consequente encaminhamento urgente para atendimento multidisciplinar médico-psicológico-social.</li>


                    </ul>
                </div>
            </div>
        </Layout>
    )
}