// import { Skeleton } from "@/components/ui/skeleton";

import { Skeleton } from "@/components/ui/Skeleton";

export default function loaing() {
    return (
        <div className="space-y-6">
            {/* Header Skeleton */}
            <div className="flex justify-between items-center">
                <div className="space-y-2">
                    <Skeleton className="h-8 w-32" />
                    <div className="flex gap-2">
                        <Skeleton className="h-6 w-24" />
                        <Skeleton className="h-6 w-24" />
                    </div>
                </div>
                <Skeleton className="h-10 w-36" />
            </div>

            {/* Tabs Skeleton */}
            <div className="flex gap-4 border-b">
                {[1, 2, 3, 4].map((i) => (
                    <Skeleton key={i} className="h-10 w-24" />
                ))}
            </div>

            {/* Filters Skeleton */}
            <div className="flex flex-wrap gap-4">
                <Skeleton className="h-10 w-[250px]" />
                <Skeleton className="h-10 w-[180px]" />
                <Skeleton className="h-10 w-[180px]" />
                <Skeleton className="h-10 w-[180px]" />
                <div className="flex gap-2 ml-auto">
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-24" />
                    <Skeleton className="h-10 w-32" />
                </div>
            </div>

            {/* Table Skeleton */}
            <div className="border rounded-lg">
                <div className="grid grid-cols-8 gap-4 p-4 border-b bg-muted/5">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                        <Skeleton key={i} className="h-4" />
                    ))}
                </div>
                {[1, 2, 3].map((row) => (
                    <div
                        key={row}
                        className="grid grid-cols-8 gap-4 p-4 border-b"
                    >
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((cell) => (
                            <Skeleton key={cell} className="h-4" />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
}
