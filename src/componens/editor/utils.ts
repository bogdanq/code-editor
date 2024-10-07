import { Language } from "./model";

export const languages: { value: Language; label: string }[] = [
  { value: "javascript", label: "JavaScript" },
  { value: "typescript", label: "TypeScript" },
];

const mapLangToFile: { [key: string]: Language } = {
  js: "javascript",
  ts: "typescript",
};

export const mapEditorLangToFile = (lang: string) => {
  return mapLangToFile[lang];
};
