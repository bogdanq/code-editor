import { BuildOptions, Plugin } from "esbuild";
const esbuild = require("esbuild-wasm");

interface IESService {
  init: boolean;
  build(string: string): Promise<string>;
}

const namespace = "virtual";

export const pluginEntry = (context: any, text: string): Plugin => {
  return {
    name: "virtual-entry",
    setup(build) {
      build.onResolve({ filter: /^<stdin>$/ }, () => {
        return {
          path: "index.tsx",
          namespace: namespace,
          pluginData: {
            importer: "",
          },
        };
      });

      build.onLoad({ filter: /.*/, namespace: namespace }, async (args) => {
        return {
          contents: text,
          pluginData: {
            importer: "index.tsx",
          },
          loader: "tsx",
        };
      });
    },
  };
};

export const pluginGlobalExternal = (): Plugin => {
  return {
    name: "plugin-modules",
    setup(build) {
      build.onResolve({ filter: /^([^\.\/]).*/ }, (args) => {
        // const external = build.initialOptions.external?.includes(args.path);

        // if (external) {
        return {
          path: args.path,
          namespace: `node_modules:external`,
          pluginData: {
            ...args.pluginData,
            package: args.path,
          },
        };
        // }
      });

      build.onLoad(
        { filter: /.*/, namespace: `node_modules:external` },
        async (args) => {
          const content = `module.exports = window['${args.path}'];`;

          const externals = JSON.parse(
            localStorage.getItem("externals") ?? "{}"
          );
          localStorage.setItem(
            "externals",
            JSON.stringify({ ...externals, [args.path]: true })
          );

          return {
            contents: content,
            pluginData: {
              importer: args.path,
            },
            loader: "js",
          };
        }
      );
    },
  };
};

export const esBuildConfig = (text: string): BuildOptions => ({
  entryPoints: ["<stdin>"],
  bundle: true,
  loader: { ".tsx": "tsx" },
  external: ["react", "react-dom", "react-router-dom", "styled-components"],
  plugins: [pluginEntry(this, text), pluginGlobalExternal()],
  write: false,
});

// @ts-ignore
import esWasm from "esbuild-wasm/esbuild.wasm";

export const ESService: IESService = {
  init: false,
  build: async function (text: string) {
    if (!this.init) {
      try {
        await esbuild.initialize({ wasmURL: esWasm });
        this.init = true;
      } catch (e) {
        console.log("error init");
      }
    }

    try {
      const data = await esbuild.build(esBuildConfig(text));

      const file = data.outputFiles?.[0] || null;

      if (file) {
        const _file = new File([file.text], `index.js`, {
          type: "text/javascript",
        });
        const url = URL.createObjectURL(_file);

        const response = await fetch(url);
        const parsedCode = await response.text();

        return parsedCode;
      }

      return "Нет файла";
    } catch (e) {
      console.error(e);

      return "Ошибка парсинга";
    }
  },
};
