import getSupremeCourtSearchResults from "@actions/getSupremeCourtSearchResults";
import Navbar from "@components/user/layout/Navbar";
import DecisionsList from "@components/user/search/DecisionsList";
import { SearchTab } from "@components/user/search/SearchTab";
import FirstPage from "@components/user/shared/FirstPage";
import Footer from "@components/user/layout/Footer";
import ServerSideNavbar from "@components/user/layout/ServerSideNavbar";
import { getUserDataFromCookies } from "@services/authentication.service";
import Image from "next/image";
import IMAGES from "@config/images";
import Link from "next/link";
import { Button } from "@components/ui/button";
import NoService from "@components/user/shared/NoService";
const SearchPage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const search_type =
    typeof searchParams?.search_type === "string"
      ? searchParams.search_type
      : "supreme_court";
  const search_query =
    typeof searchParams?.search_query === "string"
      ? searchParams.search_query
      : undefined;
  const decision_number =
    typeof searchParams?.decision_number === "string"
      ? searchParams.decision_number
      : undefined;
  const decision_subject =
    typeof searchParams?.decision_subject === "string"
      ? searchParams.decision_subject
      : undefined;
  const start_date =
    typeof searchParams?.start_date === "string"
      ? searchParams.start_date
      : undefined;
  const end_date =
    typeof searchParams?.end_date === "string"
      ? searchParams.end_date
      : undefined;
  const search_field =
    typeof searchParams?.search_field === "string"
      ? searchParams.search_field
      : undefined;

  const userDataCookies = await getUserDataFromCookies();
  const canAccess = userDataCookies?.canAccess;
  const canAccessSupremeCourt = canAccess?.includes("search-supreme-court");

  if (search_type === "supreme_court") {
    if (canAccessSupremeCourt) {
      const data = await getSupremeCourtSearchResults(
        search_query,
        decision_number,
        {
          from: start_date,
          to: end_date,
        },
        decision_subject,
        search_field,
        1
      );

      const decisions = data?.data;

      return (
        <>
          <ServerSideNavbar />
          <main className="pt-24 px-[5%]">
            <FirstPage />
            <SearchTab
              canAccessSupremeCourt={canAccessSupremeCourt}
              query={{ search_type }}
            />
            <DecisionsList
              query={{
                search_query,
                decision_number,
                start_date,
                end_date,
                decision_subject,
                search_field,
              }}
              initiaDecisions={decisions}
            />
          </main>
          <Footer />
        </>
      );
    } else {
      return (
        <>
          <ServerSideNavbar />
          <main className="pt-24 px-[5%]">
            <FirstPage />
            <SearchTab
              canAccessSupremeCourt={canAccessSupremeCourt}
              query={{ search_type }}
            />
            <NoService />
          </main>
          <Footer />
        </>
      );
    }
  } else {
    return (
      <>
        <ServerSideNavbar />
        <main className="pt-24 px-[5%]">
          <FirstPage />
          <SearchTab query={{ search_type }} />
        </main>
        <Footer />
      </>
    );
  }
};

export default SearchPage;
