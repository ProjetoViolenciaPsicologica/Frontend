import * as XLSX from "xlsx";
import { jsPDF } from "jspdf";
import "jspdf-autotable"; // Importando o plugin autoTable

declare module "jspdf" {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}


const mapQuestaoCodigoParaTexto = (codigo: number) => {
  switch (codigo) {
    case 1:
      return "Nunca";
    case 2:
      return "Às vezes";
    case 3:
      return "Frequentemente";
    case 4:
      return "Sempre";
    default:
      return "";
  }
};

export const handleExportExcel = (filteredData: any) => {
  const dataFilter = filteredData.map(
    (data: {
      grauInstrucao: any;
      campo_questoes: any;
      idade: any;
      escolha_sexo: any;
      localAplicacao: { definicaoLocalForm: any } | undefined;
      encaminhado_por: any;
      especialidade: any;
      prontuario: any;
    }) => {
      // Corrigindo o cálculo do somatório das questões
      const sum = data.campo_questoes
        .split(",")
        .reduce((acc: number, curr: string) => acc + parseInt(curr), 0);

      const message =
        sum >= 15 && sum <= 30
          ? "Sinal verde"
          : sum >= 31 && sum <= 38
          ? "Sinal amarelo"
          : sum >= 39 && sum <= 60
          ? "Sinal vermelho"
          : null;

      const campoQuestoesTexto = data.campo_questoes
        .split(",")
        .map((codigo: string) => mapQuestaoCodigoParaTexto(parseInt(codigo)))
        .join(", ");

      const result: any = {
        questões: campoQuestoesTexto,
        idade: data.idade,
        sexo: data.escolha_sexo,
        "local da aplicação": data.localAplicacao?.definicaoLocalForm || "N/A", // Adicionando verificação e valor padrão
        "Grau de instrução": data.grauInstrucao?.definicaoGrau || "N/A", // Adicionando valor padrão
        "Somatório questões": sum,
        Sinal: message,
        "Encaminhado por": "",
        Especialidade: "",
        Prontuário: "",
      };

      // Adiciona os campos caso não sejam null ou ""
      if (data.encaminhado_por && data.encaminhado_por !== "") {
        result["Encaminhado por"] = data.encaminhado_por;
      }

      if (data.especialidade && data.especialidade !== "") {
        result["Especialidade"] = data.especialidade;
      }

      if (data.prontuario && data.prontuario !== "") {
        result["Prontuário"] = data.prontuario;
      }

      return result;
    }
  );

  const excelData = convertToExcelData(dataFilter);
  console.log(filteredData);

  // Cria uma nova pasta de trabalho do Excel
  const worksheet = XLSX.utils.aoa_to_sheet(excelData);

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, "Dados Filtrados");

  // Converte o livro de trabalho em um blob
  const excelBlob = workbook2blob(workbook);

  // Cria um objeto URL a partir do blob
  const url = window.URL.createObjectURL(excelBlob);

  // Cria um link temporário e o clica para iniciar o download
  const link = document.createElement("a");
  link.href = url;
  link.download = "filtered_data.xlsx";
  link.click();

  // Libera o objeto URL quando o link é removido
  window.URL.revokeObjectURL(url);
};

// Função para converter os dados para o formato apropriado para o Excel
const convertToExcelData = (data: any[]) => {
  const headerRow = Object.keys(data[0]);
  const rows = data.map((row) => Object.values(row));
  return [headerRow, ...rows];
};

// Função para converter o livro de trabalho em um blob
const workbook2blob = (workbook: XLSX.WorkBook) => {
  const wopts: XLSX.WritingOptions = {
    bookType: "xlsx",
    bookSST: false,
    type: "binary",
  };
  const wbout = XLSX.write(workbook, wopts);

  function s2ab(s: string): ArrayBuffer {
    const buf = new ArrayBuffer(s.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i !== s.length; ++i) view[i] = s.charCodeAt(i) & 0xff;
    return buf;
  }

  return new Blob([s2ab(wbout)], { type: "application/octet-stream" });
};



export const handleExportPDF = (filteredData: any) => {
  const doc = new jsPDF();
  
  const mapQuestaoCodigoParaTexto = (codigo: string) => {
    const mapa = {
      1: "Nunca",
      2: "Às vezes",
      3: "Frequentemente",
      4: "Sempre"
    };
  
    // Separar a string de números, mapear para as palavras e unir novamente em uma string
    return codigo.split(',').map(num => mapa[parseInt(num) as keyof typeof mapa]).join(', ');
  };
  
  const headers = [
    'Grau de Instrução', 'Questões', 'Idade', 'Sexo', 
    'Local da Aplicação', 'Encaminhado por', 'Especialidade', 'Prontuário'
  ];

  const rows = filteredData.map((data: any) => [
    data.grauInstrucao?.definicaoGrau,
    mapQuestaoCodigoParaTexto(data.campo_questoes),
    data.idade,
    data.escolha_sexo,
    data.localAplicacao?.definicaoLocalForm,
    data.encaminhado_por,
    data.especialidade,
    data.prontuario
  ]);

  // Adicionando a imagem no topo (antes da tabela)
  const logoUrl = 'icon.png'; // Pode ser uma URL de uma imagem online ou um base64
  const logoWidth = 25;  // Largura da imagem
  const logoHeight = 25; // Altura da imagem
  const pageWidth = doc.internal.pageSize.width;  // Largura da página
  const positionX = (pageWidth - logoWidth) / 2;   // Centraliza a imagem
  
  // Adicionando a imagem ao PDF (centralizada)
  doc.addImage(logoUrl, 'PNG', positionX, 10, logoWidth, logoHeight);  // (caminho relativo, tipo, x, y, largura, altura)
  
  const borderY = 10 + logoHeight;  // Posição Y da borda, logo abaixo da imagem
  const borderHeight = 1;  // Espessura da borda (2px)
  
  // Definindo a cor da borda (hexadecimal #058C42)
  doc.setDrawColor(5, 140, 66);  // Cor RGB correspondente a #058C42
  
  // Desenhando o retângulo (borda abaixo da imagem)
  doc.rect(0, borderY, pageWidth, borderHeight);  // (x, y, largura, altura)

  doc.autoTable({
    head: [headers],
    body: rows,
    startY: 50,  // Ajustando o início da tabela após a imagem
    theme: 'striped',  // Isso é opcional, mas ajuda na visualização
    columnStyles: {
      0: { cellWidth: 'auto' },  // Faz o auto ajuste para a coluna 1
      1: { cellWidth: 'auto' },  // Faz o auto ajuste para a coluna 2
      2: { cellWidth: 'auto' },  // E assim por diante...
      3: { cellWidth: 'auto' },
      4: { cellWidth: 'auto' },
      5: { cellWidth: 'auto' },
      6: { cellWidth: 'auto' },
      7: { cellWidth: 'auto' },
    }
  });

  // Salvando o PDF
  doc.save("relatorioAplicacao.pdf");
};



