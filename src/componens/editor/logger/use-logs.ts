import { useLayoutEffect } from "react";
import { useUnit } from "effector-react";
import { $logs, addLog, clearLogs, Log } from "../model";

function logger(mt: any, event: (payload: Log) => Log) {
  return (...args: any[]) => {
    const method = mt.toString();

    event({ method, data: args });
  };
}

const consoleMap = (event: (payload: Log) => Log) => {
  const console: { [key: string]: any } = {} as Console;

  for (const method in global.console) {
    const logFn = logger(method, event);

    console[method] = logFn;
  }

  console.assert = (condition: boolean, ...args: any[]) => {
    if (!condition) {
      /* chrome behavior */
      if (args.length === 0) args = ["console.assert"];
      /*
        console substitutions like %s
        works only in first argument of console.error
      */
      if (typeof args[0] === "string") {
        console.error(`Assertion failed: ${args[0]}`, ...args.slice(1));
      } else {
        console.error("Assertion failed:", ...args);
      }
    }
  };

  for (const method in console) {
    // @ts-ignore
    window.console[method] = console[method];
  }
};

export const useLogs = () => {
  const logs = useUnit($logs);
  const handleAddLog = useUnit(addLog);

  useLayoutEffect(() => {
    consoleMap(handleAddLog);

    return () => {
      clearLogs();
    };
  }, [handleAddLog]);

  return logs;
};
