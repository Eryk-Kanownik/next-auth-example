"use client";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const session = useSession();

  useEffect(() => {
    if (session.data !== undefined) {
      router.push("/authenticated");
    }
  }, []);

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    let callback = await signIn("credentials", { ...data, redirect: false });
    if (callback?.ok === true) {
      router.push("/authenticated");
    }
  };

  return (
    <main className="m-4">
      <h1 className="mb-4 text-xl font-medium">Login Page</h1>
      <form
        className="flex flex-col w-96 gap-4"
        method="POST"
        onSubmit={(e) => onSubmit(e)}>
        <input
          type="email"
          className="border-2 border-slate-200 focus:border-slate-400 duration-200 rounded py-1 px-2 outline-none"
          name="email"
          placeholder="Email..."
          onChange={(e) => onChange(e)}
        />
        <input
          type="password"
          className="border-2 border-slate-200 focus:border-slate-400 duration-200 rounded py-1 px-2 outline-none"
          name="password"
          placeholder="Password..."
          onChange={(e) => onChange(e)}
        />
        <button className="border-2 border-slate-200 duration-200 hover:border-slate-400 py-1 px-2 rounded">
          Submit
        </button>
      </form>
    </main>
  );
}
