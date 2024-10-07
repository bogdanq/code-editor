import { Monaco } from "@monaco-editor/react";

// Загрузчик статики для типов
const loaStaticdDTS = async (libName: string, monaco: Monaco) => {
  const response = await fetch(`/assets/${libName}.d.ts`);
  const dts = await response.text();

  const lib = `
    declare module '${libName}' {
      ${dts}
    }
  `;

  monaco.languages.typescript.typescriptDefaults.addExtraLib(
    lib,
    `file:///node_modules/@types/${libName}/index.d.ts`
  );
};

export const onMountEditor = <E>(editor: E, monaco: Monaco, code: string) => {
  const model = monaco.editor.createModel(
    code,
    "typescript",
    monaco.Uri.parse(`file:///index.tsx`)
  );

  monaco.editor.setModelLanguage(model, "typescript");

  // @ts-ignore
  editor.setModel(model);

  monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: true,
    noSyntaxValidation: false,
  });

  monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
    jsx: monaco.languages.typescript.JsxEmit.React,
    allowNonTsExtensions: true,
    moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
    module: monaco.languages.typescript.ModuleKind.CommonJS,
    noEmit: true,
    esModuleInterop: true,
  });

  [
    "react",
    "react-dom",
    "styled-components",
    "history",
    "react-router",
    "react-router-dom",
  ].map((lib) => loaStaticdDTS(lib, monaco));
};
