"use client";
import Dashboard from "@/app/pages/dashboard/page";
import React from "react";

const Page = ({ params }) => {
  return (
    <>
      <Dashboard bakeryName={params.bakeryHome}/>
    </>
  );
};

export default Page;
