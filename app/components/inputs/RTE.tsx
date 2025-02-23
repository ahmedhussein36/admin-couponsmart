"use client";

import { useEffect, useState } from "react";
import { Controller } from "react-hook-form";
import dynamic from "next/dynamic";
import { IAllProps } from "@tinymce/tinymce-react";

const Editor = dynamic(
    () =>
        import("@tinymce/tinymce-react").then(
            (mod) => mod.Editor as React.ComponentType<IAllProps>
        ),
    {
        ssr: false,
    }
);

interface RichTextEditorProps {
    name: string;
    control: any;
    label?: string;
}

const RichTextEditor = ({ name, control, label }: RichTextEditorProps) => {
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        setLoaded(true);
    }, []);

    if (!loaded) return <p>Loading editor...</p>;

    return (
        <div className="flex flex-col gap-2">
            {label && <label className="font-medium">{label}</label>}
            <Controller
                name={name}
                control={control}
                render={({ field }) => (
                    <Editor
                        apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
                        value={field.value}
                        onEditorChange={field.onChange}
                        init={{
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
                            toolbar:
                                "undo redo | formatselect| blocks fontfamily fontsize | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify lineheight| " +
                                "bullist numlist outdent indent | forecolor backcolor | link image media |table| " +
                                "removeformat | code fullscreen preview",
                            toolbar_mode: "wrap",

                            content_style:
                                "body { font-family: 'Inter', sans-serif; font-size: 16px; }",
                        }}
                    />
                )}
            />
        </div>
    );
};

export default RichTextEditor;
