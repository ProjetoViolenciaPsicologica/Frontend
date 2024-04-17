import React from "react";
import Layout from "@/components/Layout";
import { Raleway, Karla, Inter } from "next/font/google";
import { Form, InputNumber, Select } from "antd";

const raleway = Raleway({
  style: "normal",
  subsets: ["latin"],
});

const karla = Karla({
  style: "normal",
  subsets: ["latin"],
});

const inter = Inter({
  style: "normal",
  subsets: ["latin"],
});

export default function Index() {
  const [form] = Form.useForm();
  function onSubmit(values: any) {
    return;
  }

  return (
    <Layout>
      <div className="flex flex-col items-center pl-8 lg:items-start">
        <div className="mt-4 flex flex-col w-full  md:mt-4">
          <h1 className={`${raleway.className} text-3xl font-normal `}>
            FORMULÁRIO
          </h1>
          <span
            className={`${raleway.className} w-[256px] mt-4 text-black text-sm font-normal leading-tight`}
          >
            Gerenciamento de informações de um formulário e aplicador
          </span>
        </div>
        <div className="w-full h-full mt-8  flex justify-center lg:justify-start">
          <Form
            form={form}
            onFinish={onSubmit}
            layout="vertical"
            className="w-72 md:w-[381px] h-full"
          >
            <div className="flex flex-col">
              <label
                htmlFor="grau"
                className={`${karla.className} text-xl font-bold`}
              >
                Grau de instrução
              </label>
              <Form.Item
                className="w-72 md:w-full h-full"
                name="grau_de_instrucao"
              >
                <Select
                  placeholder="Selecione"
                  className="text-black font-bold text-lg w-[411px] h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10"
                >
                  <Select.Option value="">------</Select.Option>
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
            </div>
            <div className="flex flex-col pr-4">
              <label
                htmlFor="local_aplicacao"
                className={`${karla.className} text-xl font-bold`}
              >
                Local da aplicação
              </label>
              <Form.Item
                className="w-72 md:w-full h-full"
                name="local_aplicacao"
              >
                <Select
                  placeholder="Selecione"
                  className="text-black font-bold text-lg w-[411px] h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10"
                >
                  <Select.Option value="">--------</Select.Option>
                  <Select.Option value="hospital">Hospital</Select.Option>
                  <Select.Option value="escola">Escola</Select.Option>
                  <Select.Option value="delegacia">Delegacia</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="area"
                className={`${karla.className} text-xl font-bold`}
              >
                Área
              </label>
              <Form.Item className="w-72 md:w-full h-full" name="area">
                <Select
                  placeholder="Selecione"
                  className="text-black font-bold text-lg w-[411px] h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10"
                >
                  <Select.Option value="">------</Select.Option>
                  <Select.Option value="Saúde">Saúde</Select.Option>
                  <Select.Option value="Educação">Educação</Select.Option>
                  <Select.Option value="Segurança">Segurança</Select.Option>
                </Select>
              </Form.Item>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="tipo"
                className={`${karla.className} text-xl font-bold`}
              >
                Tipo de aplicador
              </label>
              <Form.Item
                className="w-72 md:w-full h-full"
                name="definicaoLocalForm"
              >
                <Select
                  placeholder="Selecione"
                  className="text-black font-bold text-lg w-[411px] h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10"
                >
                  <Select.Option value="">------</Select.Option>
                  <Select.Option value="Agente de Saúde">
                    Agente de Saúde
                  </Select.Option>
                  <Select.Option value="Agente de Educação">
                    Agente de Educação
                  </Select.Option>
                  <Select.Option value="Agente de Segurança">
                    Agente de Segurança
                  </Select.Option>
                </Select>
              </Form.Item>
            </div>
            <Form.Item className="flex w-72 md:w-[470px] justify-center lg:justify-end  items-center">
              <button
                type="submit"
                className={`w-[182px] h-[49px] bg-emerald-950 rounded-[32px] text-white text-xl font-bold ${inter.className}`}
              >
                Avançar
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Layout>
  );
}
