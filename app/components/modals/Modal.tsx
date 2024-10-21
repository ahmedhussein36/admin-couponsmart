"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

import Button from "../buttons/Button";

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    confirm?: boolean;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel?: any;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
}

const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    confirm,
    title,
    body,
    actionLabel,
    footer,
    disabled,
    secondaryAction,
    secondaryActionLabel,
}) => {
    const [showModal, setShowModal] = useState(isOpen);

    useEffect(() => {
        setShowModal(isOpen);
    }, [isOpen]);

    const handleClose = useCallback(() => {
        if (disabled) {
            return;
        }

        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300);
    }, [onClose, disabled]);

    const handleSubmit = useCallback(() => {
        if (disabled) {
            return;
        }

        onSubmit();
    }, [onSubmit, disabled]);

    const handleSecondaryAction = useCallback(() => {
        if (disabled || !secondaryAction) {
            return;
        }

        secondaryAction();
    }, [secondaryAction, disabled]);

    if (!isOpen) {
        return null;
    }

    return (
        <>
            <div
                className="
                justify-center 
                items-center 
                flex
                overflow-x-hidden
                overflow-y-hidden
                fixed 
                inset-0 
                z-[999] transition-all duration-300 ease-out
                outline-none 
                focus:outline-none
                bg-slate-700/50 backdrop-blur-sm
              "
            >
                <div
                    className={`
                        relative  rounded-lg
                        w-full
                        md:w-4/6
                        lg:w-3/6
                        ${confirm ? "xl:max-w-[480px] lg:max-w-[500px] md:max-w-[500px]" : " xl:w-2/5"}
                        my-6
                        mx-auto 
                        h-auto 
                        lg:h-auto
                        md:h-auto max-h-[95vh]
                    `}
                >
                    {/*content*/}
                    <div
                        className={`
                        duration-300 transition-all
                        h-full
                        ${
                            showModal
                                ? "ease-out scale-[100%] opacity-100"
                                : "ease-in scale-[90%] opacity-0"
                        } 
                      `}
                    >
                        <div
                            className={`
                            h-full max-h-[95vh] overflow-auto
                            lg:h-auto
                            md:h-auto
                            border-0 
                            ${confirm ? "rounded-2xl" : "rounded-lg"}
                            shadow-lg 
                            relative 
                            flex 
                            flex-col 
                            w-full 
                            bg-white dark:bg-gray-800
                            outline-none 
                            focus:outline-none
                          `}
                        >
                            {/*header*/}
                            <div
                                className="
                                flex 
                                items-center 
                                p-6
                                rounded-t
                                justify-center
                                relative
                                border-b-[1px] dark:border-neutral-500
                                "
                            >
                                <button
                                    className="
                                    p-1
                                    border-0 rounded-full
                                    hover:bg-gray-200 bg-gray-100 dark:bg-slate-600
                                    transition
                                    absolute
                                    right-4
                                  "
                                    onClick={handleClose}
                                >
                                    <IoMdClose size={24} />
                                </button>
                            </div>
                            {/*body*/}
                            <div className=" w-full text-center relative flex-auto p-3 md:p-6 ">
                                <div className="text-xl my-2 font-semibold ">
                                    {title}
                                </div>
                                {body}
                            </div>
                            {/*footer*/}
                            <div className="flex flex-col gap-2 p-3 md:pb-6 pt-0 ">
                                <div
                                    className="
                                            flex 
                                            flex-row 
                                            items-center justify-center
                                            gap-4 
                                            w-full
                                            h-[59.2px]
                                            mb-3 mt-0 pt-0
                                            px-2 md:px-5 lg:px-5 xl:px-5
                                        "
                                >
                                    {secondaryActionLabel && (
                                        <Button
                                            disabled={disabled}
                                            onClick={
                                                secondaryAction
                                                    ? handleSecondaryAction
                                                    : handleClose
                                            }
                                            outline
                                        >
                                            {secondaryActionLabel}
                                        </Button>
                                    )}
                                    <Button
                                        disabled={disabled}
                                        onClick={handleSubmit}
                                    >
                                        {actionLabel}
                                    </Button>
                                </div>
                                {footer}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Modal;
