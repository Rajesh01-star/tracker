"use client";
import Forgot from "@/components/Forgot";
import Login from "@/components/Login";
import SignUp from "@/components/SignUp";
import React, { useState } from "react";

function AuthNew() {
  const [compo, setCompo] = useState("signup");
  function changeComponent(value) {
    setCompo(value);
  }
  console.log(compo)
  return (
    <>
      {compo === "signup" ? (
        <SignUp changePage={changeComponent} />
      ) : compo === "login" ? (
        <Login changePage={changeComponent} />
      ) : compo === "forgotPassword" ? (
        <Forgot changePage={changeComponent}  />
      ) : (
        <></>
      )}
    </>
  );
}

export default AuthNew;
