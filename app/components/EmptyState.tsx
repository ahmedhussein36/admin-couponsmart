"use client";

import { useRouter } from "next/navigation";

import Button from "./buttons/Button";
import Heading from "./headings/Heading";

interface EmptyStateProps {
    title?: string;
    subtitle?: string;
    showReset?: boolean;
    data?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    title = "No Available Data !",
    subtitle = `Looks like No Data has been added `,
    showReset,
}) => {
    const router = useRouter();

    return (
        <div
            className="
        flex 
        flex-col m-4 p-4 h-[200px]
        gap-2 w-full
        justify-start 
        items-start 
      "
        >
            <Heading title={title} subtitle={subtitle} />
            <div className="w-48 mt-4">
                {showReset && (
                    <Button outline onClick={() => router.push("/")}>
                        Back to Home
                    </Button>
                )}
            </div>
        </div>
    );
};

export default EmptyState;
