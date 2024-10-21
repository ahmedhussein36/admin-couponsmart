import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Faq } from "@/app/types";

const useFAQManager = (name: string) => {
    const [count, setCount] = useState(1);
    const [buttonLabel, setButtonLabel] = useState("save");
    const [FaqId, setFaqId] = useState<number>();
    const { watch, setValue, getValues } = useFormContext();
    const question: string = watch("question");
    const answer: string = watch("answer");
    const faqs: Faq[] = watch("faqs");

    const handelSaveFAQ = () => {
        setCount((count) => count + 1);
        const newFAQ = {
            id: count,
            question: question,
            answer: answer,
        };
        const currentValues = getValues(name) || [];
        setValue(name, [...currentValues, newFAQ]);
        setValue("question", "");
        setValue("answer", "");
    };

    const handelRemove = (id: number) => {
        setValue(
            name,
            getValues(name).filter((faq: Faq) => faq.id !== id)
        );
    };

    const handleEdit = (id: number) => {
        setButtonLabel("update");
        setFaqId(id);
        const currentItem = getValues(name).filter((faq: Faq) => faq.id === id);
        setValue("question", currentItem[0].question);
        setValue("answer", currentItem[0].answer);
    };

    const handleUpdate = () => {
        const updatedFaq = {
            id: FaqId,
            question: question,
            answer: answer,
        };
        const currentValues = getValues(name) || [];
        const updatedValues = currentValues.map((faq: Faq) =>
            faq.id === FaqId ? updatedFaq : faq
        );
        setValue(name, [...updatedValues]);
        setValue("question", "");
        setValue("answer", "");
        setButtonLabel("save");
    };

    return {
        faqs,
        question,
        answer,
        buttonLabel,
        handelSaveFAQ,
        handelRemove,
        handleEdit,
        handleUpdate,
    };
};

export default useFAQManager;
