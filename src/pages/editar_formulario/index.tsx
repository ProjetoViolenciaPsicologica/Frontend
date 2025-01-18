import React, { useState } from "react";
import Layout from "@/components/Layout";
import { DM_Sans, Raleway } from "next/font/google";
import { Form, Button, Table, Modal, Input, Select } from "antd";
import apiForm from "@/pages/api";
import { parseCookies } from "nookies";
import { GetServerSideProps } from "next";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { TbPencil } from "react-icons/tb";
import { SlTrash } from "react-icons/sl";

const dm = DM_Sans({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});
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

interface IDelete {
  area: number[];
  grau: number[];
  local: number[];
  tipo: number[];
}

interface ICreate {
  area: string;
  grau: string;
  local: string;
  tipo: string;
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

const Index = () => {
  const [form] = Form.useForm();
  const [form1] = Form.useForm();
  const [form2] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [loadingCreate, setLoadingCreate] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalDeleteVisible, setModalDeleteVisible] = useState(false);
  const [modalCreateVisible, setModalCreateVisible] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const grausQuery = useQuery<IGrau[]>("graus", async () => {
    const response = await apiForm.getAllGrau();
    return response.data;
  });

  const locaisQuery = useQuery<ILocal[]>("locais", async () => {
    const response = await apiForm.getAllLocal();
    return response.data;
  });

  const areasQuery = useQuery<IArea[]>("areas", async () => {
    const response = await apiForm.getAllArea();
    return response.data;
  });

  const tiposQuery = useQuery<ITipo[]>("tipos", async () => {
    const response = await apiForm.getAllTipo();
    return response.data;
  });

  const { data: graus, isLoading: loadingGrau } = grausQuery;
  const { data: locais, isLoading: loadingLocal } = locaisQuery;
  const { data: areas, isLoading: loadingArea } = areasQuery;
  const { data: tipos, isLoading: loadingTipo } = tiposQuery;
  const theadClass: any = "bg-gray-800 text-white font-bold";
  const [tableData, setTableData] = useState<any>([
    {
      key: "0",
      grau: graus && graus[0].definicaoGrau,
      grauId: graus && graus[0].id,
      area: areas && areas[0].definicaoArea,
      areaId: areas && areas[0].id,
      local: locais && locais[0].definicaoLocalForm,
      localId: locais && locais[0].id,
      tipo: tipos && tipos[0].definicaoTipo,
      tipoId: tipos && tipos[0].id,
    },
  ]);

  // Função para confirmar exclusão
  const showConfirm = (record: any) => {
    setSelectedIds([
      record.grauId,
      record.areaId,
      record.localId,
      record.tipoId,
    ]);
    setModalDeleteVisible(true);
  };

  // Função para excluir os dados
  const deleteData = async (values: IDelete) => {
    setLoading(true);
    try {
      // Verifica se há algum item selecionado para exclusão
      if (
        (values?.grau && values.grau.length > 0) ||
        (values?.area && values.area.length > 0) ||
        (values?.local && values.local.length > 0) ||
        (values?.tipo && values.tipo.length > 0)
      ) {
        // Deleta os itens selecionados, se houver
        if (values?.grau?.length > 0) {
          await apiForm.deleteGrau(values.grau);
        }
        if (values?.area?.length > 0) {
          await apiForm.deleteArea(values.area);
        }
        if (values?.local?.length > 0) {
          await apiForm.deleteLocal(values.local);
        }
        if (values?.tipo?.length > 0) {
          await apiForm.deleteTipo(values.tipo);
        }

        // Após a exclusão bem-sucedida, atualiza os dados na tabela e refaz as consultas
        await Promise.all([
          grausQuery.refetch(),
          locaisQuery.refetch(),
          areasQuery.refetch(),
          tiposQuery.refetch(),
        ]);
        toast.success("Dados excluídos com sucesso!");
        form1.resetFields();
      } else {
        toast.error("Selecione ao menos um item para excluir");
        throw new Error("Selecione ao menos um item para excluir");
      }
    } catch (error: any) {
      console.error("Erro ao excluir os dados:", error.message);
      toast.error("Erro ao excluir os dados. Por favor, tente novamente.");
      form1.resetFields();
    } finally {
      setLoading(false);
      setModalDeleteVisible(false);
    }
  };

  // Função para abrir o modal de edição
  const openEditModal = (record: any) => {
    setSelectedRow(record);
    form.setFieldsValue({
      grau: record.grau,
      grauId: record.grauId,
      area: record.area,
      areaId: record.areaId,
      local: record.local,
      localId: record.localId,
      tipo: record.tipo,
      tipoId: record.tipoId,
    });
    setModalVisible(true);
  };

  const saveUpdatedData = async () => {
    const { grauId, areaId, localId, tipoId } = form.getFieldsValue();
    const selectedId = selectedRow.key;
    setLoading(true);
    try {
      await Promise.all([
        apiForm.updateGrau(grauId, form.getFieldValue("grau")),
        apiForm.updateArea(areaId, form.getFieldValue("area")),
        apiForm.updateLocal(localId, form.getFieldValue("local")),
        apiForm.updateTipo(tipoId, form.getFieldValue("tipo")),
      ]);
      setTableData((prev: any) =>
        prev.map((item: any) => {
          if (item.key === selectedId) {
            return {
              ...item,
              grau: form.getFieldValue("grau"),
              area: form.getFieldValue("area"),
              local: form.getFieldValue("local"),
              tipo: form.getFieldValue("tipo"),
            };
          }
          return item;
        })
      );
      toast.success("Dados atualizados com sucesso!");
      await Promise.all([
        grausQuery.refetch(),
        locaisQuery.refetch(),
        areasQuery.refetch(),
        tiposQuery.refetch(),
      ]);
      form.resetFields();
    } catch (error) {
      console.error("Erro ao salvar os dados:", error);
    } finally {
      setLoading(false);
      closeModal();
    }
  };

  const createData = async (values: ICreate) => {
    setLoadingCreate(true);
    try {
      if (values.grau) {
        await apiForm.createGrau(values.grau);
      }
      if (values.area) {
        await apiForm.createArea(values.area);
      }
      if (values.local) {
        await apiForm.createLocal(values.local);
      }
      if (values.tipo) {
        await apiForm.createTipo(values.tipo);
      }
      await Promise.all([
        grausQuery.refetch(),
        locaisQuery.refetch(),
        areasQuery.refetch(),
        tiposQuery.refetch(),
      ]);
      toast.success("Dados criados com sucesso!");
      form2.resetFields();
    } catch (error) {
      console.error("Erro ao criar os dados:", error);
      toast.error("Erro ao criar os dados. Por favor, tente novamente.");
    } finally {
      setLoadingCreate(false);
      setModalCreateVisible(false);
    }
  };
  const closeModal = () => {
    setSelectedRow(null);
    setModalVisible(false);
  };

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
          placeholder="Selecione um grau"
          onChange={(value, option: any) =>
            onTableSelectChange(record.key, "grau", value, option.key)
          }
        >
          {graus?.map((grau: IGrau) => (
            <Select.Option key={grau.id} value={grau.definicaoGrau}>
              {grau.definicaoGrau}
            </Select.Option>
          ))}
        </Select>
      ),
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
          placeholder="Selecione uma área"
          onChange={(value, option: any) =>
            onTableSelectChange(record.key, "area", value, option.key)
          }
        >
          {areas?.map((area: IArea) => (
            <Select.Option key={area.id} value={area.definicaoArea}>
              {area.definicaoArea}
            </Select.Option>
          ))}
        </Select>
      ),
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
          placeholder="Selecione um local"
          onChange={(value, option: any) =>
            onTableSelectChange(record.key, "local", value, option.key)
          }
        >
          {locais?.map((local: ILocal) => (
            <Select.Option key={local.id} value={local.definicaoLocalForm}>
              {local.definicaoLocalForm}
            </Select.Option>
          ))}
        </Select>
      ),
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
          placeholder="Selecione um tipo"
          onChange={(value, option: any) =>
            onTableSelectChange(record.key, "tipo", value, option.key)
          }
        >
          {tipos?.map((tipo: ITipo) => (
            <Select.Option key={tipo.id} value={tipo.definicaoTipo}>
              {tipo.definicaoTipo}
            </Select.Option>
          ))}
        </Select>
      ),
    },
    {
      title: "Ações",
      key: "action",
      render: (text: any, record: any) => (
        <div className="flex gap-x-4 bg-gray-900">
          <TbPencil
            className="w-5 h-[22px] text-[#616161] hover:cursor-pointer"
            onClick={() => openEditModal(record)}
          />
          <SlTrash
            className="w-5 h-[22px] text-[#616161] hover:cursor-pointer"
            onClick={() => showConfirm(record)}
          />
        </div>
      ),
    },
  ];

  const onTableSelectChange = (
    key: string,
    field: string,
    value: string,
    id: number
  ) => {
    const newData = tableData.map((item: any) => ({ ...item }));
    const index = newData.findIndex(
      (item: { key: string }) => item.key === key
    );
    if (index > -1) {
      newData[index][field] = value;
      newData[index][`${field}Id`] = id;
      setTableData(newData);
      form.setFieldsValue({
        ...form.getFieldsValue(),
        [`${field}Id`]: id,
      });
    }
  };

  return (
    <Layout title="QUESTIONÁRIO" description="Gerenciamento de informações de um questionário e aplicador">
      <div className="flex h-full w-full flex-col items-center pl-4 lg:items-start">
        <div className="w-full flex md:justify-end mt-8 pr-4 ">
          <button
            className={`w-[197px] h-14 bg-emerald-950 rounded-md shadow text-white text-base font-normal ${dm.className}`}
            onClick={() => setModalCreateVisible(true)}
          >
            ADICIONAR INFORMAÇÕES
          </button>
        </div>

        <Table
          columns={columns}
          dataSource={tableData}
          pagination={false}
          rowKey="id"
          className="table-auto h-full z-0 mt-2 w-full"
          scroll={{ x: true }}
          loading={loadingGrau || loadingLocal || loadingArea || loadingTipo}
        />
      </div>
      <Modal
        title="Criar Informações"
        visible={modalCreateVisible}
        onCancel={() => setModalCreateVisible(false)}
        footer={false}
      >
        <Form form={form2} layout="vertical" onFinish={createData}>
          <Form.Item label="Grau de Instrução" name="grau">
            <Input placeholder="Digite o Grau de Instrução" />
          </Form.Item>
          <Form.Item label="Área" name="area">
            <Input placeholder="Digite a Área" />
          </Form.Item>
          <Form.Item label="Local da Aplicação" name="local">
            <Input placeholder="Digite o Local da Aplicação" />
          </Form.Item>
          <Form.Item label="Tipo de Aplicador" name="tipo">
            <Input placeholder="Digite o Tipo de Aplicador" />
          </Form.Item>
          <div className="flex w-full md:justify-end">
            <Button
              onClick={() => setModalCreateVisible(false)}
              className="bg-red-500 shadow text-white"
            >
              Cancelar
            </Button>
            ,
            <Button
              htmlType="submit"
              loading={loadingCreate}
              type="default"
              className="bg-emerald-950 shadow text-white"
            >
              Criar
            </Button>
          </div>
        </Form>
      </Modal>
      <Modal
        title="Editar Informações"
        visible={modalVisible}
        onCancel={closeModal}
        footer={[
          <Button
            key="cancel"
            onClick={closeModal}
            className="bg-red-500 shadow text-white"
          >
            Cancelar
          </Button>,
          <Button
            key="submit"
            loading={loading}
            type="default"
            onClick={saveUpdatedData}
            className="bg-emerald-950 shadow text-white"
          >
            Salvar
          </Button>,
        ]}
      >
        <Form form={form} layout="vertical">
          <Form.Item label="Grau de Instrução" name="grau">
            <Input placeholder="Digite o Grau de Instrução" />
          </Form.Item>
          <Form.Item label="Área" name="area">
            <Input placeholder="Digite a Área" />
          </Form.Item>
          <Form.Item label="Local da Aplicação" name="local">
            <Input placeholder="Digite o Local da Aplicação" />
          </Form.Item>
          <Form.Item label="Tipo de Aplicador" name="tipo">
            <Input placeholder="Digite o Tipo de Aplicador" />
          </Form.Item>
          <Form.Item name="grauId" style={{ display: "none" }}>
            <Input type="hidden" />
          </Form.Item>
          <Form.Item name="areaId" style={{ display: "none" }}>
            <Input type="hidden" />
          </Form.Item>
          <Form.Item name="localId" style={{ display: "none" }}>
            <Input type="hidden" />
          </Form.Item>
          <Form.Item name="tipoId" style={{ display: "none" }}>
            <Input type="hidden" />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Excluir Informações"
        visible={modalDeleteVisible}
        onCancel={() => setModalDeleteVisible(false)}
        footer={false}
      >
        <Form form={form1} layout="vertical" onFinish={deleteData}>
          <Form.Item label="Grau de Instrução" name="grau">
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Selecione um ou mais graus"
            >
              {graus?.map((grau: IGrau) => (
                <Select.Option key={grau.id} value={grau.id}>
                  {grau.definicaoGrau}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Área" name="area">
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Selecione uma ou mais áreas"
            >
              {areas?.map((area: IArea) => (
                <Select.Option key={area.id} value={area.id}>
                  {area.definicaoArea}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Local da Aplicação" name="local">
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Selecione um ou mais locais"
            >
              {locais?.map((local: ILocal) => (
                <Select.Option key={local.id} value={local.id}>
                  {local.definicaoLocalForm}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="Tipo de Aplicador" name="tipo">
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Selecione um ou mais tipos"
            >
              {tipos?.map((tipo: ITipo) => (
                <Select.Option key={tipo.id} value={tipo.id}>
                  {tipo.definicaoTipo}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <div className="flex w-full justify-end">
            <Button
              onClick={() => setModalDeleteVisible(false)}
              className="bg-red-500 shadow text-white"
            >
              Cancelar
            </Button>
            ,
            <Button
              htmlType="submit"
              loading={loading}
              type="default"
              className="bg-emerald-950 shadow text-white"
            >
              Excluir
            </Button>
          </div>
        </Form>
      </Modal>
    </Layout>
  );
};

export default Index;

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = parseCookies({ req });
  const token = cookies["psi-token"];
  const isAuthenticated = !!token;
  if (!isAuthenticated) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }
  return { props: {} };
};
