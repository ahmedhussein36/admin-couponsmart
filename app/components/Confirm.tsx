import Modal from "@/app/components/modals/Modal";
import React, { FC, useState } from "react";
import useConfirm from "@/app/hooks/useConfirm";

interface Props {
    onDelete: () => void;
    isLoading: boolean;
}

const Confirm: FC<Props> = ({ onDelete, isLoading }) => {
    const newConfirm = useConfirm();
    return (
        <Modal
            confirm
            title={"Do you want to delete the selected item ?"}
            disabled={isLoading}
            isOpen={newConfirm.isOpen}
            actionLabel={
                isLoading ? (
                    <div className="flex justify-center items-center gap-2">
                        <span className="">Deleting</span>
                    </div>
                ) : (
                    "Delete"
                )
            }
            secondaryActionLabel="Cancel"
            onClose={newConfirm.onClose}
            onSubmit={onDelete}
        />
    );
};

export default Confirm;
