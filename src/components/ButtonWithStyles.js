import React from "react";
import Button from "@material-ui/core/Button";
import { styled } from "@material-ui/core/styles";

const StyledButton = styled(Button)(({ theme, color }) => ({
  borderRadius: "8px",
  marginBottom: "15px",
  marginRight: "15px",
  float: "right",
  borderColor: theme.palette[color]?.main || '#3397EF',
}));

const ButtonWithStyles = ({ onClick, children, variant, color, ...props }) => {
  return (
    <StyledButton
      className="accept"
      variant={variant}
      color={color}
      onClick={onClick}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default ButtonWithStyles;
