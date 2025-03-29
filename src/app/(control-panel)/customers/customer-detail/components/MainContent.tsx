import {
  Box,
  Button,
  InputAdornment,
  Tab,
  Tabs,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";

interface Tab {
  label: string;
}

const tabs: Tab[] = [
  {
    label: "Activities",
  },
  {
    label: "Notes",
  },
  {
    label: "Emails",
  },
  {
    label: "Calls",
  },
  {
    label: "Tasks",
  },
  {
    label: "Meetings",
  },
];

const MainContent = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="p-4">
      <Box className="flex items-center justify-between">
        <TextField
          variant="outlined"
          placeholder="Search customer"
          sx={{
            width: "100%",
            "& .MuiInputBase-root": { backgroundColor: "white" },
            "& .MuiInputBase-input::placeholder": {
              color: "black", // Thay đổi màu placeholder ở đây
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      <Box className="flex flex-col gap-4">
        <Tabs
          aria-label="basic tabs example"
          sx={{ borderBottom: 1, borderColor: "divider" }}
          value={activeTab}
          onChange={(e, newValue) => setActiveTab(newValue)}
        >
          {tabs &&
            tabs.map((item, index) => (
              <Tab
                key={index}
                sx={{
                  flex: 1,
                }}
                label={item.label}
              />
            ))}
        </Tabs>
        <Box>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptates
          commodi tempore saepe dicta sint perferendis praesentium similique
          voluptate, repellat, quasi, deserunt assumenda sequi quae nulla
          eligendi sit accusamus voluptatem aperiam.
        </Box>
      </Box>
    </div>
  );
};

export default MainContent;
