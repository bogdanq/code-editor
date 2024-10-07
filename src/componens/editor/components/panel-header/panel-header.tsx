import { Col, Row } from "antd";
import { ReactNode } from "react";
import { Wrapper } from "./styled";

type Props = {
  actions: ReactNode[];
};

export const PanelHeader = ({ actions }: Props) => {
  return (
    <Wrapper>
      <Row gutter={[10, 5]} justify="end">
        {actions.map((action, index) => (
          <Col key={index}>{action}</Col>
        ))}
      </Row>
    </Wrapper>
  );
};
