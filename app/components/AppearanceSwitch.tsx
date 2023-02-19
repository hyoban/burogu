"use client";

import { useEffect, useState } from "react";

import { useDark } from "@/app/hooks/useDark";

const ApperanceSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const [isDark, toggleDark] = useDark();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button onClick={toggleDark}>
      {!mounted ? (
        <div className={"i-carbon-sun"} />
      ) : (
        <div className={isDark ? "i-carbon-moon" : "i-carbon-sun"} />
      )}
    </button>
  );
};

export default ApperanceSwitch;
