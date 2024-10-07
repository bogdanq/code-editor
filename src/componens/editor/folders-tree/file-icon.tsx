import { Docs } from "../model";

const mapper: { [key: string]: string } = {
  js: "js-file.png",
  ts: "typescript.png",
};

export const FileIcon = ({ type }: { type: Docs["type"] }) => {
  return <img src={`/assets/static/${mapper[type]}`} width={20} height={20} />;
};
