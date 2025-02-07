"use client"

import { useState, useEffect } from 'react';

const stripHtmlTags = (html: string) => {
  if (typeof window !== "undefined") {
    const div = document.createElement("div");
    div.innerHTML = html;
    return div.textContent || div.innerText || "";
  }
  return "";
};

const getFirstParagraph = (text: string) => {
  const paragraphs = text.split("\n").filter((p) => p.trim() !== "");
  return paragraphs.length > 0 ? paragraphs[0] : "";
};

const getSnippet = (html: string, maxLength: number = 150) => {
  const plainText = stripHtmlTags(html);
  const firstParagraph = getFirstParagraph(plainText);
  return firstParagraph.length > maxLength
    ? firstParagraph.slice(0, maxLength) + "..."
    : firstParagraph;
};

// Custom Hook
export const useTextSnippet = (htmlContent: string, maxLength: number = 150) => {
  const [snippet, setSnippet] = useState("");

  useEffect(() => {
    const snippetText = getSnippet(htmlContent, maxLength);
    setSnippet(snippetText);
  }, [htmlContent, maxLength]);

  return snippet; // Returning plain text only
};
