import React from "react";
import { Raleway, Montserrat, Jost } from "next/font/google";

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

const raleway = Raleway({
  weight: "700",
  style: "normal",
  subsets: ["latin"],
});


function index({ question}: { question: string[]} ) {
  return (
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
        {/* faça 4 inputs radios */}

        <div className="flex items-center">
          <input
            type="radio"
            name="question1"
            id="question1"
            className="mr-2"
          />
          <label
            htmlFor="question1"
            className={`${jost.className} text-zinc-600 text-lg font-normal  leading-normal`}
          >
            1 - Nunca
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            name="question1"
            id="question1"
            className="mr-2"
          />
          <label
            htmlFor="question1"
            className={`${jost.className} text-zinc-600 text-lg font-normal  leading-normal`}
          >
            2 - Às Vezes
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            name="question1"
            id="question1"
            className="mr-2"
          />
          <label
            htmlFor="question1"
            className={`${jost.className} text-zinc-600 text-lg font-normal  leading-normal`}
          >
            3 - Frequentemente
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="radio"
            name="question1"
            id="question1"
            className="mr-2"
          />
          <label
            htmlFor="question1"
            className={`${jost.className} text-zinc-600 text-lg font-normal  leading-normal`}
          >
            4 - Sempre
          </label>
        </div>
      </div>
            </>
        )
      })}
    </div>
  );
}

export default index;
