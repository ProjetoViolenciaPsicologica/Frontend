import Layout from "@/components/Layout";
import { Raleway } from "next/font/google";
import { FaSearch } from "react-icons/fa";
import { TbPencil } from "react-icons/tb";
import { SlTrash } from "react-icons/sl";
import { api } from "@/services";
import { GetServerSideProps } from "next";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { schema } from "@/utils/users";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQuery } from "react-query";
import Loading from "@/components/Loading";
import { toast } from "react-toastify";

const raleway = Raleway({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

export default function Index() {
  const { data: users, isLoading, refetch } = useQuery("user", async () => {
    const response = await api.get("user");
    return response.data;
  });

  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [userEdit, setUserEdit] = useState<any>({});
  const [userId, setUserId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 6;
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
  });

  const showModal = (editMode = false) => {
    setIsModalOpen(true);
    setIsEditMode(editMode);
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
    try {
      const response = await api.delete(`user/${id}`);
      toast.success("Usuário excluído com sucesso!");
      refetch();
    } catch (error) {
      toast.error("Erro ao excluir usuário.");
    }
  };

  const editUser = (id: number) => {
    const user = filteredData.find((user: any) => user.id === id);
    setUserEdit(user);
    setIsEditMode(true);
    showModal(true); // Abrir o modal no modo de edição
  };

  const onSubmit = async (data: any) => {
    const dataUser = {
      email: data.email,
      name: `${data.nome} ${data.sobrenome}`,
      password: data.senha,
      tipo: { definicaoTipo: data.tipo },
      area: { definicaoArea: data.area },
    };
    try {
      if (isEditMode) {
        // Modo de edição
        const response = await api.put(`user/${userId}`, dataUser);
        toast.success("Usuário editado com sucesso!");
      } else {
        // Modo de criação
        const response = await api.post("user/register", dataUser);
        toast.success("Usuário criado com sucesso!");
      }
      setIsModalOpen(false); // Fechar o modal
      refetch(); // Refetch dos usuários
    } catch (error) {
      toast.error(`Erro ao ${isEditMode ? "editar" : "criar"} usuário.`);
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

  // Função para avançar para a próxima página
  const nextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  // Função para retroceder para a página anterior
  const prevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Renderiza os números das páginas e os controles de navegação
  const renderPagination = () => {
    const pageNumbers = [];
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`${
            currentPage === i ? "bg-blue-500 text-white" : "text-blue-500"
          }`}
        >
          {i}
        </button>
      );
    }
    return (
      <div className="flex justify-center items-center space-x-4 mt-4">
  <button 
    onClick={prevPage} 
    disabled={currentPage === 1}
    className={`px-4 py-2 rounded-md bg-blue-500 text-white ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
  >
    Anterior
  </button>
  {pageNumbers}
  <button 
    onClick={nextPage} 
    disabled={currentPage === totalPages}
    className={`px-4 py-2 rounded-md bg-blue-500 text-white ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'}`}
  >
    Próxima
  </button>
</div>

    );
  };

  const deleteUsers = async () => {
    const deletionPromises = selectedUsers.map(async (userId) => {
      try {
        await api.delete(`user/${userId}`);
        return { success: true };
      } catch (error) {
        return { success: false, error };
      }
    });

    const results = await Promise.all(deletionPromises);

    const allDeleted = results.every((result) => result.success);

    if (allDeleted) {
      // Mostrar notificação de sucesso
      toast.success("Todos os usuários foram excluídos com sucesso!")
      refetch();
    } else {
      // Mostrar notificação de erro
      toast.error("Ocorreu um erro ao excluir alguns usuários.");
    }
  };

  return (
    <Layout>
      <div className="flex h-screen w-full flex-col items-center pl-4 lg:items-start lg:pl-12 bg-[F6FBF9]">
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
          <Loading />
        ) : (
          <div className="flex flex-col md:w-full mt-2 ">
            <div
              className="h-[49px] w-full overflow-x-scroll md:overflow-x-auto bg-zinc-300 grid grid-cols-6 pl-7
            "
            >
              <div className="flex items-center ">
                <input
                  type="checkbox"
                  className="w-6 h-6 mr-10"
                  onChange={toggleSelectAll}
                  checked={selectAll}
                />
                <button className="w-[98px] h-[28.62px] bg-emerald-950 rounded-[32px] text-white text-base font-normal font-['DM Sans']" onClick={() => deleteUsers()}>
                  DELETAR
                </button>
              </div>
              <div className="flex items-center">
                <span className="text-black text-base font-normal font-['Inter']">
                  NOME
                </span>
              </div>
              <div className="flex items-center ">
                <span className="text-black text-base font-normal font-['Inter']">
                  SOBRENOME
                </span>
              </div>
              <div className="flex items-center ">
                <span className="text-black text-base font-normal font-['Inter']">
                  EMAIL
                </span>
              </div>
              <div className="flex items-center ">
                <span className="text-black text-base font-normal font-['Inter']">
                  TIPO
                </span>
              </div>
              <div className="flex items-center ">
                <span className="text-black text-base font-normal font-['Inter']"></span>
              </div>
            </div>
            {currentUsers?.map((user: any, i: number) => (
              <div
                key={i}
                className={`h-[49px] bg-zinc-300 grid grid-cols-6 overflow-x-hidden pl-7 ${
                  i % 2 == 0 && "bg-opacity-20"
                }`}
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="w-6 h-6 mr-10"
                    onChange={() => toggleUserSelection(user.id)}
                    checked={selectedUsers.includes(user.id)}
                  />
                </div>
                <div className="flex items-center ">
                  <span className="text-black text-base font-normal font-['Inter']">
                    {user.nome}
                  </span>
                </div>
                <div className="flex items-center ">
                  <span className="text-black text-base font-normal font-['Inter']">
                    {user.sobrenome}
                  </span>
                </div>
                <div className="flex items-center overflow-x-auto">
                  <span className="text-black text-base font-normal font-['Inter']">
                    {user.email}
                  </span>
                </div>
                <div className="flex items-center ">
                  <span className="text-black text-base font-normal font-['Inter']">
                    {user.tipo}
                  </span>
                </div>
                <div className="flex items-center  gap-x-4">
                  <TbPencil
                    className="w-5 h-[22px] text-[#616161] hover:cursor-pointer"
                    onClick={() => editUser(user.id)}
                  />
                  <SlTrash
                    className="w-5 h-[22px] text-[#616161] hover:cursor-pointer"
                    onClick={() => deleteUser(user.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
        {renderPagination()}
      </div>
      <div
        className={`${
          isModalOpen ? "flex" : "hidden"
        } fixed top-0 left-0 w-full h-full bg-black bg-opacity-60 justify-center items-center transition-opacity duration-300`}
      >
        <div className="bg-white h-[90vh] rounded-lg w-[500px] flex flex-col justify-center items-center p-8 transition-transform duration-300">
          <div className="flex justify-between w-full mb-4">
            <h2 className="text-xl font-bold">
              {isEditMode ? "Editar Usuário" : "Adicionar Usuário"}
            </h2>
            <button
              className="text-gray-600 hover:text-gray-800 transition duration-300"
              onClick={handleCancel}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>{" "}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full h-full overflow-y-auto"
          >
            <div className="mb-4">
              <label
                htmlFor="nome"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Nome
              </label>
              <input
                type="text"
                id="nome"
                defaultValue={isEditMode ? userEdit.nome : ""}
                placeholder="Digite seu nome"
                {...register("nome")}
                className="w-full h-[38px] bg-white rounded-[10px] shadow border border-black border-opacity-10 pl-4"
              />
              {errors.nome && (
                <p className="text-red-500 text-xs italic">
                  {errors.nome.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="sobrenome"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Sobrenome
              </label>
              <input
                type="text"
                id="sobrenome"
                defaultValue={isEditMode ? userEdit.sobrenome : ""}
                placeholder="Digite seu sobrenome"
                {...register("sobrenome")}
                className="w-full h-[38px] bg-white rounded-[10px] shadow border border-black border-opacity-10 pl-4"
              />
              {errors.sobrenome && (
                <p className="text-red-500 text-xs italic">
                  {errors.sobrenome.message}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Email
              </label>
              <input
                type="text"
                placeholder="Digite seu email"
                id="email"
                defaultValue={isEditMode ? userEdit.email : ""}
                {...register("email")}
                className="w-full h-[38px] bg-white rounded-[10px] shadow border border-black border-opacity-10 pl-4"
              />
              {errors.email && (
                <p className="text-red-500 text-xs italic">
                  {errors.email.message}
                </p>
              )}
            </div>
            <div className="mb-4 flex flex-col md:flex-row">
              <div className="md:w-1/2 mr-2">
                <label
                  htmlFor="tipo"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Tipo de Usuário
                </label>
                <select
                  {...register("tipo")}
                  className="w-full h-[38px] bg-white rounded-[10px] shadow border border-black border-opacity-10 pl-4"
                >
                  <option value="Agente" className="">
                    Agente de Saúde
                  </option>
                </select>
                {errors.tipo && (
                  <p className="text-red-500 text-xs italic">
                    {errors.tipo.message}
                  </p>
                )}
              </div>
              <div className="md:w-1/2 ml-2">
                <label
                  htmlFor="area"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Área de Atuação
                </label>
                <select
                  {...register("area")}
                  className="w-full h-[38px] bg-white rounded-[10px] shadow border border-black border-opacity-10 pl-4"
                >
                  <option value="Saúde">Saúde</option>
                </select>
                {errors.area && (
                  <p className="text-red-500 text-xs italic">
                    {errors.area.message}
                  </p>
                )}
              </div>
            </div>

            {!isEditMode && (
              <>
                <div className="mb-4">
                  <label
                    htmlFor="senha"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Senha
                  </label>
                  <input
                    type="password"
                    placeholder="Digite sua senha"
                    id="senha"
                    {...register("senha")}
                    className="w-full h-[38px] bg-white rounded-[10px] shadow border border-black border-opacity-10 pl-4"
                  />
                  {errors.senha && (
                    <p className="text-red-500 text-xs italic ">
                      {errors.senha.message}
                    </p>
                  )}
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="senha_confirm"
                    className="block text-gray-700 text-sm font-bold mb-2"
                  >
                    Confirmar Senha
                  </label>
                  <input
                    type="password"
                    placeholder="Digite novamente sua senha"
                    id="senha_confirm"
                    {...register("senha_confirm")}
                    className="w-full h-[38px] bg-white rounded-[10px] shadow border border-black border-opacity-10 pl-4"
                  />
                  {errors.senha_confirm && (
                    <p className="text-red-500 text-xs italic">
                      {errors.senha_confirm.message}
                    </p>
                  )}
                </div>
              </>
            )}
            <div className="flex items-center justify-center">
              <button
                type="submit"
                className="w-[197px] h-10 bg-emerald-950 shadow text-white text-base font-normal font-['DM Sans']"
              >
                {isEditMode ? "Salvar Edições" : "Criar Usuário"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    props: {}, // will be passed to the page component as props
  };
};

