import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Raleway } from "next/font/google";
import { Form, Button, Table, Space, Modal, Input, Select } from "antd";
import { api } from "@/services";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";

interface IGrau {
  id: number;
  definicaoGrau: string;
}

interface IArea {
  id: number;
  definicaoArea: string;
}

interface ILocal {
  id: number;
  definicaoLocalForm: string;
}

interface ITipo {
  id: number;
  definicaoTipo: string;
}

const { confirm } = Modal;

const raleway = Raleway({
  style: "normal",
  subsets: ["latin"],
});

export default function Index({
  graus,
  areas,
  locais,
  tipos
}: {
  graus: IGrau[];
  areas: IArea[];
  locais: ILocal[];
  tipos: ITipo[];
}) {
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [tableData, setTableData] = useState<any>([
    {
      key: "1",
      grau: graus[0].definicaoGrau,
      area: areas[0].definicaoArea,
      local: locais[0].definicaoLocalForm,
      tipo: tipos[0].definicaoTipo
    }
  ]);

  // Função para confirmar exclusão
  const showConfirm = (record: any) => {
    confirm({
      title: "Tem certeza que deseja excluir?",
      content: `Você está prestes a excluir ${record.name}, essa ação não pode ser desfeita.`,
      onOk() {
        // Lógica para exclusão aqui
        console.log("Excluir", record);
      },
      onCancel() {
        console.log("Cancel");
      }
    });
  };

  // Função para abrir o modal de edição
  const openEditModal = (record: any) => {
    setSelectedRow(record);
    setModalVisible(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setSelectedRow(null);
    setModalVisible(false);
  };

  // Colunas da tabela
  const columns = [
    {
      title: "Grau de Instrução",
      dataIndex: "grau",
      key: "grau",
      width: "20%",
      render: (_: any, record: any) => (
        <Select
          style={{ width: "100%" }}
          value={record.grau}
          onChange={(value) => onTableSelectChange(record.key, 'grau', value)}
        >
          {graus.map(grau => (
            <Select.Option key={grau.id} value={grau.definicaoGrau}>
              {grau.definicaoGrau}
            </Select.Option>
          ))}
        </Select>
      )
    },
    {
      title: "Área",
      dataIndex: "area",
      key: "area",
      width: "20%",
      render: (_: any, record: any) => (
        <Select
          style={{ width: "100%" }}
          value={record.area}
          onChange={(value) => onTableSelectChange(record.key, 'area', value)}
        >
          {areas.map(area => (
            <Select.Option key={area.id} value={area.definicaoArea}>
              {area.definicaoArea}
            </Select.Option>
          ))}
        </Select>
      )
    },
    {
      title: "Local da Aplicação",
      dataIndex: "local",
      key: "local",
      width: "20%",
      render: (_: any, record: any) => (
        <Select
          style={{ width: "100%" }}
          value={record.local}
          onChange={(value) => onTableSelectChange(record.key, 'local', value)}
        >
          {locais.map(local => (
            <Select.Option key={local.id} value={local.definicaoLocalForm}>
              {local.definicaoLocalForm}
            </Select.Option>
          ))}
        </Select>
      )
    },
    {
      title: "Tipo de Aplicador",
      dataIndex: "tipo",
      key: "tipo",
      width: "20%",
      render: (_: any, record: any) => (
        <Select
          style={{ width: "100%" }}
          value={record.tipo}
          onChange={(value) => onTableSelectChange(record.key, 'tipo', value)}
        >
          {tipos.map(tipo => (
            <Select.Option key={tipo.id} value={tipo.definicaoTipo}>
              {tipo.definicaoTipo}
            </Select.Option>
          ))}
        </Select>
      )
    },
    {
      title: "Ações",
      key: "action",
      width: "20%",
      render: (text: any, record: any) => (
        <Space size="middle">
          <Button type="primary" onClick={() => openEditModal(record)}>
            Editar
          </Button>
          <Button type="text" onClick={() => showConfirm(record)}>
            Excluir
          </Button>
        </Space>
      )
    }
  ];

  // Função para atualizar o estado do formulário com base na seleção feita na tabela
  const onTableSelectChange = (key: string, field: string, value: string) => {
    const newData = tableData.map((item: any) => ({ ...item }));
    const index = newData.findIndex((item: { key: string; }) => item.key === key);
    if (index > -1) {
      newData[index][field] = value;
      setTableData(newData); // Atualiza o estado da tabela
    }
  };

  return (
    <Layout>
      <div className="flex flex-col items-center pl-8 lg:items-start">
        <div className="mt-4 flex flex-col w-full md:mt-4">
          <h1 className={`${raleway.className} text-3xl font-normal `}>
            FORMULÁRIO
          </h1>
          <span
            className={`${raleway.className} w-[256px] mt-4 text-black text-sm font-normal leading-tight`}
          >
            Gerenciamento de informações de um formulário e aplicador
          </span>
        </div>
        <div className="w-full h-full mt-8 flex justify-center lg:justify-start">
          <Table
            columns={columns}
            dataSource={tableData}
            pagination={false}
            style={{ width: "100%" }}
          />
        </div>
      </div>
      {/* Modal de Edição */}
      <Modal
        title="Editar Informações"
        visible={modalVisible}
        onCancel={closeModal}
        footer={[
          <Button key="cancel" onClick={closeModal}>
            Cancelar
          </Button>,
          <Button key="submit" type="primary" onClick={closeModal}>
            Salvar
          </Button>
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Grau de Instrução" name="grau">
            <Input />
          </Form.Item>
          <Form.Item label="Área" name="area">
            <Input />
          </Form.Item>
          <Form.Item label="Local da Aplicação" name="local">
            <Input />
          </Form.Item>
          <Form.Item label="Tipo de Aplicador" name="tipo">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = parseCookies({ req });
  const token = cookies["psi-token"];
  const isAuthenticated = !!cookies["psi-token"];
  if (!isAuthenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false
      }
    };
  }
  const [grausRes, locaisRes, areasRes, tiposRes] = await Promise.all([
    api.get("grau", { headers: { Authorization: `Bearer ${token}` } }),
    api.get("local", { headers: { Authorization: `Bearer ${token}` } }),
    api.get("area", { headers: { Authorization: `Bearer ${token}` } }),
    api.get("tipo", { headers: { Authorization: `Bearer ${token}` } })
  ]);
  const graus: IGrau[] = grausRes.data;
  const locais: ILocal[] = locaisRes.data;
  const areas: IArea[] = areasRes.data;
  const tipos: ITipo[] = tiposRes.data;
  return {
    props: {
      graus,
      locais,
      areas,
      tipos
    }
  };
};
