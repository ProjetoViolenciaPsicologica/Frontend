import React, { useState } from "react";
import { Montserrat, Jost, Inter } from "next/font/google";
import { toast } from "react-toastify";

const inter = Inter({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});
const jost = Jost({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

const montserrat = Montserrat({
  weight: "600",
  style: "normal",
  subsets: ["latin"],
});


export default function Index({
  question,
  page,
  setPage,
  allOptions,
  setAllOptions,
  status,
}: {
  question: string[];
  page: number;
  setPage: (page: number) => void;
  allOptions: string;
  setAllOptions: (allOptions: string) => void;
  status: boolean;
}) {
  const [selectedOptions, setSelectedOptions] = useState<any>({});
  const [, setErrors] = useState({});

  const handleRadioChange = (questionIndex: number, value: string) => {
    setSelectedOptions((prevOptions: any) => ({
      ...prevOptions,
      [questionIndex.toString()]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [questionIndex.toString()]: false,
    }));
  };

  const handleSubmit = () => {
    const newErrors: Record<string, boolean> = {};
    question.forEach((_, index) => {
      if (!selectedOptions[index.toString()]) {
        newErrors[index.toString()] = true;
      } else {
        newErrors[index.toString()] = false;
      }
    });
    setErrors(newErrors);

    const allQuestionsAnswered = Object.values(newErrors).every(
      (error) => !error
    );

    if (allQuestionsAnswered) {

      const optionsString = Object.values(selectedOptions).join(",");

      let prevOptions = allOptions;
      let newOptions = prevOptions + optionsString + ",";
      setAllOptions(newOptions);
      // Mudar de página
      if (page < 2) {
        setPage(page + 1);
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }

      // Scroll para o topo
      
    } else {
      // Se alguma questão não foi respondida, você pode exibir uma mensagem de erro ou tomar outra ação apropriada.
      toast.error("Por favor, responda a todas as perguntas.", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  return (
    <>
      <div className="mt-4 flex h-full flex-col w-[90vw] md:w-full md:pr-8 md:mt-10">
        {question.map((question, index) => {
          return (
            <>
              <h1
                className={`${montserrat.className} text-black text-justify text-2xl font-semibold`}
              >
                {question}
              </h1>
              <div className="mt-7 mb-11 w-full h-[182px] p-2 bg-white bg-opacity-70 rounded-2xl shadow border border-white border-opacity-70 flex-col gap-y-2 justify-center items-start inline-flex">
               

                <div className="flex items-center">
                  <input
                    type="radio"
                    name={`opcoes_${index}`}
                    value="4"
                    checked={selectedOptions[index.toString()] === "1"}
                    onChange={() => handleRadioChange(index, "1")}
                    className="mr-2"
                  />
                  <label
                    htmlFor="opcoes"
                    className={`${jost.className} text-zinc-600 text-lg font-normal  leading-normal`}
                  >
                    1 - Nunca
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name={`opcoes_${index}`}
                    value="2"
                    checked={selectedOptions[index.toString()] === "2"}
                    onChange={() => handleRadioChange(index, "2")}
                    className="mr-2"
                  />
                  <label
                    htmlFor="opcoes"
                    className={`${jost.className} text-zinc-600 text-lg font-normal  leading-normal`}
                  >
                    2 - Às Vezes
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name={`opcoes_${index}`}
                    value="3"
                    checked={selectedOptions[index.toString()] === "3"}
                    onChange={() => handleRadioChange(index, "3")}
                    className="mr-2"
                  />
                  <label
                    htmlFor="opcoes"
                    className={`${jost.className} text-zinc-600 text-lg font-normal  leading-normal`}
                  >
                    3 - Frequentemente
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    name={`opcoes_${index}`}
                    value="4"
                    checked={selectedOptions[index.toString()] === "4"}
                    onChange={() => handleRadioChange(index, "4")}
                    className="mr-2"
                  />
                  <label
                    htmlFor="opcoes"
                    className={`${jost.className} text-zinc-600 text-lg font-normal  leading-normal`}
                  >
                    4 - Sempre
                  </label>
                </div>
              </div>
            </>
          );
        })}
      </div>
      <div className="w-full flex justify-center">
  <button
    className={`${inter.className} ${status ? "bg-green-ligth cursor-wait" : "bg-green-bg cursor-pointer"} text-xl font-bold text-white w-[202px] h-[59px]  rounded-[32px] mt-7 mb-7 relative`}
    onClick={handleSubmit}
  >
    {page === 2 && !status && "FINALIZAR"}
    {page < 2 && "AVANÇAR"}
    {status && (
      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="animate-spin w-6 h-6 border-t-2 border-white rounded-full"></div>
      </span>
    )}
  </button>
</div>

    </>
  );
}
