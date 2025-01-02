"use client";
import Login from "@/components/Login";
import SignUp from "@/components/SignUp";
import React, { useState } from "react";

function AuthNew() {
  const [compo, setCompo] = useState("signup");
  function changeComponent(value) {
    setCompo(value);
  }
  return (
    <>
      {compo === "signup" ? <SignUp changeToLogin={changeComponent} /> : <Login changeToSignUp={changeComponent} />}
    </>
  );
}

export default AuthNew;
