// components/FAQList.js
import { Faq } from "@/app/types";
import { useTranslations } from "next-intl";

interface ListProps {
    faqs: Faq[];
    handleRemove: (id: number) => void;
    handleEdit: (id: number) => void;
}

const FAQList = ({ faqs, handleRemove, handleEdit }: ListProps) => {
    const t = useTranslations();
    return (
        <div className=" relative w-full ">
            {faqs &&
                faqs.map((faq, index) => (
                    <div
                        key={faq.id}
                        className="relative flex flex-col justify-start items-start rounded-md gap-1 p-2 my-2 bg-slate-100 dark:bg-gray-700/50 text-neutral-500 dark:text-neutral-300"
                    >
                        <div className=" flex justify-start items-center gap-2">
                            <span>
                                {t("SEO.question")}
                            </span>
                            <span>:</span>
                            <h3 className=" font-semibold">{faq.question}</h3>
                        </div>
                        <div className=" flex justify-start items-center gap-2">
                            <span>
                                {t("SEO.answer")}
                            </span>
                            <span>:</span>
                            <p className=" text-sm">{faq.answer}</p>
                        </div>
                        <div className=" w-full flex justify-end items-end gap-3">
                            <button
                                onClick={() => handleRemove(faq.id)}
                                type="button"
                                className="text-red-500 font-semibold p-1 text-xs hover:underline "
                            >
                                {t("tools.remove")}
                            </button>
                            <button
                                onClick={() => handleEdit(faq.id)}
                                type="button"
                                className=" font-semibold p-1 text-xs hover:underline "
                            >
                                {t("tools.edit")}
                            </button>
                        </div>
                    </div>
                ))}
        </div>
    );
};

export default FAQList;
