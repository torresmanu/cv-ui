import React from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { Box } from "@material-ui/core";
import upcSchool from "../../../images/UPCSchool.png";
import binance from "../../../images/Binance.png";
import lemonCash from "../../../images/LemonCash.png";
import bitkraft from "../../../images/BITKRAFT.png";

export default function HomePartners() {
  return (
    <Box
      display="flex"
      justifyContent="space-around"
      alignItems="center"
      height="200px"
      bgcolor="#f0f2f5"
      sx={{
        "@media (max-width: 600px)": {
          justifyContent: "space-between",
          overflowX: "scroll",
        },
      }}
    >
      <LazyLoadImage src={upcSchool} alt="UPC School" width="60px" />
      <LazyLoadImage src={binance} alt="Binance" width="170px" />
      <LazyLoadImage src={lemonCash} alt="Lemon Cash" width="75px" />
      <LazyLoadImage src={bitkraft} alt="BITKRAFT" width="150px" />
    </Box>
  );
}