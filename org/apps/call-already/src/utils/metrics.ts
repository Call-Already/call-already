import mixpanel from "mixpanel-browser";
import { env } from "./utils";

export const initAnalytics = () => {
  mixpanel.init(process.env.NX_PUBLIC_MIXPANEL_TOKEN as string, {
    debug: true,
    track_pageview: true,
    persistence: "localStorage",
  });
};

export const emitAnalytic = (eventName: string) => {
  mixpanel.track(eventName, {
    env: env,
  });
};
