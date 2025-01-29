import * as XLSX from "xlsx";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";


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
    pdfMake.vfs = pdfFonts.pdfMake.vfs;
    const tableData = filteredData.map((data: {
        grauInstrucao: any;
        campo_questoes: any;
        idade: any;
        escolha_sexo: any;
        localAplicacao: { definicaoLocalForm: any } | undefined;
        encaminhado_por: any;
        especialidade: any;
        prontuario: any;
      }) => ({
        grauInstrucao: data.grauInstrucao,
        campo_questoes: data.campo_questoes,
        idade: data.idade,
        escolha_sexo: data.escolha_sexo,
        localAplicacao: data.localAplicacao?.definicaoLocalForm || '',
        encaminhado_por: data.encaminhado_por,
        especialidade: data.especialidade,
        prontuario: data.prontuario,
      }));
      
      // Função para montar a tabela
      function createTable(tableData: any[]) {
        const table = [
          [
            { text: 'Grau de Instrução', alignment: 'center', fontSize: 12, fillColor: '#F0F3F6' },
            { text: 'Campo de Questões', alignment: 'center', fontSize: 12, fillColor: '#F0F3F6' },
            { text: 'Idade', alignment: 'center', fontSize: 12, fillColor: '#F0F3F6' },
            { text: 'Escolha Sexo', alignment: 'center', fontSize: 12, fillColor: '#F0F3F6' },
            { text: 'Local de Aplicação', alignment: 'center', fontSize: 12, fillColor: '#F0F3F6' },
            { text: 'Encaminhado Por', alignment: 'center', fontSize: 12, fillColor: '#F0F3F6' },
            { text: 'Especialidade', alignment: 'center', fontSize: 12, fillColor: '#F0F3F6' },
            { text: 'Prontuário', alignment: 'center', fontSize: 12, fillColor: '#F0F3F6' },
          ],
        ];
      
        tableData.forEach((item) => {
          table.push([
            {
                text: item.grauInstrucao || '', alignment: 'center', fontSize: 10,
                fillColor: ""
            },
            {
                text: item.campo_questoes || '', alignment: 'center', fontSize: 10,
                fillColor: ""
            },
            {
                text: item.idade || '', alignment: 'center', fontSize: 10,
                fillColor: ""
            },
            {
                text: item.escolha_sexo || '', alignment: 'center', fontSize: 10,
                fillColor: ""
            },
            {
                text: item.localAplicacao || '', alignment: 'center', fontSize: 10,
                fillColor: ""
            },
            {
                text: item.encaminhado_por || '', alignment: 'center', fontSize: 10,
                fillColor: ""
            },
            {
                text: item.especialidade || '', alignment: 'center', fontSize: 10,
                fillColor: ""
            },
            {
                text: item.prontuario || '', alignment: 'center', fontSize: 10,
                fillColor: ""
            },
          ]);
        });
      
        return table;
      }
      
      // Função para gerar o PDF

        const table = createTable(tableData);
      
        const docDefinitions: any = {
          pageSize: 'A4',
          pageMargins: [15, 20, 15, 40],
          content: [
            {
              table: {
                widths: [505],
                body: [
                  [
                    {
                      svg: `<svg width="73" height="33" viewBox="0 0 321 83" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M18.3918 82.1279C12.3761 82.1279 7.82674 80.436 4.74369 77.0522C1.66064 73.5932 0.119113 68.6678 0.119113 62.2761V57.7643H11.8497V63.1785C11.8497 68.2918 13.9928 70.8485 18.279 70.8485C20.3845 70.8485 21.9636 70.2469 23.0164 69.0438C24.1443 67.7654 24.7083 65.7351 24.7083 62.9529C24.7083 59.6442 23.9563 56.7492 22.4524 54.2677C20.9485 51.711 18.1662 48.6656 14.1056 45.1314C8.99228 40.6196 5.42045 36.559 3.39015 32.9495C1.35985 29.2649 0.344702 25.1291 0.344702 20.5422C0.344702 14.3009 1.92382 9.4883 5.08207 6.10446C8.24032 2.64543 12.8273 0.915915 18.843 0.915915C24.7835 0.915915 29.2577 2.64543 32.2655 6.10446C35.3486 9.4883 36.8901 14.3761 36.8901 20.7677V24.0388H25.1595V19.9782C25.1595 17.2711 24.6331 15.316 23.5804 14.1129C22.5276 12.8345 20.9861 12.1954 18.9558 12.1954C14.82 12.1954 12.7521 14.7144 12.7521 19.7526C12.7521 22.6101 13.5041 25.2795 15.008 27.761C16.5871 30.2425 19.407 33.2503 23.4676 36.7846C28.6561 41.2963 32.2279 45.3945 34.183 49.0792C36.1382 52.7638 37.1157 57.0876 37.1157 62.0505C37.1157 68.5174 35.499 73.4804 32.2655 76.9394C29.1073 80.3984 24.4827 82.1279 18.3918 82.1279ZM44.2297 2.04386H56.6371V81H44.2297V2.04386ZM83.5253 82.1279C77.5096 82.1279 72.9227 80.436 69.7644 77.0522C66.6062 73.5932 65.027 68.6678 65.027 62.2761V20.7677C65.027 14.3761 66.6062 9.4883 69.7644 6.10446C72.9227 2.64543 77.5096 0.915915 83.5253 0.915915C89.541 0.915915 94.128 2.64543 97.2863 6.10446C100.445 9.4883 102.024 14.3761 102.024 20.7677V27.5354H90.293V19.9782C90.293 14.7896 88.1499 12.1954 83.8637 12.1954C79.5775 12.1954 77.4344 14.7896 77.4344 19.9782V63.1785C77.4344 68.2918 79.5775 70.8485 83.8637 70.8485C88.1499 70.8485 90.293 68.2918 90.293 63.1785V47.7256H84.0893V36.4462H102.024V62.2761C102.024 68.6678 100.445 73.5932 97.2863 77.0522C94.128 80.436 89.541 82.1279 83.5253 82.1279Z" fill="#2D3A3A"/></svg>`,
                      border: [false, false, false, true],
                      borderColor: ["#000000", "#000000", "#000000", "#058C42"],
                      margin: [210, 0, 0, 17],
                    },
                  ],
                ],
              },
              layout: {
                hLineWidth: () => 3,
                vLineWidth: () => 3,
              },
              margin: [24, 0, 0, 5],
            },
            {
              table: {
                headerRows: 1,
                widths: ["*"],
                body: [
                  [
                    {
                      text: `Relatório de Aplicação`,
                      fillColor: "#F7F9FB",
                      margin: [0, 14],
                      fontSize: 12,
                      border: [false, false, false, false],
                    },
                  ],
                ],
              },
              margin: [24, 6, 25, 3],
            },
            {
              table: {
                headerRows: 1,
                widths: ["*", "*", "*", "*", "*", "*", "*", "*"],
                fillColor: "#F7F9FB",
                body: table,
              },
              layout: {
                hLineColor() {
                  return "#B3BFCC";
                },
                vLineColor() {
                  return "#B3BFCC";
                },
              },
              margin: [25, 5, 24, 13],
            },
          ],
        };
      
        pdfMake.vfs = pdfFonts.pdfMake.vfs;
        pdfMake.createPdf(docDefinitions).download("relatorioAplicacao.pdf");
      
};
