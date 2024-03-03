import React, { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import { Raleway } from "next/font/google";
import Question from "@/components/Question";
import { questions, categories } from "@/utils/form";
import { useMutation } from 'react-query';
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { GetServerSideProps } from "next";
import { parseCookies } from 'nookies';

const raleway = Raleway({
  weight: "700",
  style: "normal",
  subsets: ["latin"],
});


export default function Index() {
  const router = useRouter();
  const [page, setPage] = useState(0);
  const [allOptions, setAllOptions] = useState("");
  const [statusRequest, setStatusRequest] = useState(false);
  const { mutate } = useMutation(
    async (data: string) => {
      const response = await fetch('/api/form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({data}),
      });

      if (response.ok) {
        toast.success('Respostas cadastradas com sucesso!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setStatusRequest(false);
        setTimeout(() => {
          
        router.push('/dashboard')
        }, 2000);
      }
      else {
        toast.error('Erro ao enviar as respostas.', {
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

      return response.json();
    }
  );

  useEffect(() => {
    if(allOptions.length === 30) {
      const options = allOptions.substring(0, allOptions.length - 1);
      
      mutate(options);
      setStatusRequest(true);
    }
  }, [allOptions, mutate]);

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

        {page === 0 && <Question question={questions.MEDO} page={page} setPage={setPage} allOptions={allOptions} setAllOptions={setAllOptions} status={statusRequest} />}
        {page === 1 && <Question question={questions.DEPENDENCIA} page={page} setPage={setPage} allOptions={allOptions} setAllOptions={setAllOptions} status={statusRequest} />}
        {page === 2 && <Question question={questions.CONTROLE} page={page} setPage={setPage} allOptions={allOptions} setAllOptions={setAllOptions} status={statusRequest} />}

        
      </div>
    </Layout>
  );
}


export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = parseCookies({ req });

  // Acesse o cookie ou qualquer outra informação de autenticação
  const isAuthenticated = !!cookies['psi-token'];

  // Faça qualquer lógica adicional necessária

 if (!isAuthenticated){
  return {
    redirect: {
      destination: '/login',
      permanent: false,
    },
  }
  
 }

 return {
  props: {
    title:"ok"
  }
 }
}