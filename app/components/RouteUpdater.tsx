"use client";

import { useOnComplete } from "@/app/hooks/routerEvent";

const RouteUpdater = () => {
  useOnComplete();
  return null;
};

export default RouteUpdater;
