import { PageHeader, Button } from "antd";
import React from "react";
import styled from "styled-components";
import { StyledLink } from "../../core/components/common";
import { useGetIsSignedIn } from "../../core/AuthProvider";
import { signOut } from "../../services/auth.service";

const StyledPageHeader = styled(PageHeader)`
  border: 1px solid rgb(235, 237, 240);
  min-height: 80px;
`;

export const Header = () => {
  const isSignedIn = useGetIsSignedIn();

  return (
    <StyledPageHeader
      title={<StyledLink to="/">Main Page</StyledLink>}
      extra={isSignedIn && <Button onClick={() => signOut()}> Sign Out</Button>}
    />
  );
};
