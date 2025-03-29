import React, { useState } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import EditNoteIcon from "@mui/icons-material/EditNote";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import { Avatar, Tab, Tabs, Typography } from "@mui/material";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import { Box } from "@mui/system";

interface Tab {
  label: string;
}

const tabs: Tab[] = [
  {
    label: "Activity",
  },
  {
    label: "Appointments",
  },
];

const LeftSidebar = () => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="lg:px-2 px-2 lg:w-full w-full">
      <div className="lg:w-full flex flex-col gap-2">
        <div className="px-2 py-4 flex justify-between items-center">
          <div className="text-gray-500 flex items-center gap-2">
            <KeyboardArrowLeftOutlinedIcon className="text-xl font-semibold text-[#333]" />
            <Typography className="font-semibold text-sm">
              Back to leads
            </Typography>
          </div>
          <div className="text-sm text-gray-500 flex items-center gap-3">
            <Typography className="text-sm font-semibold ">Actions</Typography>
            <KeyboardArrowDownIcon className="font-semibold text-xl text-[#333]" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Avatar
            alt="Remy Sharp"
            sx={{ width: 50, height: 50 }}
            src="data:image/jpeg;base64,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"
          />
          <div className="text-sm">
            <Typography className="text-lg font-bold" variant="h6">
              Join Nole Adam
            </Typography>
            <Typography className="text-sm text-[#333]">Moketer</Typography>
            <Typography className="text-sm text-[#333]">
              trangsiban4481@gmail.com
            </Typography>
          </div>
        </div>
        <div className="flex justify-between items-center py-2 px-4">
          <div className="flex flex-col items-center gap-2">
            <EditNoteIcon className="text-xl" />
            <span className="font-bold text-sm">Notes</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <MailOutlineIcon className="text-xl" />
            <span className="font-bold text-sm">Email</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <PhoneOutlinedIcon className="text-xl" />
            <span className="font-bold text-sm">Call</span>
          </div>
          <div className="flex flex-col items-center gap-2">
            <TaskOutlinedIcon className="text-xl" />
            <span className="font-bold text-sm">Task</span>
          </div>
          <div>
            <MoreHorizOutlinedIcon />
          </div>
        </div>
        <Box sx={{ padding: "0 5px" }}>
          <Tabs
            aria-label="basic tabs example"
            value={activeTab}
            onChange={(event, newValue) => setActiveTab(newValue)}
          >
            {tabs &&
              tabs.map((item, index) => (
                <Tab
                  key={index}
                  sx={{
                    width: "50%",
                  }}
                  label={item.label}
                />
              ))}
          </Tabs>
          <Box className="flex flex-col gap-4 py-5">
            <div>
              <Typography>Email</Typography>
              <Typography className="font-semibold">
                trangsiban4481@gmail.com
              </Typography>
            </div>
            <div>
              <Typography>Phone number</Typography>
              <Typography className="font-semibold">0835205203</Typography>
            </div>
            <div>
              <Typography>Job title</Typography>
              <Typography className="font-semibold">
                Frontend Developer
              </Typography>
            </div>
            <div>
              <Typography>Contact Owner</Typography>
              <div className="flex items-center gap-3 mt-1">
                <Avatar
                  alt="Remy Sharp"
                  sx={{ width: 22, height: 22 }}
                  src="data:image/jpeg;base64,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"
                />
                <span className="font-semibold">Frontend Developer</span>
              </div>
            </div>
            <div>
              <Typography>Last contacted</Typography>
              <Typography className="font-semibold">-</Typography>
            </div>
            <div>
              <Typography>Company name</Typography>
              <Typography className="font-semibold">FWA coparation</Typography>
            </div>
            <div>
              <Typography>Nature of relationship</Typography>
              <Typography className="font-semibold">Partner</Typography>
            </div>
            <div>
              <Typography>Instagram account</Typography>
              <Typography className="font-semibold">@bean_bean</Typography>
            </div>
            <div>
              <Typography>Tiktok account</Typography>
              <Typography className="font-semibold">@beanCute</Typography>
            </div>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default LeftSidebar;
