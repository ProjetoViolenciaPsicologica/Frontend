import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Raleway, Karla } from "next/font/google";
import { DatePicker } from "antd";
import { Form, Input, Space, Switch, Select, InputNumber } from "antd";
import { ptBR } from "date-fns/locale";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { api } from "@/services";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";

const { RangePicker } = DatePicker;
type Users = {
  id: number;
  name: string;
};

const raleway = Raleway({
  style: "normal",
  subsets: ["latin"],
});

const karla = Karla({
  style: "normal",
  subsets: ["latin"],
});

function Index({ users }: { users: Users[] }) {
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [disabledDate, setDisabledDate] = useState(false);
  const [disabledUser, setDisabledUser] = useState(false);

  const handleStartDateChange = (dates: any) => {
    const formattedDates = dates?.map(formatDate);
    const [startDate, endDate] = formattedDates;
    setStartDate(startDate);
    setEndDate(endDate);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const formattedDate = `${date.getFullYear()}-${(
      "0" +
      (date.getMonth() + 1)
    ).slice(-2)}-${("0" + date.getDate()).slice(-2)} ${(
      "0" + date.getHours()
    ).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`;
    return formattedDate;
  };

  const handleChange = (checked: boolean) => {
    setDisabledDate(checked);
    setStartDate(null);
    setEndDate(null);
  };

  async function onSubmit(data: any) {
    const params: any = {};
    for (const [key, value] of Object.entries(data)) {
      if (value !== undefined) {
        params[key] = value;
      }
    }
    if (startDate && endDate) {
      params.data_inicio = startDate;
      params.data_fim = endDate;
    } else {
      delete params.data_inicio;
    }
    // if(params.localAplicacao){
    //   params.localAplicacao = {localAplicacao:{definicaoLocalForm: params.localAplicacao}}
    // }

    // if(params.area ){
    //   params.area = {definicaoArea: params.area}
    // }
    console.log(params);

    const response = await api.get("formulario/filtro/", { params });
    console.log(response.data);
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
                    <Select.Option value="">Selecione</Select.Option>
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
                <Form.Item className="w-96 md:w-full h-full" name="sexo">
                  <Select
                    placeholder="Selecione"
                    className="text-black font-bold text-lg w-[411px] h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10"
                  >
                    <Select.Option value="">Selecione</Select.Option>
                    <Select.Option value="masculino">Masculino</Select.Option>
                    <Select.Option value="feminino">Feminino</Select.Option>
                    <Select.Option value="outro">Outro</Select.Option>
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
                <Form.Item name="idade" className="block">
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
                <Form.Item className="w-96 md:w-full h-full" name="usuarios">
                  <Select.Option value="">Selecione</Select.Option>
                  <Select
                    disabled={!disabledUser}
                    placeholder="Selecione"
                    className="text-black font-bold text-lg w-[411px] h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10"
                  >
                    {users.map((user) => (
                      <Select.Option value={user.name} key={user.id}>
                        {user.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </div>
            </div>
            <div className="flex flex-col w-full">
              <div className="flex flex-col pr-4">
                <label
                  htmlFor="local_aplicacao"
                  className={`${karla.className} text-xl font-bold`}
                >
                  Local da aplicação
                </label>
                <Form.Item
                  className="w-96 md:w-full h-full"
                  name="local_aplicacao"
                >
                  <Select className="text-black font-bold text-lg w-[411px] h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10">
                    <Select.Option value="">Selecione</Select.Option>
                    <Select.Option value="hospital">Hospital</Select.Option>
                    <Select.Option value="escola">Escola</Select.Option>
                    <Select.Option value="delegacia">Delegacia</Select.Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="dataInicio"
                  className={`${karla.className} text-xl font-bold`}
                >
                  Data de início
                </label>
                <Form.Item
                  name="data_inicio"
                  rules={[
                    {
                      required: !disabledDate,
                      message: "Por favor, selecione a data de início",
                    },
                  ]}
                >
                  <RangePicker
                    showTime={{ format: "HH:mm" }}
                    disabled={disabledDate}
                    format="DD-MM-YYYY HH:mm"
                    onChange={handleStartDateChange}
                    lang="pt-br" // Adicione o locale correto aqui
                    locale={ptBR}
                    className={`w-96 md:w-[411px] h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10 pl-6 ${
                      disabledDate
                        ? "cursor-not-allowed bg-[#F5F5F5]"
                        : "cursor-pointer"
                    }`}
                  />
                </Form.Item>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="area"
                  className={`${karla.className} text-xl font-bold`}
                >
                  Área
                </label>
                <Form.Item className="w-96 md:w-full h-full" name="area">
                  <Select
                    disabled={disabledUser}
                    className="text-black font-bold text-lg w-[411px] h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10"
                  >
                    <Select.Option value="">Selecione</Select.Option>
                    <Select.Option value="Saúde">Saúde</Select.Option>
                    <Select.Option value="Educacao">Educacao</Select.Option>
                    <Select.Option value="Segurança">Segurança</Select.Option>
                  </Select>
                </Form.Item>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="tipo"
                  className={`${karla.className} text-xl font-bold`}
                >
                  Tipo de usuário
                </label>
                <Form.Item
                  className="w-96 md:w-full h-full"
                  name="definicaoLocalForm"
                >
                  <Select
                    disabled={disabledUser}
                    placeholder="Selecione"
                    className="text-black font-bold text-lg w-[411px] h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10"
                  >
                    <Select.Option value="Agente de Saúde">
                      Agente de Saúde
                    </Select.Option>
                    <Select.Option value="Agente de Educacao">
                      Agente de Educacao
                    </Select.Option>
                    <Select.Option value="Agente de Segurança">
                      Agente de Segurança
                    </Select.Option>
                  </Select>
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
                onChange={() => setDisabledUser(!disabledUser)}
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

  const response = await api.get("user");
  const users = response.data;
  return {
    props: {
      users: users,
    },
  };
};
