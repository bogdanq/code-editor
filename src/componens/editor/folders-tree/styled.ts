import { List } from "antd";
import styled from "styled-components";

export const ListItem = styled(List.Item)<{ active: boolean }>`
  padding-left: 5px !important;
  cursor: pointer;
  background: ${({ active }) => (active ? "#f1f1f1" : "#fff")};

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
