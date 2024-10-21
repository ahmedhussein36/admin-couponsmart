import React from "react";
import { Controller } from "react-hook-form";
import { Editor } from "@tinymce/tinymce-react";
import { useTheme } from "next-themes";

interface RTEProps {
    name: string;
    control: any;
    label: string;
    defaultValue: string;
    dark: boolean;
}

function RTE({ name, control, label, defaultValue = "", dark }: RTEProps) {
    const { theme, setTheme } = useTheme();
    return (
        <div className="">
            {label && (
                <label className="inline-block font-medium mb-1 ">
                    {" "}
                    {label}
                </label>
            )}
            <Controller
                name={name || "content"}
                control={control}
                render={({ field: { onChange } }) => (
                    <Editor
                        initialValue={defaultValue}
                        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                        init={{
                            branding: false,
                            height: 500,
                            menubar: true,
                            plugins: [
                                "image",
                                "advlist",
                                "autolink",
                                "lists",
                                "link",
                                "image",
                                "charmap",
                                "preview",
                                "anchor",
                                "searchreplace",
                                "visualblocks",
                                "code",
                                "fullscreen",
                                "insertdatetime",
                                "media",
                                "table",
                                "code",
                                "help",
                                "wordcount",
                                "anchor",
                            ],
                            skin: theme === "dark" ? "oxide-dark" : "snow",
                            content_css: theme === "dark" ? "dark" : "default",
                            toolbar:
                                "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                        }}
                        onEditorChange={onChange}
                    />
                )}
            />
        </div>
    );
}

export default RTE;
