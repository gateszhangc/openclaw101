"use client";

import { useEffect } from "react";

type DeferredAnalyticsProps = {
  gaTrackingId?: string;
  clarityProjectId?: string;
};

type AnalyticsWindow = Window & {
  clarity?: (...args: unknown[]) => void;
  dataLayer?: unknown[];
  gtag?: (...args: unknown[]) => void;
};

const ACTIVATION_EVENTS = ["pointerdown", "keydown", "touchstart"] as const;
const FALLBACK_TIMEOUT_MS = 30_000;

function appendScript(id: string, src: string) {
  if (document.getElementById(id)) {
    return;
  }

  const script = document.createElement("script");
  script.id = id;
  script.async = true;
  script.src = src;
  document.head.appendChild(script);
}

function loadGoogleAnalytics(trackingId: string) {
  const analyticsWindow = window as AnalyticsWindow;
  analyticsWindow.dataLayer = analyticsWindow.dataLayer || [];
  analyticsWindow.gtag =
    analyticsWindow.gtag ||
    function gtag(...args: unknown[]) {
      analyticsWindow.dataLayer?.push(args);
    };

  analyticsWindow.gtag("js", new Date());
  analyticsWindow.gtag("config", trackingId);
  appendScript("ga4-script", `https://www.googletagmanager.com/gtag/js?id=${trackingId}`);
}

function loadClarity(projectId: string) {
  const analyticsWindow = window as AnalyticsWindow;

  if (!analyticsWindow.clarity) {
    analyticsWindow.clarity = (...args: unknown[]) => {
      const clarityQueue = analyticsWindow.clarity as ((...innerArgs: unknown[]) => void) & {
        q?: unknown[][];
      };
      clarityQueue.q = clarityQueue.q || [];
      clarityQueue.q.push(args);
    };
  }

  appendScript("clarity-script", `https://www.clarity.ms/tag/${projectId}`);
}

export function DeferredAnalytics({
  gaTrackingId,
  clarityProjectId,
}: DeferredAnalyticsProps) {
  useEffect(() => {
    if (!gaTrackingId && !clarityProjectId) {
      return;
    }

    let activated = false;

    const activate = () => {
      if (activated) {
        return;
      }

      activated = true;

      if (gaTrackingId) {
        loadGoogleAnalytics(gaTrackingId);
      }

      if (clarityProjectId) {
        loadClarity(clarityProjectId);
      }
    };

    const cleanupEvents = ACTIVATION_EVENTS.map((eventName) => {
      const handler = () => activate();
      window.addEventListener(eventName, handler, { passive: true });

      return () => window.removeEventListener(eventName, handler);
    });

    const timeoutId = window.setTimeout(activate, FALLBACK_TIMEOUT_MS);

    return () => {
      window.clearTimeout(timeoutId);

      for (const cleanup of cleanupEvents) {
        cleanup();
      }
    };
  }, [clarityProjectId, gaTrackingId]);

  return null;
}
