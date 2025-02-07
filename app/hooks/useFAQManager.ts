import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { Faq } from "@/app/types";

const useFAQManager = (name: string) => {
    const [faqId, setFaqId] = useState<number | null>(null);
    const [buttonLabel, setButtonLabel] = useState("save");
    const { watch, setValue, getValues } = useFormContext();

    const question = watch("question", "");
    const answer = watch("answer", "");
    const faqs: Faq[] = watch(name);

    const handleSaveFAQ = () => {
        if (!question.trim() || !answer.trim()) return;

        const newFAQ: Faq = {
            id: Date.now(), // استخدام timestamp لتجنب التعارض
            question,
            answer,
        };

        setValue(name, [...faqs, newFAQ]);
        resetFields();
    };

    const handleRemove = (id: number) => {
        setValue(
            name,
            faqs.filter((faq) => faq.id !== id)
        );
    };

    const handleEdit = (id: number) => {
        const currentItem = faqs.find((faq) => faq.id === id);
        if (!currentItem) return;

        setButtonLabel("update");
        setFaqId(id);
        setValue("question", currentItem.question);
        setValue("answer", currentItem.answer);
    };

    const handleUpdate = () => {
        if (!faqId || !question.trim() || !answer.trim()) return;

        const updatedFaqs = faqs.map((faq) =>
            faq.id === faqId ? { ...faq, question, answer } : faq
        );

        setValue(name, updatedFaqs);
        resetFields();
    };

    const resetFields = () => {
        setValue("question", "");
        setValue("answer", "");
        setButtonLabel("save");
        setFaqId(null);
    };

    return {
        faqs,
        question,
        answer,
        buttonLabel,
        handleSaveFAQ,
        handleRemove,
        handleEdit,
        handleUpdate,
    };
};

export default useFAQManager;
