import Button from "@/components/Button";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await getServerSession();

  if (!session?.user) {
    redirect("/");
  }

  return (
    <div className="p-4">
      <h1>This Page Is Authenticated</h1>
      <Button />
    </div>
  );
};

export default page;
