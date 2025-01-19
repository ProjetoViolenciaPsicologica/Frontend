import Layout from "@/components/LayoutUser";
import { IGrau, ILocal } from "@/utils/inicio/types";
import { raleway, montserrat, inter } from "@/utils/inicio/fonts";
import { encaminhamentoData, transformedData } from "@/utils/inicio/objects";
import apiForm from "@/pages/api";
import {
  Form,
  Select,
  Input,
  notification,
  Card,
  Button,
  Spin,
  Checkbox,
  Row,
  Col,
} from "antd";
import type { GetProp } from "antd";
import Link from "next/link";
import { parseCookies, setCookie } from "nookies";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { jwtDecode } from "jwt-decode";
import { api } from "@/services";
import { useQuery } from "react-query";

export default function Index({
  tipo,
  token,
}: {
  tipo: string;
  token: string;
}) {
  const { data: locais, isLoading: loadingLocais } = useQuery<ILocal[]>(
    "locais",
    async () => {
      const response = await api.get("local", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    }
  );
  const { data: graus, isLoading: loadingGrau } = useQuery<IGrau[]>(
    "grau",
    async () => {
      const response1 = await api.get("grau", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response1.data;
    }
  );
  const [form] = Form.useForm();
  const [page, setPage] = useState(
    tipo === "saúde" || tipo === "saude" ? 0 : 1
  );
  const [check, setCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const onChange: GetProp<typeof Checkbox.Group, "onChange"> = (
    checkedValues
  ) => {
    const encontrado = checkedValues.find((value) => value === "Outro");
    encontrado === "Outro" ? setCheck(true) : setCheck(false);
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    const encaminhamento = encaminhamentoData(data);
    const data1 = transformedData(data, encaminhamento);

    try {
      const response = await apiForm.createDataUser(data1);
      console.log(response);
      if (response.status === 201) {
        notification.success({
          message: "Sucesso!",
          description: "Formulário enviado com sucesso!",
        });
        setCookie(undefined, "id-entrevistado", `${response.data.id}`);
        setPage(page + 1);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    } catch (error: any) {
      notification.error({
        message: "Erro!",
        description: "Preencha as informações corretamente!",
      });
    } finally {
      setLoading(false);
    }

    // setFormData(data);
    // setOkQuestion(true);
  };

  return (
    <Layout
      title="Formulário de Avaliação"
      description="Formulário de Avaliação"
    >
      {page === 0 && (
        <>
          {loadingGrau && loadingLocais ? (
            <div className="w-full h-full flex justify-center mt-10">
              <Spin size="large" />
            </div>
          ) : (
            <div className="flex w-full h-full flex-col flex-wrap items-center pl-4 lg:items-start">
              <div className="w-full h-full px-4 py-8">
                <Card className="h-full p-6 w-full">
                  <h2 className="mb-6 text-2xl font-semibold">
                    Formulário de Avaliação
                  </h2>
                  <Form
                    form={form}
                    layout="vertical"
                    onFinish={onSubmit}
                    className="space-y-4 w-full"
                  >
                    <Form.Item
                      label="Idade"
                      name="idade"
                      rules={[
                        {
                          required: true,
                          message: "Por favor, insira sua idade!",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        placeholder="Digite sua idade"
                        className="h-10 w-full rounded-md border px-3"
                        min={2}
                      />
                    </Form.Item>

                    <Form.Item
                      label="Sexo"
                      name="escolha_sexo"
                      rules={[
                        {
                          required: true,
                          message: "Por favor, selecione o sexo!",
                        },
                      ]}
                    >
                      <Select placeholder="Selecione o sexo" className="w-full">
                        <Select.Option value="masculino">
                          Masculino
                        </Select.Option>
                        <Select.Option value="feminino">Feminino</Select.Option>
                        <Select.Option value="outro" on>
                          Outro
                        </Select.Option>
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label="Grau de Instrução"
                      name="grau_de_instrucao"
                      rules={[
                        {
                          required: true,
                          message: "Por favor, selecione o grau de instrução!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Selecione o grau de instrução"
                        className="w-full"
                      >
                        {graus?.map((grau) => (
                          <Select.Option
                            key={grau.id}
                            value={grau.definicaoGrau}
                          >
                            {grau.definicaoGrau}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>

                    <Form.Item
                      label="Local da Aplicação"
                      name="definicaoLocalForm"
                      rules={[
                        {
                          required: true,
                          message: "Por favor, selecione o local!",
                        },
                      ]}
                    >
                      <Select
                        placeholder="Selecione o local"
                        className="w-full"
                      >
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
                    <Form.Item
                      name="encaminhamento"
                      label="Selecione as opções"
                      className="w-full  md:hidden"
                      rules={[
                        {
                          required: true,
                          message: "Por favor, selecione pelo menos uma opção!",
                        },
                      ]}
                    >
                      <Checkbox.Group onChange={onChange}>
                        <Row gutter={16}>
                          <Col xs={24} sm={12} lg={6}>
                            <Checkbox value="Médico" disabled={check}>
                              Médico
                            </Checkbox>
                          </Col>
                          <Col xs={24} sm={12} lg={6}>
                            <Checkbox value="Psicólogo" disabled={check}>
                              Psicólogo
                            </Checkbox>
                          </Col>
                          <Col xs={24} sm={12} lg={6}>
                            <Checkbox
                              value="Assistente Social"
                              disabled={check}
                            >
                              Assistente Social
                            </Checkbox>
                          </Col>
                          <Col xs={24} sm={12} lg={6}>
                            <Checkbox value="Fisioterapia" disabled={check}>
                              Fisioterapia
                            </Checkbox>
                          </Col>
                          <Col xs={24}>
                            <Checkbox value="Outro">Outro</Checkbox>
                            {check && (
                              <Form.Item
                                name="encaminhamentoOutro"
                                rules={[
                                  {
                                    required: true,
                                    message: "Por favor, digite uma descrição.",
                                  },
                                ]}
                              >
                                <Input placeholder="Digite a opção..." />
                              </Form.Item>
                            )}
                          </Col>
                        </Row>
                      </Checkbox.Group>
                    </Form.Item>
                    <Form.Item
                      name="encaminhamento"
                      label="Selecione as opções"
                      className="w-full hidden md:flex"
                      rules={[
                        {
                          required: true,
                          message: "Por favor, selecione pelo menos uma opção!",
                        },
                      ]}
                    >
                      <Checkbox.Group onChange={onChange}>
                        <Checkbox value="Médico" disabled={check}>
                          Médico
                        </Checkbox>
                        <Checkbox value="Psicólogo" disabled={check}>
                          Psicólogo
                        </Checkbox>
                        <Checkbox value="Assistente Social" disabled={check}>
                          Assistente Social
                        </Checkbox>
                        <Checkbox value="Fisioterapia" disabled={check}>
                          Fisioterapia
                        </Checkbox>
                        <Checkbox value="Outro">
                          Outro
                          {check && (
                            <Form.Item
                              name="encaminhamentoOutro"
                              rules={[
                                {
                                  required: true,
                                  message: "Por favor, digite uma descrição.",
                                },
                              ]}
                            >
                              <Input placeholder="Digite a opção..." />
                            </Form.Item>
                          )}
                        </Checkbox>
                      </Checkbox.Group>
                    </Form.Item>
                    <Form.Item label="Especialidade" name="especialidade">
                      <Input
                        placeholder="Digite a especialidade"
                        className="h-10 w-full rounded-md border px-3"
                      />
                    </Form.Item>

                    <Form.Item
                      label="Número do Prontuário"
                      name="prontuario"
                      rules={[
                        {
                          required: true,
                          message: "Por favor, insira o número do prontuário!",
                        },
                      ]}
                    >
                      <Input
                        type="number"
                        placeholder="Digite o número do prontuário"
                        className="h-10 w-full rounded-md border px-3"
                      />
                    </Form.Item>

                    <Form.Item className="mb-0 flex justify-end md:justify-start  w-full">
                      <Button
                        type="primary"
                        loading={loading}
                        htmlType="submit"
                        className="text-white h-10 px-16 bg-emerald-950 hover:bg-emerald-900"
                      >
                        {loading ? "Enviando..." : "Enviar"}
                      </Button>
                    </Form.Item>
                  </Form>
                </Card>
              </div>
            </div>
          )}
        </>
      )}
      {page === 1 && (
        <div className="flex w-full flex-col flex-wrap items-center pl-4 lg:items-start lg:pl-12">
          {/* Desktop */}

          <div className="mt-8 flex flex-col ">
            <h1 className={`${raleway.className} text-2xl font-normal `}>
              INSTRUÇÕES PARA APLICAÇÃO
            </h1>
          </div>

          <div className="mt-7">
            <span
              className={`${montserrat.className} text-xl font-normal text-black`}
            >
              Esta é uma orientação para a aplicação do Questionário.{" "}
              <span className="font-bold">
                É importante enfatizar que as orientações aqui contidas não
                devem ser ditas ao respondente para não induzir as respostas.
              </span>
            </span>
          </div>

          <div className="mt-10">
            <h2
              className={`${montserrat.className} mb-2 text-xl font-normal text-black`}
            >
              Aplique este questionário se existir qualquer uma dessas condições
              prévias:
            </h2>
            <div
              className={`flex flex-col font-bold ${montserrat.className} gap-y-4`}
            >
              <span>
                1. Atendimento pelos órgãos de segurança pública por suspeita de
                violência por conviventes próximos.
              </span>
              <span>
                2. Mudança de comportamento na escola, perceptível por um ou
                mais profissionais, que indiquem medo, ansiedade, tristeza
                persistente ou conflitos visíveis.{" "}
              </span>
              <span>
                3.{" "}
                {`No atendimento em saúde, queixas persistentes, por quatro meses ou mais, com teor ansioso (ansiedade, medo, pânico, palpitações, sensação de viver "pisando em ovos"); ou com manifestações depressivas (tristeza, melancolia, vazio existencial, desânimo, embotamento emocional, pensamentos ou tentativas suicidas).`}
              </span>
            </div>
          </div>

          <div className="mt-6">
            <h1
              className={`text-xl font-normal text-black ${montserrat.className} mb-8`}
            >
              Este instrumento é dividido em Categoria 1, Categoria 2 e
              Categoria 3. Estas dimensões são divididas em valores que juntas
              formam uma análise. E para isso, a análise sugere 3 casos
              específicos:
            </h1>

            <ul className="list-disc	px-8 text-xl font-normal text-black">
              <li>
                Caso o avaliado pontue entre 15 (quinze) e 30 (trinta), o
                software apresenta o sinal verde, dispensando o avaliado de
                outros encaminhamentos.{" "}
              </li>
              <li>
                Caso o avaliado pontue entre 31 (trinta e um) e 38 (trinta e
                oito), é ligado o sinal amarelo para violência psicológica e
                consequente encaminhamento para atendimento multidisciplinar
                médico-psicológico-social.
              </li>
              <li>
                Caso o avaliado pontue entre 39 (trinta e nove) e 60 (sessenta),
                é ligado o sinal vermelho para violência psicológica e
                consequente encaminhamento urgente para atendimento
                multidisciplinar médico-psicológico-social.
              </li>
            </ul>
          </div>

          <div className="mb-6 mt-8 w-full">
            <h1
              className={`text-justify text-xl font-bold text-black ${montserrat.className} pr-4 md:pr-0`}
            >
              Na suspeita de vítima de violência, é imporante dirigir-se a
              pessoa com a seguinte informação:{" "}
            </h1>
            <ul
              className={`mt-11 w-full list-disc px-8 text-justify text-xl font-bold text-black ${montserrat.className}`}
            >
              <li>
                “Farei agora algumas perguntas sobre a conduta de pessoas
                próximas a você (sr., sra.). Por favor, responda com nunca; ou,
                às vezes; ou, frequentemente; ou, sempre, de acordo com o que
                lhe acontece no convívio com a pessoa de quem você (sr., sra.)
                se lembrar.”
              </li>
            </ul>
          </div>

          <div className="mb-8 mt-10 flex w-full justify-center md:mt-20">
            <Link href="/formularioUser">
              <span
                className={`text-white text-xl font-bold ${inter.className} rounded-[32px] bg-emerald-950 px-8 py-4`}
              >
                Iniciar QUESTIONÁRIO
              </span>
            </Link>
          </div>
        </div>
      )}
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
      Authorization: `Bearer ${token}`,
    },
  });
  const response1 = await api.get("grau", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // Authentication successful, proceed with rendering the page
  const locais = response.data;
  const graus = response1.data;

  // Authentication successful, proceed with rendering the page
  return {
    props: {
      graus,
      locais,
      tipo,
      token,
    },
  };
};
