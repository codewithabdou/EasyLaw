import getLawSearchResults from "@actions/getLawSearchResults";
import getLawResults from "@actions/getLawSearchResults";
import { Button } from "@components/ui/button";
import Footer from "@components/user/layout/Footer";
import ServerSideNavbar from "@components/user/layout/ServerSideNavbar";
import LawDetails from "@components/user/shared/LawDecisionDetails";
import LawDecision from "@typings/LawDecision";
import { MdShare, MdDownload, MdCopyAll, MdSave, MdLink } from "react-icons/md";

const LawDetailsPage = async ({
    params,
}: {
        params: { text_number: string };
}) => {


    const text_number = params.text_number;
    const data = await getLawSearchResults(
        undefined,
        undefined,
        undefined,
        text_number,
        undefined,
        {
            from: undefined,
            to: undefined,
        },
        {
            from: undefined,
            to: undefined,
        },
        1
    );

    const decision: LawDecision = data?.data[1];

    const operations = [
        <MdShare size={20} />,
        <MdDownload size={20} />,
        <MdCopyAll size={20} />,
        <MdSave size={20} />,
        <MdLink size={20} />,
    ];

    return (
        <>
            <ServerSideNavbar />
            <main className="pt-24 px-[5%]">
                <h1 className="text-primary py-4 font-bold text-4xl ">التفاصيل</h1>
                <div className="flex justify-end">
                    {operations.map((operation, index) => (
                        <Button variant={"ghost"} key={index} className="text-primary">
                            {operation}
                        </Button>
                    ))}
                </div>
                <div className="bg-primary w-full h-1 rounded-md mt-1 mb-4" />
                <LawDetails decision={decision} />
            </main>
            <Footer />
        </>
    );
};

export default LawDetailsPage;
