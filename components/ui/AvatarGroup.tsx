import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Member {
    name: string;
    image?: string;
}

interface AvatarGroupProps {
    members: Member[];
    limit?: number;
    size?: "sm" | "md" | "lg";
}

export function AvatarGroup({
    members,
    limit = 3,
    size = "md",
}: AvatarGroupProps) {
    const visibleMembers = members.slice(0, limit);
    const excess = Math.max(members.length - limit, 0);

    const sizeClasses = {
        sm: "h-8 w-8 text-xs",
        md: "h-10 w-10 text-sm",
        lg: "h-12 w-12 text-base",
    };

    const groupStyles = {
        sm: "-space-x-3",
        md: "-space-x-4",
        lg: "-space-x-5",
    };

    return (
        <div className={`flex ${groupStyles[size]}`}>
            {visibleMembers.map((member, index) => (
                <Avatar
                    key={index}
                    className={`${
                        sizeClasses[size]
                    } border-2 border-background ${
                        index !== 0 ? "ring-2 ring-background" : ""
                    }`}
                >
                    {member.image ? (
                        <AvatarImage src={member.image} alt={member.name} />
                    ) : (
                        <AvatarFallback>
                            {member.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")
                                .toUpperCase()}
                        </AvatarFallback>
                    )}
                </Avatar>
            ))}
            {excess > 0 && (
                <div
                    className={`${sizeClasses[size]} bg-muted text-muted-foreground flex items-center justify-center rounded-full border-2 border-background font-medium ring-2 ring-background`}
                >
                    +{excess}
                </div>
            )}
        </div>
    );
}
