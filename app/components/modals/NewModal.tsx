"use client";

import { useCallback, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";

interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    body?: React.ReactElement;
    disabled?: boolean;
}

const NewModal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    body,
    disabled,
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
                bg-gray-800/50 backdrop-blur-sm
              "
            >
                <div
                    className={`
                        relative  rounded-lg
                        w-full
                        md:w-4/6
                        lg:w-3/6
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
                            overflow-auto
                            lg:h-auto
                            md:h-auto
                            border-0 
                            shadow-lg 
                            relative 
                            flex rounded-lg
                            flex-col 
                            w-full 
                            bg-white dark:bg-gray-700
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
                                {body}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NewModal;
