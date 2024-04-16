import Image from "next/image";
import Link from "next/link";
import { GetServerSideProps } from "next";
import { parseCookies } from "nookies";
import { useState, useContext } from "react";
import { Roboto, Montserrat, Karla } from "next/font/google";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { AuthContext } from "@/context/AuthContext";
import { useForm } from "react-hook-form";
import { Button } from "antd";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup
  .object({
    email: yup.string().required("E-mail obrigatório"),
    password: yup.string().required("Senha obrigatória"),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const roboto = Roboto({
  weight: "400",
  style: "normal",
  subsets: ["latin"],
});

const montserrat = Montserrat({
   style: "normal",
  subsets: ["latin"],
});

const karla = Karla({
  weight: "700",
  style: "normal",
  subsets: ["latin"],
});

export default function Login() {
  const [loading, setLoading] = useState<boolean>(false);
  const { signIn } = useContext(AuthContext);

  const [errorLogin, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });
  const onSubmit = async (data: FormData) => {
    setLoading(true);
    const response = await signIn(data);
    console.log(response);
    if (response) {
      setError(true);
    }
    setLoading(false);
  };

  return (
    <main className="flex w-screen h-screen justify-between bg-[#f6fbf9]">
      <div className="h-full hidden lg:flex md:w-[50vw]">
        <Image
          src="/garota.png"
          alt="logo"
          width={1000}
          height={200}
          className="h-full "
        />
      </div>
      <div className="h-full w-full lg:w-[50vw] flex flex-col items-center justify-between">
        <Link href="/">
          <Image src="/icon.svg" alt="logo" width={150} height={150} />
        </Link>
        <h1
          className={`text-4xl font-medium ${montserrat.className} text-[#2D3A3A]`}
        >
          KM-QUEST
        </h1>

        <div className="flex items-center h-full justify-center flex-col w-full">
          {errorLogin && (
            <span className="flex items-center p-2 text-lg leading-5 text-red-500">
              Usuário ou senha inválidos
            </span>
          )}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full flex flex-col items-center gap-y-8"
          >
            <div className="flex flex-col w-[82vw] md:w-[447px]">
              <label
                htmlFor="email"
                className={`${karla.className} font-bold text-2xl`}
              >
                Usuário
              </label>
              <input
                type="text"
                {...register("email")}
                name="email"
                placeholder="Digite seu e-mail"
                className={`py-4 bg-white pl-4 text-[#969696] ${
                  roboto.className
                } text-lg placeholder:text-[#969696]  placeholder:${
                  roboto.className
                } placeholder:text-lg rounded-xl shadow border ${
                  errors.email
                    ? "border-red-500"
                    : "border-black border-opacity-10"
                } `}
              />
              {errors.email && (
                <span className="flex items-center p-2 text-lg leading-5 text-red-500">
                  {errors?.email?.message}
                </span>
              )}
            </div>
            <div className="flex flex-col w-[82vw] md:w-[447px]">
              <label
                htmlFor="password"
                className={`${karla.className} font-bold text-2xl`}
              >
                Senha
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  {...register("password")}
                  placeholder="Digite sua senha"
                  className={`py-4 w-full bg-white pl-4 placeholder:text-[#969696] placeholder:${
                    roboto.className
                  } placeholder:text-lg rounded-xl shadow border ${
                    errors.email
                      ? "border-red-500"
                      : "border-black border-opacity-10"
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2"
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              </div>

              {errors.password && (
                <span className="flex items-center p-2 text-lg leading-5 text-red-500">
                  {errors?.password?.message}
                </span>
              )}
            </div>

            <Button
              htmlType="submit"
              loading={loading}
              className="px-10 py-6 rounded-[32px] bg-[#093520] hover:bg-[#093520] text-white flex items-center"
            >
              ENTRAR
            </Button>
            <Link href={"/recuperar-senha"}>
              <span
                className={`text-center text-[#32403B] text-sm font-normal ${karla.className} leading-[18.20px] cursor-pointer`}
              >
                Esqueceu sua senha?
              </span>
            </Link>
          </form>
        </div>
      </div>
    </main>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const cookies = parseCookies({ req });

  // Acesse o cookie ou qualquer outra informação de autenticação
  const isAuthenticated = !!cookies["psi-token"];

  // Faça qualquer lógica adicional necessária

  if (isAuthenticated) {
    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }

  return {
    props: {
      title: "ok",
    },
  };
};
