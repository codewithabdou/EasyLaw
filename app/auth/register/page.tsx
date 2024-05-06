import RegisterForm from "@components/auth/RegisterForm";
import Footer from "@components/user/layout/Footer";
import Navbar from "@components/user/layout/Navbar";
import React from "react";

const RegisterPage = () => {
  return (
    <>
      <Navbar />
      <main className="pt-24 items-center justify-center flex px-[5%] min-h-screen">
        <RegisterForm />
      </main>
      <Footer />
    </>
  );
};

export default RegisterPage;
