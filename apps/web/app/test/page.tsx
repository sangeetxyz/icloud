"use client";

import React from "react";
import { json } from "stream/consumers";

const TestPage = () => {
  return (
    <div
      onClick={async () => {
        const res = await fetch("/api/user?name=Sangeet Banerjee", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-api-key": "asd",
          },
        });
        console.log(await res.json());
      }}
      className="bg-black text-white h-screen flex items-center justify-center"
    >
      TestPage
    </div>
  );
};

export default TestPage;
