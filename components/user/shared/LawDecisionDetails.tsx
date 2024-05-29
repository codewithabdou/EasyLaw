import LawDecision from "@typings/LawDecision";
import React from "react";

const LawDecisionDetails = ({ decision }: { decision: LawDecision }) => {

    return (
        <div className="flex flex-col space-y-8 rounded-md bg-slate-100 lg:w-[70%] py-8 px-3 md:px-[2%]">
            <div className="space-y-8">
                <p className="text-primary text-center font-bold text-xl">
                    الجمهورية الجزائرية الديمقراطية الشعبية
                </p>
                <h1 className="text-primary font-bold text-2xl">{` الصادر بتاريخ ${decision.journal_date}`}</h1>
            </div>
            <div className="space-y-1">
                <div className="flex  ">
                    <p className="font-medium  min-w-[15ch] text-[#2C3E54]">
                        التفاصيل:
                    </p>
                    <p className="text-[#316E83] font-semibold">{decision.content}</p>
                </div>
                <div className="flex  ">
                    <p className="font-medium  min-w-[15ch] text-[#2C3E54]">
                       التفاصيل التفاصيل:
                    </p>
                    <p className="text-[#316E83] font-semibold">{decision.long_content}</p>
                </div>
                </div>

        </div>
    );
};

export default LawDecisionDetails;
