import React, { FC } from "react";
import useConfirm from "@/app/hooks/useConfirm";
import NewModal from "./modals/NewModal";

interface Props {
    body?: React.ReactElement;
}

const PasswordChangeModal: FC<Props> = ({ body }) => {
    const newConfirm = useConfirm();
    return (
        <NewModal
            body={body}
            isOpen={newConfirm.isOpen}
            onClose={newConfirm.onClose}
        />
    );
};

export default PasswordChangeModal;
