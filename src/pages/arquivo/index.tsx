/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Karla, Inter } from "next/font/google";
import {
  Form,
  Button,
  Space,
  Switch,
  Select,
  InputNumber,
  DatePicker,
  Slider,
  Dropdown,
  Menu,
} from "antd";
import ptBR from "antd/lib/date-picker/locale/pt_BR";
import { CheckOutlined, CloseOutlined, DownOutlined } from "@ant-design/icons";
import { CiExport } from "react-icons/ci";
import { FaFilePdf, FaFileExcel } from "react-icons/fa";
import api from "@/pages/api";
import { handleExportExcel, handleExportPDF } from "@/utils/files";
import { IGrau, ILocal, IArea, ITipo, Users } from "@/utils/inicio/types";
import { GetServerSideProps } from "next";
import { parseCookies, setCookie } from "nookies";
import { useRouter } from "next/router";
const { RangePicker } = DatePicker;

const inter = Inter({
  style: "normal",
  subsets: ["latin"],
});

const karla = Karla({
  style: "normal",
  subsets: ["latin"],
});

function Index({
  users,
  graus,
  locais,
  areas,
  tipos,
}: {
  users: Users[];
  locais: ILocal[];
  graus: IGrau[];
  areas: IArea[];
  tipos: ITipo[];
}) {
  const [form] = Form.useForm(); // Use a instância do Form
  const router = useRouter();
  const [disabledAge, setDisabledAge] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
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

  async function handleViewFilter() {
    const data = await form.validateFields();
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
    setLoading(true);
    try {
      if (disabledAge && params.idade) {
        params.idade_min = params?.idade[0];
        params.idade_max = params?.idade[1];
        delete params?.idade;
      }
      const response = await api.filtro(params);
      setCookie(undefined, "dataSearch", response.data.length);
      setCookie(undefined, "dataFilter", JSON.stringify(params));
      disabledAge &&
        setCookie(
          undefined,
          "age",
          `${params.idade_min} - ${params.idade_max}`
        );
      router.push("/filtro");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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

  const handleChangeAge = (checked: boolean) => {
    setDisabledAge(checked);
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
    setLoading1(true);
    try {
      const response = await api.filtro(params);
      //handleExportExcel(response.data);
      handleExportPDF(response.data);
    } catch (error) {
    } finally {
      setLoading1(false);
    }
  }

  const handleExportOption = (type: string) => {
    const params = form.getFieldsValue();
    if (startDate && endDate) {
      params.data_inicio = startDate;
      params.data_fim = endDate;
    } else {
      delete params.data_inicio;
    }
    setLoading1(true);
    api
      .filtro(params)
      .then((response: { data: any; }) => {
        if (type === "excel") {
          handleExportExcel(response.data); // Chama a função para exportar em Excel
        } else if (type === "pdf") {
          handleExportPDF(response.data); // Chama a função para exportar em PDF
        }
      })
      .catch((error: any) => console.error(error))
      .finally(() => setLoading1(false));
  };

  // Menu do Dropdown
  const exportMenu = (
    <Menu>
      <Menu.Item key="1" icon={<FaFileExcel size={20} />} onClick={() => handleExportOption("excel")}>
        

        Exportar em Excel
      </Menu.Item>
      <Menu.Item key="2" icon={<FaFilePdf size={20} />} onClick={() => handleExportOption("pdf")}>
        Exportar em PDF
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout
      title="ARQUIVOS"
      description="Manipulação e extração de informações da base de dados do sistema"
    >
      <div className="flex w-full  flex-col items-center pl-4 lg:items-start bg-[#F6FBF9]">
        <div className=" flex flex-col w-full ">
          <button
            onClick={() => {
              router.back();
            }}
            className="mr-6 hover:cursor-pointer my-6"
          >
          <img src="/back.svg" alt="Voltar" />
          </button>
        </div>

        <Form className="h-full" form={form} onFinish={onSubmit}>
          <div className="flex flex-col-reverse lg:flex-row gap-x-32 w-full mt-4">
            <div className="flex flex-col ">
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
                    {graus?.map((grau) => (
                      <Select.Option key={grau.id} value={grau.definicaoGrau}>
                        {grau.definicaoGrau}
                      </Select.Option>
                    ))}
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
                <Form.Item className="w-72 md:w-full h-full" name="sexo">
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
                  {disabledAge ? (
                    <Slider
                      range
                      defaultValue={[0, 50]}
                      className="w-72 md:w-[411px]"
                    />
                  ) : (
                    <InputNumber
                      type="number"
                      min={2}
                      placeholder="Digite sua idade"
                      className="w-72 md:w-[411px] flex items-center h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10"
                    />
                  )}
                </Form.Item>
              </div>
              <div className="flex flex-col">
                <label
                  htmlFor="usuario"
                  className={`${karla.className} text-xl font-bold`}
                >
                  Aplicador
                </label>
                <Form.Item className="w-72 md:w-full h-full" name="usuario">
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
                  className="w-72 md:w-full h-full"
                  name="local_aplicacao"
                >
                  <Select
                    placeholder="Selecione"
                    className="text-black font-bold text-lg w-[411px] h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10"
                  >
                    <Select.Option value="">--------</Select.Option>
                    {locais?.map((local) => (
                      <Select.Option
                        key={local.id}
                        value={local.definicaoLocalForm}
                      >
                        {local.definicaoLocalForm}
                      </Select.Option>
                    ))}
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
                    className={`w-72 md:w-[411px] h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10 pl-6 ${
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
                <Form.Item className="w-72 md:w-full h-full" name="area">
                  <Select
                    placeholder="Selecione"
                    disabled={disabledUser}
                    className="text-black font-bold text-lg w-[411px] h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10"
                  >
                    <Select.Option value="">------</Select.Option>
                    {areas?.map((area: IArea) => (
                      <Select.Option key={area.id} value={area.definicaoArea}>
                        {area.definicaoArea}
                      </Select.Option>
                    ))}
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
                    disabled={disabledUser}
                    placeholder="Selecione"
                    className="text-black font-bold text-lg w-[411px] h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10"
                  >
                    <Select.Option value="">------</Select.Option>
                    {tipos?.map((tipo: ITipo) => (
                      <Select.Option key={tipo.id} value={tipo.definicaoTipo}>
                        {tipo.definicaoTipo}
                      </Select.Option>
                    ))}
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
                checkedChildren={<CheckOutlined />}
                unCheckedChildren={<CloseOutlined />}
                className="bg-[#9EACAE] hover:bg-blue-600 "
                checked={disabledAge} // Definindo o estado atual do Switch
                onChange={handleChangeAge}
              />
              <span
                className={`${karla.className} text-black text-xl font-bold`}
              >
                Habilitar Idade Min. e Max.
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
            <Button
              htmlType="button"
              loading={loading}
              onClick={handleViewFilter}
              className={`${inter.className} w-[202px] h-[59px] bg-[#00FF85]  rounded-[32px] text-white font-bold `}
            >
              VISUALIZAR
            </Button>
            <Dropdown overlay={exportMenu}>
              <Button
                loading={loading1}
                icon={<CiExport size={24}/>}
                className={`${inter.className} w-[202px] h-[59px] bg-emerald-950 rounded-[32px] text-white font-bold flex items-center justify-center`}
              >
               
               EXPORTAR 
              </Button>
            </Dropdown>
          </div>
        </Form>
      </div>
    </Layout>
  );
}

export default Index;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = parseCookies({ req });
  const token = cookies["psi-token"];
  const isAuthenticated = !!cookies["psi-token"];

  if (!isAuthenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  try {
    const response = await api.get("user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const users = response.data;
    const response1 = await api.get("local", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const locais = response1.data;
    const response2 = await api.get("grau", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const graus = response2.data;
    const response3 = await api.get("area", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const response4 = await api.get("tipo", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const areas = response3.data;
    const tipos = response4.data;
    return {
      props: {
        users: users,
        locais: locais,
        graus: graus,
        areas: areas,
        tipos: tipos,
      },
    };
  } catch (error) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
};
