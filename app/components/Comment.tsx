"use client";

import { useEffect } from "react";

import siteMetadata from "@/site.config.cjs";

import { useDark } from "../hooks/useDark";

export const Giscus = () => {
  const {
    repo,
    repositoryId,
    category,
    categoryId,
    mapping,
    reactions,
    metadata,
    inputPosition,
    lang,
  } = siteMetadata?.comment?.giscusConfig;

  const [isDark] = useDark();

  const commentsTheme = isDark
    ? siteMetadata.comment.giscusConfig.darkTheme
    : siteMetadata.comment.giscusConfig.theme;

  const COMMENTS_ID = "comments-container";

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.setAttribute("data-repo", repo);
    script.setAttribute("data-repo-id", repositoryId);
    script.setAttribute("data-category", category);
    script.setAttribute("data-category-id", categoryId);
    script.setAttribute("data-mapping", mapping);
    script.setAttribute("data-reactions-enabled", reactions);
    script.setAttribute("data-emit-metadata", metadata);
    script.setAttribute("data-input-position", inputPosition);
    script.setAttribute("data-lang", lang);
    script.setAttribute("data-theme", commentsTheme);
    script.setAttribute("crossorigin", "anonymous");
    script.async = true;

    const comments = document.getElementById(COMMENTS_ID);
    if (comments) comments.appendChild(script);

    return () => {
      const comments = document.getElementById(COMMENTS_ID);
      if (comments) comments.innerHTML = "";
    };
  }, []);

  useEffect(() => {
    function sendMessage(message: any) {
      const iframe = document.querySelector(
        "iframe.giscus-frame"
      ) as HTMLIFrameElement;
      if (!iframe) return;
      iframe.contentWindow?.postMessage(
        { giscus: message },
        "https://giscus.app"
      );
    }

    sendMessage({
      setConfig: {
        theme: commentsTheme,
      },
    });
  }, [commentsTheme]);

  return <div className="giscus w-full" id={COMMENTS_ID} />;
};
