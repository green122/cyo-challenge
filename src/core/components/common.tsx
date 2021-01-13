import { Spin } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const StyledContainer = styled.div`
  width: 800px;
  margin: 50px auto;

  @media (max-width: 768px) {
    width: 95%;
  }
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
