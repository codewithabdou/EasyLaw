import Footer from "@components/user/layout/Footer";
import ServerSideNavbar from "@components/user/layout/ServerSideNavbar";
import FirstPage from "@components/user/shared/FirstPage";

export default function Home() {
  return (
    <>
      <ServerSideNavbar />
      <main className="pt-24 px-[5%] min-h-screen">
        <FirstPage />
      </main>
      <Footer />
    </>
  );
}
