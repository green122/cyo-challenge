import { Spin } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const SceneContainer = styled.div`
  width: 800px;
  margin: 50px auto;
`;

export const StyledSpinner = styled(Spin)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const StyledLink = styled(Link)`
  display: block;
  margin-bottom: 12px;
  &:hover {
    color: #1626a7;
  }
`;
