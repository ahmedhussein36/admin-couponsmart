"use client";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToasterProvider = () => {
    return (
        <ToastContainer
            newestOnTop
            autoClose={8000}
            theme={"light"}
            position="bottom-right"
            style={{
                width: "380px",
            }}
        />
    );
};

export default ToasterProvider;
