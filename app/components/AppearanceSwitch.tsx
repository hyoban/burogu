"use client";

import { useDark } from "@/app/hooks/useDark";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const ApperanceSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const [isDark, toggleDark] = useDark();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <button onClick={toggleDark}>
      <motion.div
        className={
          !mounted
            ? "i-carbon-contrast"
            : isDark
            ? "i-carbon-moon"
            : "i-carbon-sun"
        }
        animate={{
          rotate: isDark ? 0 : 360,
        }}
        transition={{
          duration: 0.5,
        }}
      />
    </button>
  );
};

export default ApperanceSwitch;
