import { Button, Typography } from "@mui/material";
import PlayForWorkRoundedIcon from "@mui/icons-material/PlayForWorkRounded";
import React from "react";

const Header = () => {
  return (
    <div>
      <div className="flex items-center justify-between py-3">
        <Typography variant="h4">Customers</Typography>
        <div className="flex gap-1">
          <Button
            variant="contained"
            sx={{ color: "gray", backgroundColor: "#f8fafb" }}
          >
            <PlayForWorkRoundedIcon /> Import
          </Button>
          <Button
            variant="contained"
            sx={{ color: "gray", backgroundColor: "#f8fafb" }}
          >
            <PlayForWorkRoundedIcon className="rotate-180" /> Export
          </Button>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#7642f9", color: "white" }}
          >
            Add Customers
          </Button>
        </div>
      </div>
      <Typography>
        As a new ShopZen member, get ready for an exciting shopping journey with
        perks
      </Typography>
    </div>
  );
};

export default Header;
