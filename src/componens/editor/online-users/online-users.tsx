import { Col, List, Typography } from "antd";
import { PanelHeader } from "../components";
import { ListItem, Wrapper } from "./styled";

export const OnlineUsers = () => {
  return (
    <>
      <PanelHeader
        actions={[<Typography.Text>Подключенные пользователи</Typography.Text>]}
      />

      <Wrapper>
        <Col>
          <List
            loading={false}
            itemLayout="horizontal"
            dataSource={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
            renderItem={() => (
              <ListItem>
                <List.Item.Meta
                  avatar={null}
                  title=""
                  description="Иванов Иван Иванович"
                />
              </ListItem>
            )}
          />
        </Col>
      </Wrapper>
    </>
  );
};
