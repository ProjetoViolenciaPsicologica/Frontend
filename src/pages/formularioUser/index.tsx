import React, { useState, useEffect } from "react";
import Layout from "@/components/LayoutUser";
import { Raleway, Karla } from "next/font/google";
import Question from "@/components/Question";
import { questions } from "@/utils/form";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import Modal from "@/components/ModalForm";
import { useRouter } from "next/router";
import { Steps, Form, InputNumber, Select } from "antd";

const raleway = Raleway({
  weight: "700",
  style: "normal",
  subsets: ["latin"],
});

export interface dataForm {
  idade: number;
  escolha_sexo: string;
  grau_de_instrucao: string;
  definicaoLocalForm: string;
}

const karla = Karla({
  style: "normal",
  subsets: ["latin"],
});

export default function Index() {
  const [form] = Form.useForm(); // Extrai a referência do form
  const router = useRouter();
  const [okQuestion, setOkQuestion] = useState(false);
  const [page, setPage] = useState(0);
  const [allOptions, setAllOptions] = useState("");
  const [formData, setFormData] = useState<dataForm>();
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [sumQuestion, setSumQuestion] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedOptions, setSelectedOptions] = useState<any>({});
  const [data, setData] = useState({});
  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 768);
    };

    handleResize(); // Define o tamanho inicial da tela
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []); // Executa este efeito apenas uma vez no momento da montage

  const onSubmit = async (data: any) => {
    setFormData(data);
    setPage(page + 1);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    if (okQuestion) {
      console.log(allOptions);
      const questions = allOptions.split(",");
      const sum = questions.map(Number).reduce((acc, curr) => acc + curr, 0);
      console.log(questions);
      setSumQuestion(sum);

      const data1: any = {
        campo_questoes: allOptions,
        idade: formData?.idade,
        escolha_sexo: formData?.escolha_sexo,
        grau_de_instrucao: formData?.grau_de_instrucao,
        localAplicacao: {
          definicaoLocalForm: formData?.definicaoLocalForm,
        },
      };
      setIsModalOpen(true);
      setData(data1);
    }
  }, [
    allOptions,
    formData?.definicaoLocalForm,
    formData?.escolha_sexo,
    formData?.grau_de_instrucao,
    formData?.idade,
    okQuestion,
  ]);

  return (
    <Layout>
      <div className="flex flex-col items-center pl-4 lg:items-start lg:pl-12">
      <button onClick={()=> {
              router.back()
          }} className="hover:cursor-pointer flex w-full mt-4">
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
        <div className="mt-4 flex flex-col md:mt-10 pl-4 lg:pl-0">
          {isSmallScreen ? (
            <div className="absolute left-0 rigt-0">
              <svg
                width="395"
                height="16"
                viewBox="0 0 375 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="6" cy="8" r="6" fill="#093520" />
                <line x1="20" y1="8" x2="80" y2="8" stroke="#093520" />
                <circle
                  cx="94"
                  cy="8"
                  r="6"
                  fill={page === 0 ? "#B9B9C4" : "#093520"}
                />
                <line
                  x1="108"
                  y1="8"
                  x2="168"
                  y2="8"
                  stroke={page < 3 ? "#B9B9C4" : "#093520"}
                />
                <circle
                  cx="182"
                  cy="8"
                  r="6"
                  fill={page < 3 ? "#B9B9C4" : "#093520"}
                />
                <line
                  x1="196"
                  y1="8"
                  x2="256"
                  y2="8"
                  stroke={page === 3 ? "#093520" : "#B9B9C4"}
                />
                <circle
                  cx="270"
                  cy="8"
                  r="6"
                  fill={page < 3 ? "#B9B9C4" : "#093520"}
                />
              </svg>
            </div>
          ) : (
            <Steps
              direction="horizontal"
              className="w-[155px]"
              progressDot
              current={page}
              items={[
                {
                  title: "Formulário",
                  description: "",
                },
                {
                  title: "Categoria 1",
                  description: "",
                },
                {
                  title: "Categoria 2",
                  description: "",
                },
                {
                  title: "Categoria 3",
                  description: "",
                },
              ]}
            />
          )}

          <h1
            className={`${raleway.className} flex items-center mt-9 text-2xl md:text-4xl font-bold text-black`}
          >
            {page === 0 ? "Dados de Entrevistado" : `CATEGORIA ${page}`}
          </h1>
        </div>
        {page === 0 && (
          <div className="w-full mt-8 md:mt-16 flex justify-center lg:justify-start">
            <Form form={form} onFinish={onSubmit} layout="vertical">
              <div className="flex flex-col">
                <div className="flex items-center">
                  <span className="text-red-500 mr-1">*</span>
                  <label
                    htmlFor="idade"
                    className={`${karla.className} text-xl text-[#000000e0] flex items-center`}
                  >
                    Idade
                  </label>
                </div>
                <Form.Item name="idade" className="block">
                  <InputNumber
                    type="number"
                    min={2}
                    placeholder="Digite sua idade"
                    className="w-72 md:w-[411px] flex items-center h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10"
                  />
                </Form.Item>
              </div>
              <Form.Item
                className="w-72 md:w-full"
                label="Sexo"
                name="escolha_sexo"
                rules={[{ required: true, message: "Campo é Obrigatório" }]}
              >
                <Select
                  placeholder="---------"
                  className="text-black font-bold text-lg w-[411px] h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10"
                >
                  <Select.Option value="masculino">Masculino</Select.Option>
                  <Select.Option value="feminino">Feminino</Select.Option>
                  <Select.Option value="outro">Outro</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                className="w-72 md:w-full"
                label="Grau de instrução"
                name="grau_de_instrucao"
                rules={[{ required: true, message: "Campo é Obrigatório" }]}
              >
                <Select
                  placeholder="---------"
                  className="text-black font-bold text-lg w-full lg:w-[411px] h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10"
                >
                  <Select.Option value="fundamental">
                    Ensino fundamental completo
                  </Select.Option>
                  <Select.Option value="medio">
                    Ensino médio completo
                  </Select.Option>
                  <Select.Option value="superior">
                    Ensino superior completo
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                className="w-72 md:w-full"
                label="Local da aplicação"
                name="definicaoLocalForm"
                rules={[{ required: true, message: "Campo é Obrigatório" }]}
              >
                <Select
                  placeholder="---------"
                  className="text-black font-bold text-lg w-[411px] h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10"
                >
                  <Select.Option value="hospital">Hospital</Select.Option>
                  <Select.Option value="escola">Escola</Select.Option>
                  <Select.Option value="delegacia">Delegacia</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item className="flex w-72 md:w-[470px] justify-center mt-10 lg:justify-end  items-center">
                <button
                  type="submit"
                  className="w-[182px] h-[49px] bg-emerald-950 rounded-[32px] text-white text-xl font-bold font-['Inter']"
                >
                  Avançar
                </button>
              </Form.Item>
            </Form>
          </div>
        )}
        {page === 1 && (
          <Question
            question={questions.MEDO}
            page={page}
            setPage={setPage}
            allOptions={allOptions}
            setOkQuestion={setOkQuestion}
            setAllOptions={setAllOptions}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
        )}
        {page === 2 && (
          <Question
            question={questions.DEPENDENCIA}
            page={page}
            setPage={setPage}
            allOptions={allOptions}
            setOkQuestion={setOkQuestion}
            setAllOptions={setAllOptions}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
        )}
        {page === 3 && (
          <Question
            question={questions.CONTROLE}
            page={page}
            setPage={setPage}
            setOkQuestion={setOkQuestion}
            allOptions={allOptions}
            setAllOptions={setAllOptions}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
          />
        )}
      </div>
      <Modal
        data={data}
        setOkQuestion={setOkQuestion}
        sum={sumQuestion}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = parseCookies({ req });

  // Acesse o cookie ou qualquer outra informação de autenticação
  const isAuthenticated = !!cookies["psi-token"];

  // Faça qualquer lógica adicional necessária

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      users: "users",
    },
  };
};
