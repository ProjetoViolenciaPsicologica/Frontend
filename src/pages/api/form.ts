import axios from "axios";
import { parseCookies } from "nookies";

const api_form: any = axios.create({
  baseURL: "https://projpsi.pythonanywhere.com/api/psicoapp/",
});

api_form.interceptors.request.use((config: any) => {
  const cookies = parseCookies();
  const token = cookies["psi-token"];
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api_form.formQuantidade = async () => {
  try {
    const response = await api_form.get("formulario/quantidade");
    return response;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      throw error;
    }
  }
};
api_form.formPorMes = async () => {
  try {
    const response = await api_form.get("formulario/porMes");
    return response;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      throw error;
    }
  }
};

api_form.filtro = async (params: any) => {
  try {
    const response = await api_form.get("formulario/filtro/", { params });
    return response;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      throw error;
    }
  }
};

api_form.sinalizacao = async (params: any) => {
  try {
    const response = await api_form.get("formulario/sinalizacao", { params });
    return response;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      throw error;
    }
  }
};

api_form.quantidadeRespostas = async (params: any) => {
  try {
    const response = await api_form.get("formulario/quantidadeRespostas", {
      params,
    });
    return response;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      throw error;
    }
  }
};

api_form.GraficoFiltro = async (params: any) => {
  try {
    const response = await api_form.get("graficosPDF", {
      params,
    });
    return response;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      throw error;
    }
  }
};



api_form.desvio = async (params: any) => {
  try {
    const response = await api_form.get("desvio", { params });
    return response;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      throw error;
    }
  }
};

api_form.updateGrau = async (id: number, values: any) => {
  try {
    const response = await api_form.put(`grau/${id}`, {
      definicaoGrau: values,
    });
    return response;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      throw error;
    }
  }
};

api_form.deleteGrau = async (ids: number[]) => {
  try {
    if (ids.length === 1) {
      const response = await api_form.delete(`grau/${ids}`);
      return response;
    } else {
      const deletionPromises = ids.map(async (id) => {
        try {
          await api_form.delete(`grau/${id}`);
          return { success: true };
        } catch (error) {
          return { success: false, error };
        }
      });
      const results = await Promise.all(deletionPromises);
      const allDeleted = results.every((result) => result.success);
      if (allDeleted) {
        return { success: true };
      } else {
        return { success: false };
      }
    }
  } catch (error: any) {
    if (error?.response?.status === 401) {
      throw error;
    }
  }
};

api_form.createGrau = async (values: any) => {
  try {
    const response = await api_form.post("grau/create", {
      definicaoGrau: values,
    });
    return response;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      throw error;
    }
  }
};
api_form.createArea = async (values: any) => {
  try {
    const response = await api_form.post("area/create", {
      definicaoArea: values,
    });
    return response;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      throw error;
    }
  }
};
api_form.createTipo = async (values: any) => {
  try {
    const response = await api_form.post("tipo/create", {
      definicaoTipo: values,
    });
    return response;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      throw error;
    }
  }
};
api_form.createLocal = async (values: any) => {
  try {
    const response = await api_form.post("local/create", {
      definicaoLocalForm: values,
    });
    return response;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      throw error;
    }
  }
};
api_form.deleteArea = async (ids: number[]) => {
  try {
    if (ids.length === 1) {
      const response = await api_form.delete(`area/${ids}`);
      return response;
    } else {
      const deletionPromises = ids.map(async (id) => {
        try {
          await api_form.delete(`area/${id}`);
          return { success: true };
        } catch (error) {
          return { success: false, error };
        }
      });
      const results = await Promise.all(deletionPromises);
      const allDeleted = results.every((result) => result.success);
      if (allDeleted) {
        return { success: true };
      } else {
        return { success: false };
      }
    }
  } catch (error: any) {
    if (error?.response?.status === 401) {
      throw error;
    }
  }
};

api_form.deleteLocal = async (ids: number[]) => {
  try {
    if (ids.length === 1) {
      const response = await api_form.delete(`local/${ids}`);
      return response;
    } else {
      const deletionPromises = ids.map(async (id) => {
        try {
          await api_form.delete(`local/${id}`);
          return { success: true };
        } catch (error) {
          return { success: false, error };
        }
      });
      const results = await Promise.all(deletionPromises);
      const allDeleted = results.every((result) => result.success);
      if (allDeleted) {
        return { success: true };
      } else {
        return { success: false };
      }
    }
  } catch (error: any) {
    if (error?.response?.status === 401) {
      throw error;
    }
  }
};

api_form.createDataUser = async (data:any) => {
  try {
    const response = await api_form.post("/formulario/novo", data);
    return response;
  } catch (error: any) {
  
      throw error;
    
  }
};

api_form.deleteTipo = async (ids: number[]) => {
  try {
    if (ids.length === 1) {
      const response = await api_form.delete(`tipo/${ids}`);
      return response;
    } else {
      const deletionPromises = ids.map(async (id) => {
        try {
          await api_form.delete(`tipo/${id}`);
          return { success: true };
        } catch (error) {
          return { success: false, error };
        }
      });
      const results = await Promise.all(deletionPromises);
      const allDeleted = results.every((result) => result.success);
      if (allDeleted) {
        return { success: true };
      } else {
        return { success: false };
      }
    }
  } catch (error: any) {
    if (error?.response?.status === 401) {
      throw error;
    }
  }
};

api_form.getAllGrau = async () => {
  try {
    const response = await api_form.get("grau");
    return response;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      throw error;
    }
  }
};

api_form.getAllArea = async () => {
  try {
    const response = await api_form.get("area");
    return response;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      throw error;
    }
  }
};
api_form.getAllTipo = async () => {
  try {
    const response = await api_form.get("tipo");
    return response;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      throw error;
    }
  }
};

api_form.getAllLocal = async () => {
  try {
    const response = await api_form.get("local");
    return response;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      throw error;
    }
  }
};
api_form.updateArea = async (id: number, values: any) => {
  try {
    const response = await api_form.put(`area/${id}`, {
      definicaoArea: values,
    });
    return response;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      throw error;
    }
  }
};

api_form.updateTipo = async (id: number, values: any) => {
  try {
    const response = await api_form.put(`tipo/${id}`, {
      definicaoTipo: values,
    });
    return response;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      throw error;
    }
  }
};

api_form.updateLocal = async (id: number, values: any) => {
  try {
    const response = await api_form.put(`local/${id}`, {
      definicaoLocal: values,
    });
    return response;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      throw error;
    }
  }
};

api_form.dispersao = async (params: any) => {
  try {
    const response = await api_form.get("dispersao", { params });
    return response;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      throw error;
    }
  }
};

api_form.getAllUsers = async () => {
  try {
    const response = await api_form.get("user");
    return response;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      throw error;
    }
  }
};

api_form.getUser = async (id: number) => {
  try {
    const response = await api_form.get(`user/${id}`);
    return response;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      throw error;
    }
  }
};

api_form.updateUser = async (id: number, dataUser: any) => {
  try {
    const response = await api_form.put(`user/${id}`, dataUser);
    return response;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      throw error;
    }
  }
};

api_form.createUser = async (dataUser: any) => {
  try {
    const response = await api_form.post("user/register", dataUser);
    return response;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      throw error;
    }
  }
};

api_form.createUserAdmin = async (dataUser: any) => {
  try {
    const response = await api_form.post("user/admin/register", dataUser);
    return response;
  } catch (error: any) {
    throw error;
  }
};
api_form.deleteUser = async (userId: number) => {
  try {
    const response = await api_form.delete(`user/${userId}`);
    return response;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      throw error;
    }
  }
};

api_form.password_reset = async (dataSubmit: {
  senha: string;
  senha_confirm: string;
}) => {
  try {
    const response = api_form.post("password_reset/confirm/", dataSubmit);
    return response;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      throw error;
    }
  }
};

api_form.password_reset_submit_email = async (dataSubmit: {
  email: string;
}) => {
  try {
    const response = api_form.post("password_reset/", dataSubmit);
    return response;
  } catch (error: any) {
    if (error?.response?.status === 401) {
      throw error;
    }
  }
};
export { api_form };
