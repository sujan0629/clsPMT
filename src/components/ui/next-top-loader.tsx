"use client";

import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";

export function NextTopLoader() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // List of paths to skip
  const blockedPaths = ["/", "/user/login", "/admin/login"];
  const isBlocked = blockedPaths.includes(pathname);

  useEffect(() => {
    if (isBlocked) return;
    NProgress.done();
  }, [pathname, searchParams, isBlocked]);

  useEffect(() => {
    if (isBlocked) return;

    const handleAnchorClick = (event: MouseEvent) => {
      const targetUrl = (event.currentTarget as HTMLAnchorElement).href;
      const currentUrl = window.location.href;
      if (targetUrl !== currentUrl) {
        NProgress.start();
      }
    };

    const handleMutation: MutationCallback = () => {
      const anchorElements = document.querySelectorAll("a");
      anchorElements.forEach((anchor) =>
        anchor.addEventListener("click", handleAnchorClick)
      );
    };

    const mutationObserver = new MutationObserver(handleMutation);
    mutationObserver.observe(document, { childList: true, subtree: true });

    handleMutation([], mutationObserver);

    return () => {
      mutationObserver.disconnect();
    };
  }, [isBlocked]);

  return null;
}
