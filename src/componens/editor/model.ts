import { attach, createEvent, createStore, Effect, scopeBind } from "effector";

export type Method =
  | "log"
  | "debug"
  | "info"
  | "warn"
  | "error"
  | "table"
  | "clear"
  | "time"
  | "timeEnd"
  | "count"
  | "assert";

export type SplitPanelParams = {
  isVisibleplayground: boolean;
  isVisibleConsole: boolean;
};

export type Language = "javascript" | "typescript";

export type Docs = {
  title: string;
  id: string;
  code: string;
  type: "ts" | "js";
};

export type Log = {
  id?: number;
  method: Method;
  data: any[];
};

export const changeDoc = createEvent<{ id: string; code: string }>();
export const deleteDoc = createEvent<string>();
export const createDoc = createEvent<{ id: string; title: string }>();

export const changeLanguage = createEvent<Language>();

export const changeSplitPanel = createEvent<keyof SplitPanelParams>();

export const addLog = createEvent<Log>();
export const clearLogs = createEvent();

export const $docs = createStore<Docs[]>([
  {
    id: "task1",
    title: "Задача по реакт.ts",
    type: "ts",
    code: `
    import React from 'react'
    import ReactDOM from "react-dom";

    const App = () => {
    const [counter, setCounter] = React.useState(1)
      return <div onClick={() => setCounter(counter + 1)}>counter {counter}</div>
    }

    console.log(1)
    console.info(2)
    console.error(3)

    const rootElement = document.getElementById("root")!;
    const root = ReactDOM.render(<App />, rootElement);
  `,
  },
  {
    id: "task2",
    title: "Задача на цикл.js",
    type: "js",
    code: `
    const a:number = 12
  `,
  },
])
  .on(changeDoc, (docs, { id, code }) => {
    return docs.map((doc) => (doc.id === id ? { ...doc, code } : doc));
  })
  .on(deleteDoc, (docs, id) => docs.filter((doc) => doc.id !== id))
  .on(createDoc, (docs, { id, title }) => [
    ...docs,
    {
      id,
      title,
      code: "",
      type: title.trim().split(".").pop() as Docs["type"],
    },
  ]);

export const $language = createStore<Language>("typescript").on(
  changeLanguage,
  (_, lng) => lng
);

export const $splitPanelParams = createStore<SplitPanelParams>({
  isVisibleplayground: true,
  isVisibleConsole: true,
}).on(changeSplitPanel, (params, key) => ({ ...params, [key]: !params[key] }));

export const $logs = createStore<Log[]>([])
  .on(addLog, (logs, log) => [...logs, log])
  .reset(clearLogs);
