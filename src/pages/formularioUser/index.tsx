import React, { useState, useEffect } from "react";
import Layout from "@/components/LayoutUser";
import { Raleway, Karla, Inter } from "next/font/google";
import Question from "@/components/Question";
import { questions } from "@/utils/form";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import Modal from "@/components/ModalForm";
import { useRouter } from "next/router";
import { Steps, Form, InputNumber, Select } from "antd";
import { jwtDecode } from "jwt-decode";
import {api} from "@/services"
import Loading from "@/components/Loading";

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
const inter = Inter({
  style: "normal",
  subsets: ["latin"],
});

const karla = Karla({
  style: "normal",
  subsets: ["latin"],
});

interface ILocal {
  id: number;
  definicaoLocalForm: string;
}
interface IGrau {
  id: number;
  definicaoGrau: string;
}

export default function Index({graus,locais, tipo, isSuperuser}:{graus:IGrau[], locais:ILocal[], tipo:string, isSuperuser:boolean}) {
  const [form] = Form.useForm(); // Extrai a referência do form
  const router = useRouter();
  const [loadingComp, setLoadingComp] = useState(false);
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
    setOkQuestion(true);
  };

  useEffect(() => {
    if(page === 3 && tipo === "saúde") {
      setOkQuestion(true);
    }
    if (okQuestion) {
      const questions = allOptions.split(",");
      const sum = questions.map(Number).reduce((acc, curr) => acc + curr, 0);
      console.log(questions);
      setSumQuestion(sum);

      const data1: any = {
        campo_questoes: allOptions,
        idade: formData?.idade,
        escolha_sexo: formData?.escolha_sexo,
        grauInstrucao: {
          definicaoGrau: formData?.grau_de_instrucao,
        },
        localAplicacao: {
          definicaoLocalForm: formData?.definicaoLocalForm,
        },
      };

      const data2: any = {
        campo_questoes: allOptions
      };

      setIsModalOpen(true);
      tipo === "saúde" ? setData(data2) : setData(data1);
    }
  }, [
    allOptions,
    formData?.definicaoLocalForm,
    formData?.escolha_sexo,
    formData?.grau_de_instrucao,
    formData?.idade,
    okQuestion,
    page,
    tipo,
  ]);

  return (
    <Layout title="Questionário" description="Questionário de rastreamento">
      <div className="flex flex-col h-full w-full  items-center pl-4 lg:items-start lg:pl-12 bg-[#F6FBF9]">
        <div className="mt-4 flex w-full flex-col md:mt-10 pl-4 lg:pl-0">
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
              items={tipo !== "saúde" ? [
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
                {
                  title: "Dados",
                  description: "",
                },
              ] : [
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
            className={`${raleway.className} flex items-center w-full h-full mt-9 text-2xl md:text-4xl font-bold text-black`}
          >
            {page !== 3 && tipo !== "saúde" ?  `CATEGORIA ${page + 1}` : ""}
          </h1>
        </div>

        {page === 0 && (
          <Question
            question={questions.MEDO}
            page={page}
            setPage={setPage}
            allOptions={allOptions}
            setOkQuestion={setOkQuestion}
            setAllOptions={setAllOptions}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            tipo={tipo}
          />
        )}
        {page === 1 && (
          <Question
            question={questions.DEPENDENCIA}
            page={page}
            tipo={tipo}
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
            tipo={tipo}
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
        {page === 3 && tipo !== "saúde" &&(
          <div className="w-full mt-8 flex justify-center lg:justify-start">
            <Form
              form={form}
              onFinish={onSubmit}
              layout="vertical"
              className="w-full "
            >
              <div className="flex flex-col w-full">
                <div className="flex items-center">
                  <span className="text-red-500 mr-1">*</span>
                  <label
                    htmlFor="idade"
                    className={`${karla.className} text-xl text-[#000000e0] flex items-center`}
                  >
                    Idade
                  </label>
                </div>
                <Form.Item name="idade" rules={[{ required: true, message: "Campo é Obrigatório" }]}>
                  <InputNumber
                    type="number"
                    min={2}
                    placeholder="Digite sua idade"
                    className="flex w-72 md:w-[381px] items-center h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10"
                  />
                </Form.Item>
              </div>
              <Form.Item
                className="w-72 md:w-[381px]"
                label="Sexo"
                name="escolha_sexo"
                rules={[{ required: true, message: "Campo é Obrigatório" }]}
              >
                <Select
                  placeholder="---------"
                  className="text-black font-bold text-lg h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10"
                >
                  <Select.Option value="masculino">Masculino</Select.Option>
                  <Select.Option value="feminino">Feminino</Select.Option>
                  <Select.Option value="outro">Outro</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item
                className="w-72 md:w-[381px]"
                label="Grau de instrução"
                name="grau_de_instrucao"
                rules={[{ required: true, message: "Campo é Obrigatório" }]}
              >
                <Select
                  placeholder="---------"
                  className="text-black font-bold text-lg h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10"
                >
                 
                  {graus.map((grau)=> {
                    return (
                      <Select.Option key={grau.id} value={grau.definicaoGrau}>
                      {grau.definicaoGrau}
                    </Select.Option>
                    )
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                className="w-72 md:w-[381px]"
                label="Local da aplicação"
                name="definicaoLocalForm"
                rules={[{ required: true, message: "Campo é Obrigatório" }]}
              >
                <Select
                  placeholder="---------"
                  className="text-black font-bold text-lg w-[411px] h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10"
                >
                  {locais.map((local)=> {
                    return (
                      <Select.Option key={local.id} value={local.definicaoLocalForm}>
                      {local.definicaoLocalForm}
                    </Select.Option>
                    )
                  })}
                </Select>
              </Form.Item>
              <div
                className={`${
                  page > 0 && "gap-x-5"
                } w-full flex flex-col-reverse md:flex-row gap-y-4 justify-center items-center mb-6`}
              >
                <button
                  className={`${
                    page > 0 ? "flex" : "hidden"
                  } items-center justify-center text-xl font-bold text-white w-[182px] h-[49px] bg-yellow-400 rounded-[32px]`}
                  onClick={() => {
                    setPage(page - 1);
                  }}
                >
                  VOLTAR
                </button>
                <button
                  type="submit"
                  className={`w-[182px] h-[49px] bg-emerald-950 rounded-[32px] text-white text-xl font-bold ${inter.className}`}
                >
                  AVANÇAR
                </button>
              </div>
            </Form>
          </div>
        )}
        {loadingComp && tipo === "saúde" &&  (
          <Loading />
        )}
      </div>
      <Modal
        data={data}
        tipo={tipo}
        setPage={setPage}
        page={page}
        setLoadingComp={setLoadingComp}
        isSuperuser={isSuperuser}
        setOkQuestion={setOkQuestion}
        sum={sumQuestion}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
      />
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  // Parse cookies
  const cookies = parseCookies({ req });

  // Get token from cookies
  const token = cookies["psi-token"];

  // Check if token exists and is a string
  if (!token || typeof token !== "string") {
    // Redirect to login page
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  // Decode token
  let decoded: any;
  try {
    decoded = jwtDecode(token);
  } catch (error) {
    console.error("Error decoding token:", error);
    // Redirect to login page or handle error appropriately
  }

  // Check if user is superuser
  const isSuperuser = decoded?.is_superuser;
  const tipo = decoded?.tipo.toLowerCase();
  // If user is not superuser, redirect to home page
  const id = cookies["id-entrevistado"];
  if(!id && tipo === "saúde") {
    return {
      redirect: {
        destination: "/inicio",
        permanent: false,
      },
    };
  }
  if (isSuperuser) {
    return {
      redirect: {
        destination: "/formulario",
        permanent: false,
      },
    };
  }
  const response = await api.get("local", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  const response1 = await api.get("grau", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })

  // Authentication successful, proceed with rendering the page
  const locais = response.data
  const graus = response1.data
  
  // Authentication successful, proceed with rendering the page
  return {
    props: {
      graus,
      locais,
      tipo,
      isSuperuser,
    },
  };
};
