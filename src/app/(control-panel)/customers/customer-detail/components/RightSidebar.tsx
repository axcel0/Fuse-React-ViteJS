import { Badge, Typography } from "@mui/material";
import KeyboardArrowDownOutlinedIcon from "@mui/icons-material/KeyboardArrowDownOutlined";
import { Box } from "@mui/system";
import React from "react";
import CompanyCard from "./CompanyCard";

const RightSidebar = () => {
  return (
    <div>
      <div className="p-2 border-b-1">
        <Box className="flex items-center gap-5 px-2 py-3 ">
          <Typography className="font-semibold text-lg">Companies</Typography>
          <Badge
            sx={{
              "& .MuiBadge-badge": {
                backgroundColor: "#f1f5fa",
                color: "#000",
                borderRadius: "4px",
                padding: "12px 10px",
                fontSize: "14px",
              },
            }}
            badgeContent={2}
          ></Badge>
        </Box>
        <div className="flex flex-col gap-2 pb-2">
          <CompanyCard />
          <CompanyCard />
        </div>
      </div>
      <div className="py-2">
        <Box className="flex items-center justify-between px-2 py-3 border-t-1">
          <div className="flex items-center gap-5">
            <Typography className="font-semibold text-lg">Deals</Typography>
            <Badge
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#f1f5fa",
                  color: "#000",
                  borderRadius: "4px",
                  padding: "12px 10px",
                  fontSize: "14px",
                },
              }}
              badgeContent={2}
            ></Badge>
          </div>
          <KeyboardArrowDownOutlinedIcon />
        </Box>
        <Box className="flex items-center justify-between gap-3 px-2 py-3 border-t-1 border-b-1">
          <div className="flex items-center gap-5">
            <Typography className="font-semibold text-lg">Tickets</Typography>
            <Badge
              sx={{
                "& .MuiBadge-badge": {
                  backgroundColor: "#f1f5fa",
                  color: "#000",
                  borderRadius: "4px",
                  padding: "12px 10px",
                  fontSize: "14px",
                },
              }}
              badgeContent={2}
            ></Badge>
          </div>
          <KeyboardArrowDownOutlinedIcon />
        </Box>
      </div>
    </div>
  );
};

export default RightSidebar;
