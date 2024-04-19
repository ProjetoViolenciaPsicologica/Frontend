import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Raleway } from "next/font/google";
import { Form, Button, Table, Space, Modal, Input, Select } from "antd";
import { api } from "@/services";
import apiForm from "@/pages/api"
import { destroyCookie, parseCookies } from "nookies";
import { GetServerSideProps } from "next";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import router from "next/router";

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

export default function Index(){
  const [form] = Form.useForm();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const {
    data: graus,
    isLoading: isLoadingGraus,
    refetch,
  } = useQuery("graus", async () => {
    try {
      const response = await apiForm.getAllGraus();
      return response.data;
    } catch (error) {
      toast.error("Tempo expirado");
      destroyCookie(null, "psi-token");
      destroyCookie(null, "psi-refreshToken");
      router.push("/login");
    }
  });

  const {
    data: locais,
    isLoading: isLoadingLocais,
    refetch: refetchLocais,
  } = useQuery("graus", async () => {
    try {
      const response = await apiForm.getAllLocais();
      return response.data;
    } catch (error) {
      toast.error("Tempo expirado");
      destroyCookie(null, "psi-token");
      destroyCookie(null, "psi-refreshToken");
      router.push("/login");
    }
  });

  const {
    data: areas,
    isLoading: isLoadingAreas,
    refetch: refetchAreas,
  } = useQuery("graus", async () => {
    try {
      const response = await apiForm.getAllAreas();
      return response.data;
    } catch (error) {
      toast.error("Tempo expirado");
      destroyCookie(null, "psi-token");
      destroyCookie(null, "psi-refreshToken");
      router.push("/login");
    }
  });

  const {
    data: tipos,
    isLoading: isLoadingTipos,
    refetch: refetchTipos,
  } = useQuery("graus", async () => {
    try {
      const response = await apiForm.getAllTipos();
      return response.data;
    } catch (error) {
      toast.error("Tempo expirado");
      destroyCookie(null, "psi-token");
      destroyCookie(null, "psi-refreshToken");
      router.push("/login");
    }
  });
  const [tableData, setTableData] = useState<any>([
    {
      key: '0',
      grau:graus && graus[0].definicaoGrau,
      grauId: graus &&graus[0].id,
      area: areas && areas[0].definicaoArea,
      areaId:areas && areas[0].id,
      local: locais && locais[0].definicaoLocalForm,
      localId:locais && locais[0].id,
      tipo:  tipos && tipos[0].definicaoTipo,
      tipoId: tipos &&  tipos[0].id
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
    console.log("Editar", record);
    setSelectedRow(record);
    form.setFieldsValue({
      grau: record.grau,
      grauId: record.grauId,
      area: record.area,
      areaId: record.areaId,
      local: record.local,
      localId: record.localId,
      tipo: record.tipo,
      tipoId: record.tipoId
    });
    setModalVisible(true);
  };

  const saveUpdatedData = async () => {
    const { grauId, areaId, localId, tipoId } = form.getFieldsValue();
    const selectedId = selectedRow.key;
    console.log(form.getFieldsValue());
    try {
      await Promise.all([
        apiForm.updateGrau(grauId, form.getFieldValue('grau')),
        apiForm.updateArea(areaId, form.getFieldValue('area')),
        apiForm.updateLocal(localId, form.getFieldValue('local')),
        apiForm.updateTipo(tipoId, form.getFieldValue('tipo'))
      ]);
  
      // Atualizar os dados da tabela com os novos valores
     refetch();
     refetchAreas();
      refetchLocais();
      refetchTipos();
      setTableData((prev:any) =>
        prev.map((item: any) => {
          if (item.key === selectedId) {
            return {
              ...item,
              grau: form.getFieldValue('grau'),
              area: form.getFieldValue('area'),
              local: form.getFieldValue('local'),
              tipo: form.getFieldValue('tipo')
            };
          }
          return item;
        })
      );
    } catch (error) {
      console.error('Erro ao salvar os dados:', error);
    }
    finally {
      closeModal();
    }
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
          onChange={(value, option:any) => onTableSelectChange(record.key, 'grau', value, option.key)}
        >
          {graus?.map((grau:IGrau) => (
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
          onChange={(value, option:any) => onTableSelectChange(record.key, 'area', value, option.key)}
        >
          {areas?.map((area:IArea) => (
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
          onChange={(value, option:any) => onTableSelectChange(record.key, 'local', value, option.key)}
        >
          {locais?.map((local:ILocal) => (
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
          onChange={(value, option:any) => onTableSelectChange(record.key, 'tipo', value, option.key)}
        >
          {tipos?.map((tipo:ITipo) => (
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
  const onTableSelectChange = (key: string, field: string, value: string, id: number) => {
    const newData = tableData.map((item: any) => ({ ...item }));
    const index = newData.findIndex((item: { key: string }) => item.key === key);
    if (index > -1) {
      newData[index][field] = value;
      newData[index][`${field}Id`] = id; // Atualiza o ID correspondente ao campo
      setTableData(newData); // Atualiza o estado da tabela

      // Atualiza o valor do campo oculto com o ID correspondente
      form.setFieldsValue({
        ...form.getFieldsValue(),
        [`${field}Id`]: id
      });
    }
  };

  return (
    <Layout>
      <div className="flex w-full flex-col items-center pl-8 lg:items-start">
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
            className="w-[90%]"
            loading={isLoadingGraus && isLoadingLocais && isLoadingAreas && isLoadingTipos}
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
          <Button key="submit" type="primary" onClick={saveUpdatedData}>
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
          {/* Inputs hidden para armazenar os IDs */}
          <Form.Item name="grauId" style={{ display: 'none' }}>
            <Input type="hidden" />
          </Form.Item>
          <Form.Item name="areaId" style={{ display: 'none' }}>
            <Input type="hidden" />
          </Form.Item>
          <Form.Item name="localId" style={{ display: 'none' }}>
            <Input type="hidden" />
          </Form.Item>
          <Form.Item name="tipoId" style={{ display: 'none' }}>
            <Input type="hidden" />
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
