import { useEffect } from "react";
import ReactGA from "react-ga4";
import { ENV_MODE, GA_TRACKING_ID } from "../constants";
import { useStore } from "../store";

interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

const initGA = () => {
  ReactGA.initialize(GA_TRACKING_ID);
  ReactGA.set({ anonymizeIp: true });
};

export const useSetAnalyticsConsent = () => {
  const setCookieConsent = useStore((state) => state.setCookieConsent);
  const setAskedForConsent = useStore((state) => state.setAskedForConsent);

  return (hasConsent: boolean) => {
    if (ENV_MODE !== "production") {
      setCookieConsent(hasConsent);
      setAskedForConsent(true);
      return;
    }

    if (hasConsent) {
      initGA();
    }
    setCookieConsent(hasConsent);
    setAskedForConsent(true);
  };
};

export const useInitAnalytics = () => {
  const setCookieConsent = useStore((state) => state.setCookieConsent);
  const setAskedForConsent = useStore((state) => state.setAskedForConsent);

  useEffect(() => {
    if (ENV_MODE !== "production") {
      return;
    }
    const cookienames = ["_ga", "_gid", "_gat"];
    const cookies = document.cookie.split(";");

    const cookieMap = cookies.reduce((acc: string[], cookie) => {
      const [name, _value] = cookie.split("=");
      if (cookienames.includes(name.slice(0, 3))) {
        return [...acc, name];
      }
      return acc;
    }, []);

    const hasConsent = cookieMap.length > 0;
    if (hasConsent) {
      initGA();
      setAskedForConsent(true);
    }

    setCookieConsent(hasConsent);
  }, [setAskedForConsent, setCookieConsent]);
};

export const useLogAnalyticsEvent = (initialised: boolean) => {
  // TODO: Define places where we want to log events

  const logEvent = ({ category, action, label, value }: AnalyticsEvent) => {
    if (initialised) {
      ReactGA.event({ category, action, label, value });
    }
  };
  return logEvent;
};
