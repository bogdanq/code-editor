import { useEffect, useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Col, Input, List, Modal } from "antd";
import { nanoid } from "nanoid";
import { useUnit } from "effector-react";
import { useNavigate, useParams } from "react-router-dom";
import { PanelHeader } from "../components";
import { $docs, deleteDoc, Docs, createDoc } from "../model";
import { ListItem, Wrapper } from "./styled";
import { FileIcon } from "./file-icon";

export const FoldersTree = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [deleteFileId, setDeleteFileId] = useState<Docs | null>(null);
  const [title, setTitle] = useState("");

  const docs = useUnit($docs);
  const docsAction = useUnit({ deleteDoc, createDoc });

  const navigate = useNavigate();
  const { docId } = useParams();

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if (e.key === "Escape" && docId) {
        navigate(".", { relative: "path" });
      }
    };

    window.addEventListener("keydown", listener);

    return () => {
      window.removeEventListener("keydown", listener);
    };
  });

  return (
    <>
      <PanelHeader
        actions={[
          <Button
            size="small"
            type="primary"
            onClick={() => setModalOpen(true)}
          >
            создать файл
          </Button>,
        ]}
      />

      <Wrapper>
        <Col>
          <List
            loading={false}
            itemLayout="horizontal"
            dataSource={docs}
            renderItem={(doc) => (
              <ListItem
                active={doc.id === docId}
                onClick={() => navigate(doc.id)}
                actions={[
                  <DeleteOutlined
                    onClick={() => setDeleteFileId(doc)}
                    className="item-icon"
                  />,
                ]}
              >
                <List.Item.Meta
                  avatar={<FileIcon type={doc.type} />}
                  title=""
                  description={doc.title}
                />
              </ListItem>
            )}
          />

          <Modal
            open={isModalOpen}
            title="Новый файл"
            onCancel={() => setModalOpen(false)}
            cancelText="Отмена"
            onOk={() => {
              docsAction.createDoc({ title, id: nanoid() });
              setModalOpen(false);
              setTitle("");
            }}
            okButtonProps={{ title: "Сохранить" }}
          >
            <Input
              placeholder="Введите название файла"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Modal>

          <Modal
            open={!!deleteFileId}
            title="Точно удалить файл?"
            onCancel={() => setDeleteFileId(null)}
            cancelText="Отмена"
            onOk={() => {
              docsAction.deleteDoc(deleteFileId?.id!);
              setDeleteFileId(null);
              navigate(".", { relative: "path" });
            }}
            okButtonProps={{ title: "Удалить" }}
          />
        </Col>
      </Wrapper>
    </>
  );
};
