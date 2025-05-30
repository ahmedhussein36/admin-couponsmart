"use client";

import React, { useState, useEffect } from "react";
import TableSkelton from "./TableSkelton";

interface ClientOnlyProps {
    children: React.ReactNode;
}

const ClientOnly: React.FC<ClientOnlyProps> = ({ children }) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) return <TableSkelton />;

    return <>{children}</>;
};

export default ClientOnly;
