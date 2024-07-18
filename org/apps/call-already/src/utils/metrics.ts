import mixpanel from "mixpanel-browser";
import { env } from "./utils";

export const initAnalytics = () => {
  mixpanel.init("c429828f09fb8a51b70524f0dba6e05f", {
    debug: true,
    track_pageview: true,
    persistence: "localStorage",
  });
}

export const emitAnalytic = (eventName: string) => {
  mixpanel.track(eventName, {
    env: env,
  });
};
