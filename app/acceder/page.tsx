"use client";

import { signIn } from "next-auth/react";
import { GithubLoginButton } from "react-social-login-buttons";

export default function Acceder() {
  return (
    <section className="flex items-center overflow-hidden relative justify-center h-screen">
      <video
        src="https://cdn.coverr.co/videos/coverr-woman-drinking-coffee-5935/720p.mp4"
        muted
        autoPlay
        loop
        className="w-screen absolute inset-0 h-screen object-cover -z-40"
      ></video>
      <div className="max-w-xl bg-[#282a2c] p-7  rounded-3xl w-full">
        <h1 className="w-full text-center pb-7 text-xl font-extrabold">
          Ingresa con
        </h1>
        <GithubLoginButton
          onClick={() => signIn("github")}
          className="rounded-3xl"
        />
      </div>
    </section>
  );
}
