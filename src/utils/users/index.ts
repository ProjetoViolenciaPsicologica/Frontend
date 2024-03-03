import * as yup from "yup";

export const schema = yup.object().shape({
    nome: yup.string().required("Nome é obrigatório"),
    sobrenome: yup.string().required("Sobrenome é obrigatório"),
    email: yup.string().email("Email inválido").required("Email é obrigatório"),
    senha: yup.string().required("Senha é obrigatória"),
    senha_confirm: yup
      .string()
      .oneOf([yup.ref("senha"), ""], "As senhas devem coincidir")
      .required("Confirmação de senha é obrigatória"),
    tipo: yup.string().required("Tipo é obrigatório"),
    area: yup.string().required("Área de atuação é obrigatória"),
  });

