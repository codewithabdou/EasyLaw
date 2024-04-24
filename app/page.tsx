import Footer from "@components/user/layout/Footer";
import Navbar from "@components/user/layout/Navbar";
import FirstPage from "@components/user/shared/FirstPage";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-24 px-[5%] min-h-screen">
        <FirstPage />
      </main>
      <Footer />
    </>
  );
}
