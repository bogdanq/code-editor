import { useEffect, useRef } from "react";
import { Col, Row, Typography } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { clearLogs } from "../model";
import { Content, Icon, Message, Root, Title, Wrapper } from "./styled";
import { useLogs } from "./use-logs";
import { useUnit } from "effector-react";

export const Logger = () => {
  const ref = useRef<HTMLElement>(null);
  const refLogsContainer = useRef<HTMLElement>(null);
  const logs = useLogs();

  const handleClearLogs = useUnit(clearLogs);

  useEffect(() => {
    if (ref.current && refLogsContainer.current) {
      ref.current.scrollTo({
        left: 0,
        top: refLogsContainer.current.getBoundingClientRect().height,
      });
    }
  }, [logs]);

  return (
    <>
      <Title>
        <Row justify="space-between">
          <Col>
            <Typography.Text strong>Console ({logs.length})</Typography.Text>
          </Col>

          <Col>
            <DeleteOutlined onClick={handleClearLogs} />
          </Col>
        </Row>
      </Title>

      <Wrapper ref={ref}>
        <Root ref={refLogsContainer}>
          {logs.map((log, index) => (
            <ConsoleMessage
              key={index}
              log={{ method: log.method }}
              message={log.data.join(",")}
            />
          ))}
        </Root>
      </Wrapper>
    </>
  );
};

function ConsoleMessage({ log, message }: any) {
  return (
    <Message data-method={log.method} method={log.method}>
      <Icon method={log.method} />

      <Content>{message}</Content>
    </Message>
  );
}
