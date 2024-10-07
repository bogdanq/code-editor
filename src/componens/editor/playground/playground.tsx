import { CodeOutlined } from "@ant-design/icons";
import { Badge, Button, Typography } from "antd";
import { useRef, useState } from "react";
import { ESService } from "../../../ESbuilder";
import { PanelHeader } from "../components";
import { useDoc } from "../useDoc";
import { Frame, NoData, Root } from "./styled";
import { getCode } from "./mock-code";

const runCode = async (code: string): Promise<string> => {
  try {
    return ESService.build(code);
  } catch (error) {
    console.error(error);
    return "";
  }
};

export const Playground = ({
  setVisibleConsole,
  isVisibleConsole,
}: {
  setVisibleConsole: () => void;
  isVisibleConsole: boolean;
}) => {
  const [parsedCode, setParsedCode] = useState("");
  const ref = useRef(null);

  const doc = useDoc();

  const hasCodeToPlayGroundRun = parsedCode.includes("import");

  return (
    <Root>
      <PanelHeader
        actions={[
          <Button
            size="small"
            type="primary"
            onClick={() => {
              runCode(doc?.code || "").then(setParsedCode);
              // @ts-ignore
              ref.current?.contentWindow.location.reload();
            }}
          >
            запустить
          </Button>,
          <Badge dot={isVisibleConsole}>
            <CodeOutlined onClick={setVisibleConsole} />
          </Badge>,
        ]}
      />

      {!hasCodeToPlayGroundRun && (
        <NoData>
          <Typography.Text strong>Превью кода</Typography.Text>
        </NoData>
      )}

      <Frame srcDoc={getCode(parsedCode)} ref={ref} />
    </Root>
  );
};
