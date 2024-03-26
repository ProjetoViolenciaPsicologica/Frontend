import { Modal } from "antd";
import { toast } from "react-toastify";
import { api } from "@/services";
import { useState } from "react";

export type ModalDelete = {
  isModalDeleteOpen: boolean;
  setIsModalDeleteOpen: (params: boolean) => void;
  selectedUsers: number[];
  userId: number | undefined;
  refetch: any;
};

export default function Index({
  isModalDeleteOpen,
  setIsModalDeleteOpen,
  selectedUsers,
  userId,
  refetch,
}: ModalDelete) {
  const [Loading, setLoading] = useState(false);
  const deleteUser = async () => {
    setLoading(true);
    if (selectedUsers.length === 0) {
      try {
        await api.delete(`user/${userId}`);
        toast.success("Usuário excluído com sucesso!");
        setIsModalDeleteOpen(false);
        refetch();
      } catch (error) {
        toast.error("Erro ao excluir usuário.");
      } finally {
        setLoading(false);
      }
    } else {
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
        setIsModalDeleteOpen(false);
        toast.success("Todos os usuários foram excluídos com sucesso!");
        refetch();
      } else {
        // Mostrar notificação de erro
        toast.error("Ocorreu um erro ao excluir alguns usuários.");
      }
    }
  };

  function handleCancel() {
    setIsModalDeleteOpen(false);
  }

  return (
    <Modal
      title="Deletar Usuário"
      open={isModalDeleteOpen}
      okButtonProps={{
        loading: Loading,
        className: "bg-emerald-950 text-white",
      }} // Estilo para o botão "OK"
      cancelButtonProps={{ className: "bg-red-500 text-white" }}
      okText="Confirmar" // Texto para o botão "OK"
      cancelText="Cancelar" // Texto para o botão "Cancelar"
      onOk={deleteUser}
      onCancel={handleCancel}
    >
      <div>
        {selectedUsers.length > 1 &&
          `Tem certeza que deseja excluir esses usuários?`}
        {selectedUsers.length === 1 &&
          `Tem certeza que deseja excluir esse usuário?`}
        {userId &&
          selectedUsers.length === 0 &&
          "Tem certeza que deseja excluir esse usuário?"}
      </div>
    </Modal>
  );
}
