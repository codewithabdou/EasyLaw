import LoginForm from "@components/auth/LoginForm";
import Footer from "@components/user/layout/Footer";
import Navbar from "@components/user/layout/Navbar";
import React from "react";

const LoginPage = () => {
  return (
    <>
      <Navbar />
      <main className="pt-24 items-center justify-center flex px-[5%] min-h-screen">
        <LoginForm />
      </main>
      <Footer />
    </>
  );
};

export default LoginPage;
