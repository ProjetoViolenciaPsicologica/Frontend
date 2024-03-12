import Layout from "@/components/Layout";
import { Raleway } from "next/font/google";
import { FaSearch } from "react-icons/fa";
import { TbPencil } from "react-icons/tb";
import { SlTrash } from "react-icons/sl";
import { api } from "@/services";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { schema } from "@/utils/users";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import { GetServerSideProps } from "next";
import { parseCookies } from 'nookies';
import {
  Button,
  Checkbox,
  Form,
  Input,
  Modal,
  Select,
  Table,
  Spin,
  Pagination,
} from "antd";
import ModalUserDelete from "@/components/ModalUserDelete";
const raleway = Raleway({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

export interface EditType {
  id: number;
  email: string;
  name: string;
  tipo: Tipo;
  area: Area;
}

export interface Tipo {
  id: number;
  definicaoTipo: string;
}

export interface Area {
  id: number;
  definicaoArea: string;
}

export default function Index() {
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery("user", async () => {
    const response = await api.get("user");
    return response.data;
  });
  const [form] = Form.useForm(); // Extrai a referência do form

  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalEditOpen, setIsModalEditOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [userId, setUserId] = useState<number>();
  console.log(selectedUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const toggleUserSelection = (userId: number) => {
    const isSelected = selectedUsers.includes(userId);
    if (isSelected) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const toggleSelectAll = () => {
    setSelectAll(!selectAll);
    if (!selectAll) {
      const allUserIds = users.map((user: any) => user.id);
      setSelectedUsers(allUserIds);
    } else {
      setSelectedUsers([]);
    }
  };

  const deleteUser = async (id: number) => {
    setIsModalDeleteOpen(true);
    setUserId(id);
  };

  const editUser = async (id: number) => {
    try {
      const response = await api.get(`user/${id}`);
      const user = response.data;
      setIsEditMode(true);
      setUserId(id);
      form.setFieldsValue({
        nome: user.name.split(" ")[0],
        sobrenome: user.name.split(" ").slice(1).join(" "),
        email: user.email,
        tipo: user.tipo?.definicaoTipo,
        area: user.area?.definicaoArea,
      });
      setIsModalEditOpen(true);
    } catch (error) {
      toast.error("Erro ao buscar usuário.");
    }
  };

  const handleCancelEdit = () => {
    setIsModalEditOpen(false);
    setIsEditMode(false);
    setUserId(undefined);
    form.resetFields();
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const dataUser = {
        email: data.email,
        name: `${data.nome} ${data.sobrenome}`,
        password: data.senha,
        tipo: { definicaoTipo: data.tipo },
        area: { definicaoArea: data.area },
      };
      if (userId) {
        await api.put(`user/${userId}`, dataUser);
        toast.success("Usuário editado com sucesso!");
      } else {
        await api.post("user/register", dataUser);
        toast.success("Usuário criado com sucesso!");
      }
      setIsModalOpen(false);
      setIsModalEditOpen(false);
      setIsEditMode(false);
      setUserId(undefined);
      setLoading(false);
      refetch();
      form.resetFields();
    } catch (error) {
      toast.error(`Erro ao ${isEditMode ? "editar" : "criar"} usuário.`);
    } finally {
      setLoading(false);
    }
  };
  const mappedData = users?.map((item: any) => ({
    id: item.id,
    nome: item.name.split(" ")[0], // Obtendo o primeiro nome
    sobrenome: item.name.split(" ").slice(1).join(" "), // Obtendo o sobrenome
    email: item.email,
    tipo: item.tipo?.definicaoTipo,
  }));

  const filteredData = mappedData?.filter((user: any) => {
    return (
      user.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.sobrenome.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.tipo && user.tipo.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Calcula o índice do último usuário na página atual
  const indexOfLastUser = currentPage * usersPerPage;
  // Calcula o índice do primeiro usuário na página atual
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  // Seleciona apenas os usuários da página atual
  const currentUsers = filteredData?.slice(indexOfFirstUser, indexOfLastUser);

  // Calcula o número total de páginas
  const totalPages = Math.ceil(filteredData?.length / usersPerPage);

  // Função para alterar a página
  const onChangePage = (page: number) => {
    setCurrentPage(page);
  };

  const deleteUsers = async () => {
    if (selectedUsers.length === 0) {
      toast.error("Escolha pelo menos 1 usuário para excluir");
    } else {
      setIsModalDeleteOpen(true);
    }
  };

  const columns = [
    {
      title: (
        <div className="flex items-center">
          <Checkbox onChange={toggleSelectAll} checked={selectAll} />
          <button
            type="button"
            onClick={() => deleteUsers()}
            className="w-[98px] h-[28.62px] bg-emerald-950 rounded-[32px] text-white text-base font-normal font-['DM Sans'] ml-4 flex items-center justify-center"
          >
            DELETAR
          </button>
        </div>
      ),
      key: "checkbox",
      render: (text: any, record: any) => (
        <Checkbox
          onChange={() => toggleUserSelection(record.id)}
          checked={selectedUsers.includes(record.id)}
        />
      ),
    },
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "Sobrenome",
      dataIndex: "sobrenome",
      key: "sobrenome",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Tipo",
      dataIndex: "tipo",
      key: "tipo",
    },
    {
      title: "Ações",
      dataIndex: "actions",
      key: "actions",
      render: (text: any, record: any) => (
        <div className="flex gap-x-4">
          <TbPencil
            className="w-5 h-[22px] text-[#616161] hover:cursor-pointer"
            onClick={() => editUser(record.id)}
          />
          <SlTrash
            className="w-5 h-[22px] text-[#616161] hover:cursor-pointer"
            onClick={() => deleteUser(record.id)}
          />
        </div>
      ),
    },
  ];

  const handleTableChange = (pagination: any, filters: any, sorter: any) => {
    setCurrentPage(pagination.current);
    // Verifica se há filtro no campo de pesquisa
    if (filters && filters.nome) {
      setSearchTerm(filters.nome[0]);
    } else {
      setSearchTerm("");
    }
  };

  return (
    <Layout>
      <div className="flex bg-[#F6FBF9] h-screen w-full flex-col items-center pl-4 lg:items-start lg:pl-12">
        <div className="mt-4 flex flex-col w-full  md:mt-4">
          <h1 className={`${raleway.className} text-3xl font-normal `}>
            USUÁRIOS
          </h1>
          <span
            className={`${raleway.className} w-[256px] mt-4 text-black text-sm font-normal leading-tight`}
          >
            Gerenciamento de usuários cadastrados no sistema
          </span>
        </div>

        <div className="flex flex-col md:flex-row w-full justify-center md:justify-between my-9 pr-5 gap-6 md:my-0 md:mt-9">
          <div className="relative">
            <button
              type="button"
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
            >
              <FaSearch />
            </button>
            <input
              type="text"
              placeholder="Pesquisa..."
              className="w-[212px] h-[37px] bg-white rounded-lg border border-neutral-200 pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button
            className="w-[197px] h-10 bg-emerald-950 shadow text-white text-base font-normal font-['DM Sans'] "
            onClick={() => showModal()}
          >
            ADICIONAR USUÁRIO
          </button>
        </div>
        {isLoading ? (
          <div className="h-full w-full flex items-center justify-center">
            <Spin size="large" />
          </div>
        ) : (
          <>
            <Table
              columns={columns}
              dataSource={currentUsers}
              pagination={false} // Desabilitar a paginação dentro do componente Table
              onChange={handleTableChange}
              rowKey="id"
              className="table-auto divide-y divide-gray-200 even:bg-d9d9d9 odd:bg-aeaeae mt-2 w-full"
              scroll={{ x: true }}
            />
          </>
        )}
        <Pagination
          current={currentPage}
          total={filteredData?.length}
          pageSize={usersPerPage}
          onChange={onChangePage}
          style={{ marginTop: "1rem", textAlign: "center" }}
        />
      </div>
      <Modal
        title="Adicionar Usuário"
        visible={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} onFinish={onSubmit} layout="vertical">
          <Form.Item
            label="Nome"
            name="nome"
            rules={[{ required: true, message: "Por favor, insira o nome" }]}
          >
            <Input placeholder="Digite seu nome" />
          </Form.Item>
          <Form.Item
            label="Sobrenome"
            name="sobrenome"
            rules={[
              { required: true, message: "Por favor, insira o sobrenome" },
            ]}
          >
            <Input placeholder="Digite sua idade" />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Por favor, insira o email" },
              { type: "email", message: "Email inválido" },
            ]}
          >
            <Input placeholder="Digite seu email" />
          </Form.Item>
          <Form.Item
            label="Senha"
            name="senha"
            rules={[
              { required: true, message: "Por favor, insira a senha" },
              {
                type: "string",
                min: 6,
                message: "Senha deve ter no mínimo 6 caracteres",
              },
            ]}
          >
            <Input.Password placeholder="Digite sua senha" />
          </Form.Item>
          <Form.Item
            label="Confirmação de Senha"
            name="senha_confirm"
            rules={[
              { required: true, message: "Por favor, confirme a senha" },
              {
                type: "string",
                min: 6,
                message: "Senha deve ter no mínimo 6 caracteres",
              },
            ]}
          >
            <Input.Password placeholder="Digite sua senha novamente" />
          </Form.Item>
          <Form.Item
            label="Tipo"
            name="tipo"
            rules={[{ required: true, message: "Por favor, selecione o tipo" }]}
          >
            <Select>
              <Select.Option value="Agente de Saude">
                Agente de Saúde
              </Select.Option>
              <Select.Option value="Policia">Policia</Select.Option>
              <Select.Option value="professor">Professor</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Área"
            name="area"
            rules={[{ required: true, message: "Por favor, selecione a área" }]}
          >
            <Select>
              <Select.Option value="Saúde">Saúde</Select.Option>
              <Select.Option value="Educação">Educação</Select.Option>
              <Select.Option value="Segurança">Segurança</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              className="bg-emerald-950 shadow text-white"
              htmlType="submit"
              loading={loading}
            >
              Adicionar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      {/* Modal de edição */}
      <Modal
        title="Editar Usuário"
        visible={isModalEditOpen}
        onCancel={handleCancelEdit}
        footer={null}
      >
        <Form form={form} onFinish={onSubmit} layout="vertical">
          <Form.Item
            label="Nome"
            name="nome"
            rules={[{ required: true, message: "Por favor, insira o nome" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Sobrenome"
            name="sobrenome"
            rules={[
              { required: true, message: "Por favor, insira o sobrenome" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              { required: true, message: "Por favor, insira o email" },
              { type: "email", message: "Email inválido" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Tipo"
            name="tipo"
            rules={[{ required: true, message: "Por favor, selecione o tipo" }]}
          >
           <Select
                  placeholder="---------"
                  className="text-black font-bold text-lg"
                >
              <Select.Option value="Agente de Saude">
                Agente de Saúde
              </Select.Option>
              <Select.Option value="Policia">Policia</Select.Option>
              <Select.Option value="professor">Professor</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Área"
            name="area"
            rules={[{ required: true, message: "Por favor, selecione a área" }]}
          >
           <Select
                  placeholder="---------"
                  className="text-black font-bold text-lg"
                >
              <Select.Option value="Saúde">Saúde</Select.Option>
              <Select.Option value="Educação">Educação</Select.Option>
              <Select.Option value="Segurança">Segurança</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item>
            <Button
              htmlType="submit"
              className="bg-emerald-950 shadow text-white"
              loading={loading}
            >
              Editar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <ModalUserDelete
        isModalDeleteOpen={isModalDeleteOpen}
        setIsModalDeleteOpen={setIsModalDeleteOpen}
        userId={userId}
        selectedUsers={selectedUsers}
        refetch={refetch}
      />
    </Layout>
  );
}


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

  return {
    props: {
      users:"users",
    },
  };
};
