"use client";
import React from "react";
import Input from "../inputs/Input";
import Collaps from "../collapse/Collaps";
import Button from "../buttons/Button";
import FAQList from "./FAQList";
import { useTranslations } from "next-intl";
import useFAQManager from "@/app/hooks/useFAQManager";

const Question = ({ name }: { name: string }) => {
    const t = useTranslations();
    const {
        faqs,
        question,
        answer,
        buttonLabel,
        handleSaveFAQ,
        handleRemove,
        handleEdit,
        handleUpdate,
    } = useFAQManager(name);

    return (
        <div className="w-full bg-white dark:bg-transparent flex p-4 flex-col gap-4 border-b dark:border-neutral-500 rounded-">
            <Collaps title={t("SEO.add faq questions")}>
                <div className="grid grid-col-1 lg:grid-cols-2 gap-6 rounded-lg bg-white dark:bg-transparent">
                    <div className="w-full col-span-1 flex flex-col justify-start items-start gap-6">
                        <Input
                            name={"question"}
                            label={t("SEO.question")}
                            className="border text-base"
                        />
                        <Input
                            name={"answer"}
                            label={t("SEO.answer")}
                            className="border text-base"
                        />
                        <Button
                            disabled={!question || !answer}
                            onClick={
                                buttonLabel === "save"
                                    ? handleSaveFAQ
                                    : handleUpdate
                            }
                        >
                            {t("buttons." + buttonLabel)}
                        </Button>
                    </div>
                    <div className="col-span-1">
                        <FAQList
                            faqs={faqs}
                            handleRemove={handleRemove}
                            handleEdit={handleEdit}
                        />
                    </div>
                </div>
            </Collaps>
        </div>
    );
};

export default Question;
