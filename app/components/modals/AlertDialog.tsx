"use client";
import React, { FC, useCallback, useEffect, useState } from "react";
interface ModalProps {
    isOpen?: boolean;
    onClose: () => void;
    onSubmit: () => void;
    title?: string;
    body?: React.ReactElement;
    footer?: React.ReactElement;
    actionLabel: string;
    disabled?: boolean;
    secondaryAction?: () => void;
    secondaryActionLabel?: string;
}
const AlertDialog: FC<ModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
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
    z-[999]
    outline-none 
    focus:outline-none
    bg-neutral-800/30
  "
            >
                <div
                    className="
      relative  rounded-lg
      p-
      w-full
      md:w-4/6
      lg:w-3/6
      xl:w-2/5
      my-6
      mx-auto 
      h-auto 
      lg:h-auto
      md:h-auto max-h-[95vh]
      "
                >
                    {/*content*/}
                    <div
                        className={`
            translate
            duration-300
            h-full
            ${showModal ? "translate-y-0" : "translate-y-24"}
            ${showModal ? "opacity-100" : "opacity-0"}
          `}
                    >
                        <div
                            className="
                            translate
                            h-full
                            lg:h-auto
                            md:h-auto
                            border-0 
                            rounded-lg 
                            shadow-lg 
                            relative 
                            flex 
                            flex-col 
                            w-full 
                            bg-white 
                            outline-none 
                            focus:outline-none
                          "
                        >
                            
                        </div>
                    </div>
                </div>{" "}
            </div>
        </>
    );
};

export default AlertDialog;
