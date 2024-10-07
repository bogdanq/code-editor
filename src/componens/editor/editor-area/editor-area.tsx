import { useEffect, useState } from "react";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  CopyOutlined,
} from "@ant-design/icons";
import { useUnit } from "effector-react";
import { useParams } from "react-router-dom";
import { CopyToClipboard } from "react-copy-to-clipboard";
import Editor, { Monaco } from "@monaco-editor/react";
import { Button, Input, Tooltip, Typography } from "antd";
import { PanelHeader } from "../components";
import { $docs, $language, changeDoc } from "../model";
import { NoData } from "./styled";
import { LanguageSelect } from "./language-select";
import { onMountEditor } from "./config";
import { useDoc } from "../useDoc";

type Props = {
  isVisibleplayground: boolean;
  setVisibleplayground: () => void;
};

export const EditorArea = ({
  isVisibleplayground,
  setVisibleplayground,
}: Props) => {
  const [visibleCopyTooltip, setVisibleCopyTooltip] = useState(false);
  const language = useUnit($language);
  const onChangeDoc = useUnit(changeDoc);

  const { docId } = useParams();

  const doc = useDoc();

  useEffect(() => {
    let timerId = "";

    if (visibleCopyTooltip) {
      setTimeout(() => setVisibleCopyTooltip(false), 500);
    }

    return () => clearInterval(timerId);
  }, [visibleCopyTooltip]);

  return (
    <div className="editor">
      <PanelHeader
        actions={[
          <Button size="small" type="primary">
            сохранить
          </Button>,
          <Input
            addonAfter={
              <CopyToClipboard
                text={window.location.href}
                onCopy={() => setVisibleCopyTooltip(true)}
              >
                <Tooltip title="Скопировано" open={visibleCopyTooltip}>
                  <CopyOutlined />
                </Tooltip>
              </CopyToClipboard>
            }
            value={window.location.href}
            size="small"
          />,
          <LanguageSelect />,
          <>
            {isVisibleplayground ? (
              <MenuUnfoldOutlined onClick={setVisibleplayground} />
            ) : (
              <MenuFoldOutlined onClick={setVisibleplayground} />
            )}
          </>,
        ]}
      />

      {docId ? (
        <Editor
          onChange={(code) => {
            onChangeDoc({ id: docId, code: code || "" });
          }}
          value={doc?.code}
          language={language}
          theme="vs"
          onMount={(editor, monaco) =>
            onMountEditor(editor, monaco, doc?.code || "")
          }
        />
      ) : (
        <NoData>
          <Typography.Text strong>Выберите или создайте файл</Typography.Text>
        </NoData>
      )}
    </div>
  );
};
