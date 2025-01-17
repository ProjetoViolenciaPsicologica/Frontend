export const transformedData = (data:any, encaminhamento:any) => {
    return {
      idade: parseInt(data.idade) || 0,  // Convertendo idade para número, com fallback para 0
      escolha_sexo: data.escolha_sexo,  // Fixo como "string", você pode ajustar conforme necessário
      localAplicacao: {
        definicaoLocalForm: data.definicaoLocalForm || "string"  // Usando o valor do objeto original ou "string" como fallback
      },
      grauInstrucao: {
        definicaoGrau: data.grau_de_instrucao || "string"  // Usando o valor do grau de instrução ou "string"
      },
      encaminhado_por: encaminhamento,  // Fixo como "string", pode ser ajustado conforme necessário
      especialidade: data.especialidade ?? null,  // Garantir que seja uma string, mesmo se for undefined
      prontuario: data.prontuario || "string"  // Se vazio, usa "string"
    };
  };
  
export const encaminhamentoData = (data:any) => {
    let encaminhamento;
    if(data.encaminhamento.includes('Outro')) {
        encaminhamento = data.encaminhamentoOutro;
      }
      else {
        encaminhamento = data.encaminhamento.join(", ");
      }
    return encaminhamento;
}