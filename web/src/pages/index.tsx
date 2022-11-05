import React, { FormEvent, useState } from "react";
import Image from "next/image";
import appPreview from "../assets/iphone-preview.png";
import logoImage from "../assets/logo.svg";
import usersAvater from "../assets/avatares.png";
import iconCheckImage from "../assets/icon-check.svg";
import { api } from "../lib/axios";
import { GetStaticProps } from "next/types";

interface HomeProps {
  poolCount: number;
  guessCount: number;
  userCount: number;
}

export default function Home(props: HomeProps) {
  const [poolTitle, setPoolTitle] = useState("");

  async function createPool(event: FormEvent) {
    event.preventDefault();

    try {
      const response = await api.post("/pools", {
        title: poolTitle,
      });

      const { code } = response.data;

      await navigator.clipboard.writeText(code);
      alert(
        "Bolão criado com sucesso, código copiado para área de transferencia!"
      );

      setPoolTitle("");
    } catch (error) {
      console.log(error);
      alert("Falha ao criar o bolão, tente Novamente!");
    }
  }

  return (
    <div className="max-w-[1124px] h-screen mx-auto grid grid-cols-2 gap-28 items-center">
      <main>
        <Image src={logoImage} alt="Logo da Aplicação" quality={100} />
        <h1 className="mt-14 text-white text-5xl font-bold leading-tight">
          Crie seu próprio bolão da copa e compartilhe entre amigos!
        </h1>

        <div className="mt-10 flex items-center gap-2">
          <Image src={usersAvater} alt="" />
          <strong className="text-gray-100 text-xl">
            <span className="text-ignite-500">+{props.userCount}</span> pessoas
            já estão usando
          </strong>
        </div>

        <form onSubmit={createPool} className="mt-10 flex gap-2">
          <input
            className="flex-1 px-6 py-4 rounded bg-gray-800 border border-gray-600 text-sm text-gray-100"
            type="text"
            name="name-pool"
            id="name-pool"
            placeholder="Qual o nome do bolão?"
            onChange={(event) => setPoolTitle(event.target.value)}
            value={poolTitle}
          />
          <button
            type="submit"
            className="bg-yellow-500 px-6 py-4 rounded text-gray-900 font-bold text-sm uppercase hover:bg-yellow-700"
          >
            Criar meu bolão
          </button>
        </form>

        <p className=" mt-4 text-sm text-gray-300 leading-relaxed">
          Após criar seu bolão, você receberá um código único que poderá usar
          para convidar outras pessoas 🚀
        </p>
        <div className="mt-10 pt-10 border-t border-gray-600 flex items-center justify-between text-gray-100">
          <div className="flex items-center gap-6">
            <Image src={iconCheckImage} alt=""></Image>
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.poolCount}</span>
              <span> Bolões criados</span>
            </div>
          </div>

          <div className="w-px h-14 bg-gray-600"></div>

          <div className="flex items-center gap-6">
            <Image src={iconCheckImage} alt=""></Image>
            <div className="flex flex-col">
              <span className="font-bold text-2xl">+{props.guessCount}</span>
              <span> Palpites Enviados</span>
            </div>
          </div>
        </div>
      </main>

      <Image
        src={appPreview}
        alt="2 Celulares Exibindo uma prévia da aplicação nlw"
      />
    </div>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const [poolCountResponse, guessCountResponse, usersCountResponse] =
    await Promise.all([
      api.get("pools/count"),
      api.get("guesses/count"),
      api.get("users/count"),
    ]);

  return {
    props: {
      poolCount: poolCountResponse.data.count,
      guessCount: guessCountResponse.data.count,
      userCount: usersCountResponse.data.count,
    },
  };
};
