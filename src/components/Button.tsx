"use client";
import { signOut } from "next-auth/react";
import React from "react";

const Button = () => {
  const onClick = () => {
    signOut();
  };
  return (
    <button onClick={() => onClick()} className=" p-4 mt-5 bg-slate-300">
      Logout
    </button>
  );
};

export default Button;
