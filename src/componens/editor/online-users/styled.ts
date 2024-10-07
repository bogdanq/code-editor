import { List } from "antd";
import styled from "styled-components";

export const ListItem = styled(List.Item)`
  padding-left: 5px !important;
  cursor: pointer;

  & .item-icon {
    display: none;
  }

  &:hover {
    background: #f1f1f1;

    & .item-icon {
      display: block;
    }
  }
`;

export const Wrapper = styled.div`
  height: 100%;
  overflow-y: auto;
`;
