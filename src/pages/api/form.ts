import axios from "axios";
import {parseCookies} from "nookies";

const api_form:any = axios.create({
    baseURL: 'https://projpsi.pythonanywhere.com/api/psicoapp/',
    
});

api_form.interceptors.request.use((config:any) => {
    const cookies = parseCookies()
    const token =  cookies["psi-token"];
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

api_form.formQuantidade =  async () => {
    try {
        const response = await api_form.get("formulario/quantidade");
        return response
      } catch (error: any) {
        if (error?.response?.status === 401) {
            throw error
        }
      }
}
api_form.formPorMes =  async () => {
    try {
        const response = await api_form.get("formulario/porMes");
        return response
      } catch (error: any) {
        if (error?.response?.status === 401) {
            throw error
        }
      }
}


api_form.filtro =  async (params:any) => {
    try {
       const response = await api_form.get("formulario/filtro/", { params });
        return response
      } catch (error: any) {
        if (error?.response?.status === 401) {
            throw error
        }
      }
}



api_form.sinalizacao =  async (params:any) => {
    try {
      const response = await  api_form.get("formulario/sinalizacao", { params });
      return response
    } catch (error: any) {
        if (error?.response?.status === 401) {
            throw error
        }
    }
}

api_form.quantidadeRespostas =  async (params:any) => {
    try {
      const response = await  api_form.get("formulario/quantidadeRespostas", { params });
      return response
    } catch (error: any) {
        if (error?.response?.status === 401) {
            throw error
        }
    }
}

api_form.desvio = async (params:any) => {
    try {
        const response = await  api_form.get("desvio", { params });
        return response
      } catch (error: any) {
          if (error?.response?.status === 401) {
              throw error
          }
      }
}

api_form.dispersao = async (params:any) => {
    try {
        const response = await   await api_form.get("dispersao", { params });
        return response
      } catch (error: any) {
          if (error?.response?.status === 401) {
              throw error
          }
      }
}

api_form.getAllUsers = async () => {
    try {
        const response = await  api_form.get("user");
        return response
      } catch (error: any) {
          if (error?.response?.status === 401) {
              throw error
          }
      }
}

api_form.getUser = async (id:number) => {
    try {
        const response = await  api_form.get(`user/${id}`);
        return response
      } catch (error: any) {
          if (error?.response?.status === 401) {
              throw error
          }
      }
}


api_form.updateUser = async (id:number, dataUser:any) => {
    try {
        const response = await  api_form.put(`user/${id}`, dataUser);
        return response
      } catch (error: any) {
          if (error?.response?.status === 401) {
              throw error
          }
      }
}


api_form.createUser = async (dataUser:any) => {
    console.log(dataUser)
    try {
        const response = await  api_form.post("user/register", dataUser);
        return response
      } catch (error: any) {
          if (error?.response?.status === 401) {
              throw error
          }
      }
}

api_form.deleteUser = async (userId:number) => {
    try {
        const response = await  api_form.delete(`user/${userId}`);
        return response
      } catch (error: any) {
          if (error?.response?.status === 401) {
              throw error
          }
      }
}


api_form.password_reset = async (dataSubmit:{ senha: string;
    senha_confirm: string;}) => {
        try {
            const response = api_form.post("password_reset/confirm/", dataSubmit);
            return response
        } catch (error:any) {
            if (error?.response?.status === 401) {
                throw error
            }
        }
}

api_form.password_reset_submit_email = async (dataSubmit:{ email:string}) => {
        try {
            const response = api_form.post("password_reset/", dataSubmit);
            return response
        } catch (error:any) {
            if (error?.response?.status === 401) {
                throw error
            }
        }
}
export { api_form };