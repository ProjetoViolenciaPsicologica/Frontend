import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Raleway, Inter } from "next/font/google";
import Question from "@/components/Question";
import { questions, categories } from "@/utils/form";
import { useMutation } from 'react-query';
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import {
  Button,
  InputNumber,
  Form,
  Input,
  Select,
} from "antd";

const raleway = Raleway({
  weight: "700",
  style: "normal",
  subsets: ["latin"],
});

export interface dataForm {
  idade: number
  escolha_sexo: string
  grau_de_instrucao: string
  definicaoLocalForm: string
}


export default function Index() {
  const [form] = Form.useForm(); // Extrai a referência do form

  const router = useRouter();
  const [page, setPage] = useState(0);
  const [allOptions, setAllOptions] = useState("");
  const [formData, setFormData] = useState<dataForm>()
  const { mutate } = useMutation(
    async (data: string) => {
      const response = await fetch('/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({data}),
      });

      if (response.ok) {
        toast.success('Respostas cadastradas com sucesso!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          
        router.push('/dashboard')
        }, 2000);
      }
      else {
        toast.error('Erro ao enviar as respostas.', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      return response.json();
    }
  );
  const onSubmit = async (data: any) => {
    setFormData(data);
    // setPage(page + 1);
    console.log(data)
  }
  useEffect(() => {
    if(allOptions.length === 30) {
      const options = allOptions.substring(0, allOptions.length - 1);
      const data = {
        campo_questoes: options,
        idade: formData?.idade,
        escolha_sexo: formData?.escolha_sexo,
        grau_de_instrucao: formData?.grau_de_instrucao,
        localAplicacao: {
          definicaoLocalForm: formData?.definicaoLocalForm
        }
        
      }
     // mutate(options);

    }
  }, [allOptions, mutate]);

  return (
    <Layout>
      <div className="flex bg-[#F6FBF9] h-full w-full flex-col items-center pl-4 lg:items-start lg:pl-12">
        <div className="mt-4 flex flex-col w-full  md:mt-10">
          <svg
            width="155"
            height="16"
            viewBox="0 0 155 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="6" cy="8" r="6" fill="#093520" />
            <line x1="20" y1="7.5" x2="60" y2="7.5" stroke="#093520" />
            <circle
              cx="74"
              cy="8"
              r="6"
              fill={page === 0 ? "#B9B9C4" : "#093520"}
            />
            <line x1="88" y1="7.5" x2="128" y2="7.5" stroke="#B9B9C4" />
            <circle
              cx="142"
              cy="8"
              r="6"
              fill={page < 2 ? "#B9B9C4" : "#093520"}
            />
          </svg>

          <h1
            className={`${raleway.className} mt-9 text-2xl md:text-4xl font-bold text-black`}
          >
           {page === 0 ? "Dados de Entrevistado" : `CATEGORIA: ${categories[page]}`}
          </h1>
        </div>
        {page === 0 && (
         <div className="h-screen w-full mt-10 md:mt-[88px]">
            <Form form={form} onFinish={onSubmit} layout="vertical">
          <Form.Item
            label="Idade"
            name="idade"
            rules={[{ required: true, message: "Por favor, insira sua idade" }]}
          >
            <Input type="number" min={2} placeholder="Digite sua idade" className="w-80"/>
          </Form.Item>
         
          <Form.Item
          className="w-80"
            label="Sexo"
            name="escolha_sexo"
            rules={[{ required: true, message: "Campo é Obrigatório" }]}
          >
            <Select >
              <Select.Option value="masculino">
                Masculino
              </Select.Option>
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
            <Select >
              <Select.Option value="fundamental">Ensino fundamental completo</Select.Option>
              <Select.Option value="medio">Ensino médio completo</Select.Option>
              <Select.Option value="superior">Ensino superior completo</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
          className="w-80"
            label="Local da aplicação"
            name="definicaoLocalForm"
            rules={[{ required: true, message: "Campo é Obrigatório" }]}
          >
            <Select>
              <Select.Option value="hospital">Hospital</Select.Option>
              <Select.Option value="escola">Escola</Select.Option>
              <Select.Option value="delegacia">Delegacia</Select.Option>
            </Select>
          </Form.Item>
          <div className="flex w-80 md:w-[470px] justify-center mt-10 md:justify-end md:mt-44 items-center">
            <button
              type="submit"
              className="w-[182px] h-[49px] bg-emerald-950 rounded-[32px] text-white text-xl font-bold font-['Inter']"
            >
              Avançar
            </button>
          </div>
        </Form>
         </div>
        )}
        {page === 1 && <Question question={questions.MEDO} page={page} setPage={setPage} allOptions={allOptions} setAllOptions={setAllOptions} />}
        {page === 2 && <Question question={questions.DEPENDENCIA} page={page} setPage={setPage} allOptions={allOptions} setAllOptions={setAllOptions} />}
        {page === 3 && <Question question={questions.CONTROLE} page={page} setPage={setPage} allOptions={allOptions} setAllOptions={setAllOptions} />}

        
      </div>
    </Layout>
  );
}
