import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Raleway, Karla } from "next/font/google";
import { DatePicker } from "antd";
import { Form, Input, Space, Switch, Select, InputNumber } from "antd";
import ptBR from "antd/lib/date-picker/locale/pt_BR";
import * as XLSX from "xlsx";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { api } from "@/services";
import { GetServerSideProps } from "next";
import { parseCookies, setCookie } from "nookies";
import { useRouter } from "next/router";
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
  const [form] = Form.useForm(); // Use a instância do Form
  const router = useRouter()
  const [startDate, setStartDate] = useState<any>(null);
  const [endDate, setEndDate] = useState<any>(null);
  const [disabledDate, setDisabledDate] = useState(true);
  const [disabledUser, setDisabledUser] = useState(false);
  const handleStartDateChange = (dates: any) => {
    const formattedDates = dates?.map(formatDate);
    if (formattedDates) {
      const [startDate, endDate] = formattedDates;
      setStartDate(startDate);
      setEndDate(endDate);
    }
  };

  async function handleViewFilter(){
   const data = await form.validateFields()
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
   const response = await api.get("formulario/filtro/", { params });
   setCookie(undefined, "dataSearch", response.data.length);
   setCookie(undefined, "dataFilter", JSON.stringify(params));
   router.push("/filtro")
  }

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
    console.log(params);

    const response = await api.get("formulario/filtro/", { params });
    console.log(response.data);

    handleExportExcel(response.data);
  }

  const handleExportExcel = (filteredData: any) => {
    // Converte os dados para o formato apropriado para o Excel
    const dataFilter = filteredData.map(
      (data: {
        campo_questoes: any;
        idade: any;
        escolha_sexo: any;
        localAplicacao: { definicaoLocalForm: any };
      }) => {
        return {
          questões: data?.campo_questoes,
          idade: data?.idade,
          sexo: data?.escolha_sexo,
          "local da aplicação": data?.localAplicacao?.definicaoLocalForm,
        };
      }
    );
    const excelData = convertToExcelData(dataFilter);

    // Cria uma nova pasta de trabalho do Excel
    const worksheet = XLSX.utils.aoa_to_sheet(excelData);

    // Cria um livro de trabalho e adiciona a planilha a ele
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Dados Filtrados");

    // Converte o livro de trabalho em um blob
    const excelBlob = workbook2blob(workbook);

    // Cria um objeto URL a partir do blob
    const url = window.URL.createObjectURL(excelBlob);

    // Cria um link temporário e o clica para iniciar o download
    const link = document.createElement("a");
    link.href = url;
    link.download = "filtered_data.xlsx";
    link.click();

    // Libera o objeto URL quando o link é removido
    window.URL.revokeObjectURL(url);
  };

  // Função para converter os dados para o formato apropriado para o Excel
  const convertToExcelData = (data: any[]) => {
    const headerRow = Object.keys(data[0]);
    const rows = data.map((row) => Object.values(row));
    return [headerRow, ...rows];
  };

  // Função para converter o livro de trabalho em um blob
  const workbook2blob = (workbook: XLSX.WorkBook) => {
    const wopts: XLSX.WritingOptions = {
      bookType: "xlsx",
      bookSST: false,
      type: "binary",
    };
    const wbout = XLSX.write(workbook, wopts);

    function s2ab(s: string): ArrayBuffer {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    }

    return new Blob([s2ab(wbout)], { type: "application/octet-stream" });
  };

  return (
    <Layout>
      <div className="flex w-full  flex-col items-center pl-4 lg:items-start lg:pl-12 bg-[#F6FBF9]">
        <div className="mt-4 flex flex-col w-full md:mt-4">
        <button onClick={()=> {
              router.back()
          }} className="mr-6 hover:cursor-pointer my-6">
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
          <h1 className={`${raleway.className} text-3xl font-normal `}>
            ARQUIVOS
          </h1>
          <span
            className={`${raleway.className} w-[309px] mt-4 text-black text-sm font-normal leading-tight`}
          >
            Manipulação e extração de informações da base de dados do sistema
          </span>
        </div>

        <Form className="h-full" form={form} onFinish={onSubmit}>
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
                    <Select.Option value="">------</Select.Option>
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
                  htmlFor="usuario"
                  className={`${karla.className} text-xl font-bold`}
                >
                  Usuário
                </label>
                <Form.Item className="w-96 md:w-full h-full" name="usuario">
                  <Select
                    disabled={!disabledUser}
                    placeholder="Selecione"
                    className="text-black font-bold text-lg w-[411px] h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10"
                  >
                    <Select.Option value="">------</Select.Option>
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
                  htmlFor="dataInicio"
                  className={`${karla.className} text-xl font-bold`}
                >
                  Data de início e fim
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
                    placeholder={["Data e hora inicial", "Data e hora final"]}
                    format="DD/MM/YYYY HH:mm"
                    onChange={handleStartDateChange}
                    locale={ptBR}
                    lang="pt-br" // Adicione o locale correto aqui
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
                    placeholder="Selecione"
                    disabled={disabledUser}
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
                    <Select.Option value="">------</Select.Option>
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
            <button type="button" onClick={handleViewFilter} className="w-[202px] h-[59px] bg-[#00FF85]  rounded-[32px] text-white font-bold font-['Inter']">
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

  const isAuthenticated = !!cookies["psi-token"];


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