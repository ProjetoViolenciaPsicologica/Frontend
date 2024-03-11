import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Radio } from "antd";

const Question = ({
  question,
  page,
  setPage,
  allOptions,
  setAllOptions,
  setOkQuestion,
  selectedOptions,
  setSelectedOptions,
}: {
  question: string[];
  page: number;
  setOkQuestion: (ok: boolean) => void;
  setPage: (page: number) => void;
  allOptions: string;
  setAllOptions: (allOptions: string) => void;
  selectedOptions: { [key: string]: any };
  setSelectedOptions: (selectedOptions: { [key: string]: any }) => void;
}) => {
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});

  useEffect(() => {
    // Restore selected options when page changes
    if (!selectedOptions[page.toString()]) {
      setSelectedOptions((prevOptions:any) => ({
        ...prevOptions,
        [page.toString()]: {},
      }));
    }
  }, [page, selectedOptions, setSelectedOptions]);

  const handleRadioChange = (questionIndex: number, value: string) => {
    const updatedOptions = {
      ...selectedOptions,
      [page.toString()]: {
        ...selectedOptions[page.toString()],
        [questionIndex.toString()]: value,
      },
    };
    setSelectedOptions(updatedOptions);
    setErrors({});
  };

  const handleSubmit = () => {
    // Validate if any question is not answered
    const newErrors: { [key: string]: boolean } = {};
    question.forEach((_, index) => {
      if (!selectedOptions[page.toString()]?.[index.toString()]) {
        newErrors[index.toString()] = true;
      } else {
        newErrors[index.toString()] = false;
      }
    });
    setErrors(newErrors);

    // Check if all questions are answered
    const allQuestionsAnswered = !Object.values(newErrors).some((error) => error);

    if (allQuestionsAnswered) {
      // Perform necessary actions with selected options

      let optionsString = "";
      for (let i = 0; i < question.length; i++) {
        const value = selectedOptions[page.toString()]?.[i.toString()] || "";
        optionsString += value ? value + "," : ",";
      }

      const prevOptions = allOptions || ""; // assuming allOptions is the previous state
      const newOptions = prevOptions + optionsString;
      setAllOptions(newOptions);

      // Move to the next page
      if (page < 3) {
        setPage(page + 1);
      } else {
        // If it's the last page, you can send the string to the API here
        console.log("Send to API:", allOptions);
        setOkQuestion(true);
      }

      // Scroll to top
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      // If any question is not answered, display error message
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
    <div className="mt-4 flex h-full flex-col w-[90vw] md:w-full md:pr-8 md:mt-10">
      {question.map((quest, index) => (
        <div key={index}>
          <h1 className="text-black text-justify text-2xl font-semibold">{quest}</h1>
          <div className="mt-7 mb-11 w-full h-[182px] p-2 bg-white bg-opacity-70 rounded-2xl shadow border border-white border-opacity-70 flex-col gap-y-2 justify-center items-start inline-flex">
            <div className="flex items-center">
              <Radio
                value="1"
                checked={
                  selectedOptions[page.toString()]?.[index.toString()] === "1"
                }
                onChange={() => handleRadioChange(index, "1")}
                className="mr-2 text-black text-lg font-normal leading-[27px]"
              >
                1 - Nunca
              </Radio>
            </div>
            <div className="flex items-center">
              <Radio
                value="2"
                checked={
                  selectedOptions[page.toString()]?.[index.toString()] === "2"
                }
                onChange={() => handleRadioChange(index, "2")}
                className="mr-2 text-black text-lg font-normal leading-[27px]"
              >
                2 - Às Vezes
              </Radio>
            </div>
            <div className="flex items-center">
              <Radio
                value="3"
                checked={
                  selectedOptions[page.toString()]?.[index.toString()] === "3"
                }
                onChange={() => handleRadioChange(index, "3")}
                className="mr-2 text-black text-lg font-normal leading-[27px]"
              >
                3 - Frequentemente
              </Radio>
            </div>
            <div className="flex items-center">
              <Radio
                value="4"
                checked={
                  selectedOptions[page.toString()]?.[index.toString()] === "4"
                }
                onChange={() => handleRadioChange(index, "4")}
                className="mr-2 text-black text-lg font-normal leading-[27px]"
              >
                4 - Sempre
              </Radio>
            </div>
          </div>
        </div>
      ))}
      <div className="w-full flex justify-center gap-x-5">
        <button
          className="text-xl font-bold text-white w-[202px] h-[59px] bg-yellow-400 rounded-[32px] mt-7 mb-7"
          onClick={() => { setPage(page - 1); setOkQuestion(false); }}
        >
          VOLTAR
        </button>
        <button
          className="text-xl font-bold text-white w-[202px] h-[59px] bg-emerald-950 rounded-[32px] mt-7 mb-7"
          onClick={handleSubmit}
        >
          {page === 3 ? "FINALIZAR" : "AVANÇAR"}
        </button>
      </div>
    </div>
  );
};

export default Question;
