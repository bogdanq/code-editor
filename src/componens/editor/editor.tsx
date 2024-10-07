import { Allotment } from "allotment";
import { useUnit } from "effector-react";
import { EditorArea } from "./editor-area";
import { FoldersTree } from "./folders-tree";
import { Logger } from "./logger";
import { Playground } from "./playground";
import { $splitPanelParams, changeSplitPanel } from "./model";

import "allotment/dist/style.css";

export const Editor = () => {
  const splitPanelParams = useUnit($splitPanelParams);
  const handleChangeSplitPanel = useUnit(changeSplitPanel);

  return (
    <Allotment className="container">
      <Allotment.Pane className="panel" preferredSize="15%">
        <FoldersTree />
      </Allotment.Pane>

      <Allotment.Pane className="panel" preferredSize="60%">
        <EditorArea
          setVisibleplayground={() =>
            handleChangeSplitPanel("isVisibleplayground")
          }
          isVisibleplayground={splitPanelParams.isVisibleplayground}
        />
      </Allotment.Pane>

      {splitPanelParams.isVisibleplayground && (
        <Allotment.Pane className="panel">
          <Allotment vertical>
            <Allotment.Pane className="panel" preferredSize="70%">
              <Playground
                isVisibleConsole={splitPanelParams.isVisibleConsole}
                setVisibleConsole={() =>
                  handleChangeSplitPanel("isVisibleConsole")
                }
              />
            </Allotment.Pane>

            {splitPanelParams.isVisibleConsole && (
              <Allotment.Pane className="panel" preferredSize="30%">
                <Logger />
              </Allotment.Pane>
            )}
          </Allotment>
        </Allotment.Pane>
      )}
    </Allotment>
  );
};
