"use client";

import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

export default function TopLoader() {
    return (
        <ProgressBar
            height="2px"
            color="#a3e635"
            options={{ showSpinner: false }}
            shallowRouting
            spinnerPosition="top-right"
        />
    );
}
