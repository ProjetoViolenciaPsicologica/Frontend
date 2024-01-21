import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Raleway, Inter } from "next/font/google";
import Question from "@/components/Question";
import { questions, categories } from "@/utils/form";

const inter = Inter({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

const raleway = Raleway({
  weight: "700",
  style: "normal",
  subsets: ["latin"],
});

export default function Index() {
  const [page, setPage] = useState(0);

  return (
    <Layout>
      <div className="flex bg-[#F6FBF9] h-full w-full flex-col items-center pl-4 lg:items-start lg:pl-12">
        <div className="mt-4 flex flex-col w-full  md:mt-10">
          <svg
            width="155"
            height="16"
            viewBox="0 0 155 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="6" cy="8" r="6" fill="#093520" />
            <line x1="20" y1="7.5" x2="60" y2="7.5" stroke="#093520" />
            <circle
              cx="74"
              cy="8"
              r="6"
              fill={page === 0 ? "#B9B9C4" : "#093520"}
            />
            <line x1="88" y1="7.5" x2="128" y2="7.5" stroke="#B9B9C4" />
            <circle
              cx="142"
              cy="8"
              r="6"
              fill={page < 2 ? "#B9B9C4" : "#093520"}
            />
          </svg>

          <h1
            className={`${raleway.className} mt-9 text-2xl md:text-4xl font-bold text-black`}
          >
            CATEGORIA: {categories[page]}
          </h1>
        </div>

        {page === 0 && <Question question={questions.MEDO} />}
        {page === 1 && <Question question={questions.DEPENDENCIA} />}
        {page === 2 && <Question question={questions.CONTROLE} />}

        <div className="w-full flex justify-center">
          <button
            className={`${inter.className} text-xl font-bold text-white w-[202px] h-[59px] bg-green rounded-[32px] mt-7 mb-7`}
            onClick={() => {
              page < 2 && setPage(page + 1);
              window.scrollTo({
                top: 0,
                behavior: "smooth",
              });
            }}
          >
            {page === 2 ? "FINALIZAR" : "AVANÇAR"}
          </button>
        </div>
      </div>
    </Layout>
  );
}
