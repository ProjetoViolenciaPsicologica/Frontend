import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Raleway, Inter } from "next/font/google";
import Question from "@/components/Question";
import { questions, categories } from "@/utils/form";

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
      const questions =allOptions.split(",");
      const sum = questions.map(Number).reduce((acc, curr) => acc + curr, 0);
      console.log(questions)
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
      <div className="flex bg-[#F6FBF9] h-full w-full flex-col items-center pl-4 lg:items-start lg:pl-12">
        <div className="mt-4 flex flex-col w-full md:mt-10">
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
          <div className="h-screen w-full md:mt-16 ">
            <Form form={form} onFinish={onSubmit} layout="vertical">
              <Form.Item
                label="Idade"
                name="idade"
                rules={[
                  { required: true, message: "Por favor, insira sua idade" },
                ]}
              >
                <InputNumber
                  type="number"
                  min={2}
                  placeholder="Digite sua idade"
                  className="w-80"
                />
              </Form.Item>
              <Form.Item
                className="w-80"
                label="Sexo"
                name="escolha_sexo"
                rules={[{ required: true, message: "Campo é Obrigatório" }]}
              >
                <Select
                  placeholder="---------"
                  className="text-black font-bold text-lg"
                >
                  <Select.Option value="masculino">Masculino</Select.Option>
                  <Select.Option value="feminino">Feminino</Select.Option>
                  <Select.Option value="outro">Outro</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                className="w-80"
                label="Grau de instrução"
                name="grau_de_instrucao"
                rules={[{ required: true, message: "Campo é Obrigatório" }]}
              >
                <Select
                  placeholder="---------"
                  className="text-black font-bold text-lg"
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
                className="w-80"
                label="Local da aplicação"
                name="definicaoLocalForm"
                rules={[{ required: true, message: "Campo é Obrigatório" }]}
              >
                <Select
                  placeholder="---------"
                  className="text-black font-bold text-lg"
                >
                  <Select.Option value="hospital">Hospital</Select.Option>
                  <Select.Option value="escola">Escola</Select.Option>
                  <Select.Option value="delegacia">Delegacia</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item className="flex w-80 md:w-[470px] justify-center mt-10 md:justify-end  items-center">
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
