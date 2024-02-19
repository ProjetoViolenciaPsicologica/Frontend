import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Raleway, Karla } from "next/font/google";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import { ptBR } from "date-fns/locale/pt-BR"; // Importe o locale em pt-BR

// Registre o locale para uso com o DatePicker
registerLocale("pt-BR", ptBR);

const raleway = Raleway({
  style: "normal",
  subsets: ["latin"],
});

const karla = Karla({
  style: "normal",
  subsets: ["latin"],
});

function Index() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleStartDateChange = (date:any) => {
    setStartDate(date);
  };

  const handleEndDateChange = (date:any) => {
    setEndDate(date);
  };

  return (
    <Layout>
      <div className="flex h-full w-full flex-col items-center pl-4 lg:items-start lg:pl-12 bg-[#F6FBF9]">
        <div className="mt-4 flex h-full flex-col w-full md:mt-4">
          <h1 className={`${raleway.className} text-3xl font-normal `}>
            ARQUIVOS
          </h1>
          <span
            className={`${raleway.className} w-[309px] mt-4 text-black text-sm font-normal leading-tight`}
          >
            Manipulação e extração de informações da base de dados do sistema
          </span>
        </div>

        <div className="flex gap-x-44 w-full mt-24">
          <div className="flex flex-col gap-y-16">
            <div className="flex flex-col">
              <label
                htmlFor="grau"
                className={`${karla.className} text-xl font-bold`}
              >
                Grau de instrução
              </label>
              <select
                name="grau"
                id="grau"
                className="w-[411px] h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10 pl-6"
              >
                <option value="">Selecione</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="grau"
                className={`${karla.className} text-xl font-bold`}
              >
                Sexo
              </label>
              <select
                name="grau"
                id="grau"
                className="w-[411px] h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10 pl-6"
              >
                <option value="M">Masculino</option>
                <option value="F">Feminino</option>
                <option value="O">Outro</option>
              </select>
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="grau"
                className={`${karla.className} text-xl font-bold`}
              >
                Idade
              </label>
              <input
                type="number"
                placeholder="Digite a idade"
                name="idade"
                id="idade"
                className="w-[411px] h-[58.67px] bg-white rounded-[10px] shadow border border-black  border-opacity-10 pl-6"
              />
            </div>
            
          </div>
          <div className="flex flex-col gap-y-16">
          <div className="flex flex-col">
              <label
                htmlFor="grau"
                className={`${karla.className} text-xl font-bold`}
              >
                Local da aplicação
              </label>
              <select
                name="grau"
                id="grau"
                className="w-[411px] h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10 pl-6"
              >
                <option value="saude">Unidade de saúde</option>
              </select>
            </div>
          <div className="flex flex-col">
              <label
                htmlFor="startDate"
                className={`${karla.className} text-xl font-bold`}
              >
                Data de inicio
              </label>
              <DatePicker
                selected={startDate}
                onChange={handleStartDateChange}
                showTimeSelect
                timeFormat="HH:mm"
                placeholderText="dd/MM/yyyy HH:mm"
                dateFormat="dd/MM/yyyy HH:mm"
                locale="pt-BR" // Use a string "pt-BR" diretamente aqui
                className="w-[411px] h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10 pl-6"
              />
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="endDate"
                className={`${karla.className} text-xl font-bold`}
              >
                Data de fim
              </label>
              <DatePicker
                selected={endDate}
                onChange={handleEndDateChange}
                showTimeSelect
                placeholderText="dd/MM/yyyy HH:mm"
                timeFormat="HH:mm"
                dateFormat="dd/MM/yyyy HH:mm"
                locale="pt-BR" // Use a string "pt-BR" diretamente aqui
                className="w-[411px] h-[58.67px] bg-white rounded-[10px] shadow border border-black border-opacity-10 pl-6"
              />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Index;
