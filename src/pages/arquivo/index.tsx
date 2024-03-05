import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Raleway, Karla } from "next/font/google";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale/pt-BR"; // Importe o locale em pt-BR
import { Form, Input, Space, Switch } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";

// Registre o locale para uso com o DatePicker
registerLocale("pt-BR", ptBR);

const raleway = Raleway({
  style: "normal",
  subsets: ["latin"],
});

const karla = Karla({
  style: "normal",
  subsets: ["latin"],
});

function Index() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [disabledDate, setDisabledDate] = useState(true);
  const handleStartDateChange = (date: any) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: any) => {
    setEndDate(date);
  };
  const handleChange = (checked: boolean) => {
    setDisabledDate(checked); // Atualizando o estado quando o Switch é alterado
  };
  console.log(startDate, endDate);
  return (
    <Layout>
      <div className="flex h-screen w-screen flex-col items-center pl-4 lg:items-start lg:pl-12 bg-[#F6FBF9]">
        <div className="mt-4 flex flex-col w-full md:mt-4">
          <h1 className={`${raleway.className} text-3xl font-normal `}>
            ARQUIVOS
          </h1>
          <span
            className={`${raleway.className} w-[309px] mt-4 text-black text-sm font-normal leading-tight`}
          >
            Manipulação e extração de informações da base de dados do sistema
          </span>
        </div>

        <Form className="bg-[#F6FBF9]">
          <div className="flex flex-col  md:flex-row gap-x-44 w-full mt-10 md:mt-20">
            <div className="flex flex-col gap-y-4 md:gap-y-12 ">
              <div className="flex flex-col">
                <label
                  htmlFor="grau"
                  className={`${karla.className} text-xl font-bold`}
                >
                  Grau de instrução
                </label>
                <select
                  name="grau"
                  id="grau"
                  className="w-[411px] h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10 pl-6"
                >
                  <option value="fundamental">
                    Ensino fundamental completo
                  </option>
                  <option value="medio">Ensino médio completo</option>
                  <option value="superior">Ensino superior completo</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="sexo"
                  className={`${karla.className} text-xl font-bold`}
                >
                  Sexo
                </label>
                <select
                  name="sexo"
                  id="sexo"
                  className="w-[411px] h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10 pl-6"
                >
                  <option value="masculino">Masculino</option>
                  <option value="feminino">Feminino</option>
                  <option value="outro">Outro</option>
                </select>
              </div>
              <div className="flex flex-col mt-6">
                <div className="flex items-center">
                  <span className="text-red-500 mr-1">*</span>
                  <label
                    htmlFor="idade"
                    className={`${karla.className} text-xl font-bold flex items-center`}
                  >
                    Idade
                  </label>
                </div>
                <Form.Item
                  name="idade"
                  className="block"
                  rules={[
                    { required: true, message: "Por favor, insira sua idade" },
                  ]}
                >
                  <Input
                    type="number"
                    min={2}
                    placeholder="Digite sua idade"
                    className="w-[411px] h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10 pl-6"
                  />
                </Form.Item>
              </div>
            </div>
            <div className="flex flex-col gap-y-4 md:gap-y-12">
              <div className="flex flex-col">
                <label
                  htmlFor="grau"
                  className={`${karla.className} text-xl font-bold`}
                >
                  Local da aplicação
                </label>
                <select
                  name="local"
                  id="local"
                  className="w-[411px] h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10 pl-6"
                >
                  <option value="">Selecione</option>
                  <option value="hospital">Hospital</option>
                  <option value="escola">Escola</option>
                  <option value="delegacia">Delegacia</option>
                </select>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="startDate"
                  className={`${karla.className} text-xl font-bold`}
                >
                  Data de início
                </label>
                <Form.Item
                  name="startDate"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, selecione a data de início",
                    },
                  ]}
                >
                  <DatePicker
                    name="startDate"
                    selected={startDate}
                    disabled={disabledDate}
                    onChange={handleStartDateChange}
                    showTimeSelect
                    placeholderText="DD/MM/AA, HH:MM"
                    timeFormat="HH:mm"
                    dateFormat="dd/MM/yyyy HH:mm"
                    locale="pt-BR"
                    className={`w-[411px] h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10 pl-6 ${
                      disabledDate ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                  />
                </Form.Item>
              </div>
              <div className="flex flex-col mt-0 mb-0">
                <label
                  htmlFor="endDate"
                  className={`${karla.className} text-xl font-bold`}
                >
                  Data de Fim
                </label>
                <Form.Item
                  name="endDate"
                  rules={[
                    {
                      required: true,
                      message: "Por favor, selecione a data de fim",
                    },
                  ]}
                >
                  <DatePicker
                    name="endDate"
                    selected={endDate}
                    disabled={disabledDate}
                    onChange={handleEndDateChange}
                    showTimeSelect
                    placeholderText="DD/MM/AA, HH:MM"
                    timeFormat="HH:mm"
                    dateFormat="dd/MM/yyyy HH:mm"
                    locale="pt-BR"
                    className={`w-[411px] h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10 pl-6 ${
                      disabledDate ? "cursor-not-allowed" : "cursor-pointer"
                    }`}
                  />
                </Form.Item>
              </div>
            </div>
          </div>

          <Space direction="vertical" className="mt-10 gap-y-10 bg-[#F6FBF9]">
            <Space direction="horizontal">
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                className="bg-[#9EACAE] hover:bg-blue-600 "
              />
              <span
                className={`${karla.className} text-black text-xl font-bold`}
              >
                Exportar Base de dados
              </span>
            </Space>
            <Space direction="horizontal">
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                className="bg-[#9EACAE] hover:bg-blue-600 "
                checked={disabledDate} // Definindo o estado atual do Switch
                onChange={handleChange}
              />
              <span
                className={`${karla.className} text-black text-xl font-bold`}
              >
                Desabilitar datas
              </span>
            </Space>
            <Space direction="horizontal">
              <Switch
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                className="bg-[#9EACAE] hover:bg-blue-600 "
              />
              <span
                className={`${karla.className} text-black text-xl font-bold`}
              >
                Habilitar busca por usuário
              </span>
            </Space>
          </Space>

          <div className="w-full  flex flex-col md:flex-row justify-center items-center mt-10 gap-y-4 md:gap-y-0 md:gap-x-3.5 bg-[#F6FBF9]">
            <button className="w-[202px] h-[59px] bg-[#00FF85]  rounded-[32px] text-white font-bold font-['Inter']">
              VISUALIZAR
            </button>
            <button
              type="submit"
              className="w-[202px] h-[59px] bg-emerald-950 rounded-[32px] text-white font-bold font-['Inter']"
            >
              EXPORTAR
            </button>
          </div>
        </Form>
      </div>
    </Layout>
  );
}

export default Index;
