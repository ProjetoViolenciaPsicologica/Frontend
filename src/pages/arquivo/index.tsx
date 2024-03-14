import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Raleway, Karla } from "next/font/google";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Form, Input, Space, Switch, Select, InputNumber } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { api } from "@/services";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
type Users = {
  id:number,
  name:string
}

const raleway = Raleway({
  style: "normal",
  subsets: ["latin"],
});

const karla = Karla({
  style: "normal",
  subsets: ["latin"],
});

function Index({users}:{users:Users[]}) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [disabledDate, setDisabledDate] = useState(false);
  const [disabledUser, setDisabledUser] = useState(true)
  const handleStartDateChange = (date: any) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date: any) => {
    setEndDate(date);
  };
  const handleChange = (checked: boolean) => {
    setDisabledDate(checked); // Atualizando o estado quando o Switch é alterado
  };

  async function onSubmit(data: any) {
    console.log(data)
    const response = await api.get("formulario/filtro/", { data })
    console.log(response.data)
  }
  return (
    <Layout>
      <div className="flex w-full  flex-col items-center pl-4 lg:items-start lg:pl-12 bg-[#F6FBF9]">
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

        <Form className="h-full " onFinish={onSubmit}>
          <div className="flex flex-col  md:flex-row gap-x-44 w-full mt-10">
            <div className="flex flex-col ">
              <div className="flex flex-col">
                <label
                  htmlFor="grau"
                  className={`${karla.className} text-xl font-bold`}
                >
                  Grau de instrução
                </label>
                <Form.Item
                  className="w-96 md:w-full h-full"
                  name="grau_de_instrucao"
                  
                >
                  <Select
                    placeholder="Selecione"
                    className="text-black font-bold text-lg w-[411px] h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10"
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
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="sexo"
                  className={`${karla.className} text-xl font-bold`}
                >
                  Sexo
                </label>
                <Form.Item
                  className="w-96 md:w-full h-full"
                  name="sexo"
                 
                >
                  <Select
                    placeholder="Selecione"
                    className="text-black font-bold text-lg w-[411px] h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10"
                  >
                    <Select.Option value="masculino">fasculino</Select.Option>
                    <Select.Option value="feminino">feminino</Select.Option>
                    <Select.Option value="outro">outro</Select.Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="flex flex-col">
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
                 
                >
                  <InputNumber
                    type="number"
                    min={2}
                    placeholder="Digite sua idade"
                    className="w-96 md:w-[411px] flex items-center h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10"
                  />
                </Form.Item>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="usuarios"
                  className={`${karla.className} text-xl font-bold`}
                >
                  Usuário
                </label>
                <Form.Item
                  className="w-96 md:w-full h-full"
                  
                  name="usuarios"
                 
                >
                  <Select disabled={disabledUser}  placeholder="Selecione" className="text-black font-bold text-lg w-[411px] h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10">
                   
                   {users.map(user => (
                      <Select.Option value={user.name} key={user.id}>
                     {user.name }
                    </Select.Option>
                   ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className="flex flex-col w-full">
              <div className="flex flex-col pr-4">
                <label
                  htmlFor="definicaoLocalForm"
                  className={`${karla.className} text-xl font-bold`}
                >
                  Local da aplicação
                </label>
                <Form.Item
                  className="w-96 md:w-full h-full"
                  name="definicaoLocalForm"
                  
                >
                  <Select
                  disabled={!disabledUser}
                    placeholder="Selecione"
                    className="text-black font-bold text-lg w-[411px] h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10"
                  >
                    <Select.Option value="hospital">Hospital</Select.Option>
                    <Select.Option value="escola">Escola</Select.Option>
                    <Select.Option value="delegacia">Delegacia</Select.Option>
                  </Select>
                </Form.Item>
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
                      required: !disabledDate,
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
                    className={`w-96 md:w-[411px] h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10 pl-6 ${
                      disabledDate ? "cursor-not-allowed bg-[#F5F5F5]" : "cursor-pointer"
                    }`}
                  />
                </Form.Item>
              </div>
              <div className="flex flex-col">
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
                      required: !disabledDate,
                      message: "Por favor, selecione a data de início",
                    },
                  ]}
                >
                  <DatePicker
                    name="startDate"
                    selected={endDate}
                    disabled={disabledDate}
                    onChange={handleEndDateChange}
                    showTimeSelect
                    placeholderText="DD/MM/AA, HH:MM"
                    timeFormat="HH:mm"
                    dateFormat="dd/MM/yyyy HH:mm"
                    locale="pt-BR"
                    className={`w-96 md:w-[411px] h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10 pl-6 ${
                      disabledDate ? "cursor-not-allowed bg-[#F5F5F5]" : "cursor-pointer"
                    }`}
                  />
                </Form.Item>
              </div>
            </div>
          </div>

          <Space direction="vertical" className="mt-10 gap-y-10">
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
              checked={disabledUser}
              onChange={()=> setDisabledUser(!disabledUser)}
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

  const response = await api.get("user")
  const users = response.data
  return {
    props: {
      users:users,
    },
  };
};
