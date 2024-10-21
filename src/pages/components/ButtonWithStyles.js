import React from "react";
import { Button } from "@material-ui/core";

const ButtonWithStyles = ({ onClick, children, fullWidth=false, ...props }) => {
  const width = fullWidth ? "100%" : "140px"; // Set width based on fullWidth prop
  return (
    <Button
      style={{
        borderRadius: "8px",
        float: "right",
        width: width, // Use dynamic width value
      }} 
      color="primary"
      variant="outlined"
      onClick={onClick}
      {...props}
    >
      {children}
    </Button>
  );
};

  export default ButtonWithStyles;