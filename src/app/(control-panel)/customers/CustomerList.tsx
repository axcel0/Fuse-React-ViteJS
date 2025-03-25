import FusePageSimple from "@fuse/core/FusePageSimple";
import { styled } from "@mui/material/styles";
import Header from "./components/Header";
import { Box } from "@mui/system";
import SearchIcon from "@mui/icons-material/Search";
import ImportExportIcon from "@mui/icons-material/ImportExport";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Button,
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import CustomerTable from "./components/CustomerTable";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: "white",
  },
  "& .FusePageSimple-content": {
    backgroundColor: "#fff",
  },
  "& .FusePageSimple-sidebarHeader": {},
  "& .FusePageSimple-sidebarContent": {},
}));

const CustomerList = () => {
  return (
    <Root
      header={<Header />}
      content={
        <div className="mt-5 flex flex-col gap-4">
          <Box className="flex items-center gap-4 border-1 border-[#efefef] rounded-md overflow-hidden">
            <Typography className="bg-[#f8fafb] px-2 py-3 h-full w-1/10">
              <span className="font-semibold">1</span> customer
            </Typography>
            <Box className="w-8/10">
              <Typography>
                <span className="font-semibold">100%</span> of your customer
                base
              </Typography>
            </Box>
            <FormControl className="w-1/10 bg-[#f8fafb] m-1">
              <InputLabel id="demo-simple-select-label border-0">
                Add filter
              </InputLabel>
              <Select
                className="bg-[#f8fafb]"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Age"
                inputProps={{
                  style: { border: "none" },
                }}
                sx={{
                  "& .MuiOutlinedInput-notchedOutline": {
                    border: "none",
                  },
                  //   "&:hover .MuiOutlinedInput-notchedOutline": {
                  //     border: "none", // Xóa border khi hover
                  //   },
                  //   "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                  //     border: "none", // Xóa border khi focus
                  //   },
                }}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box className="flex items-center justify-between">
            <TextField
              variant="outlined"
              placeholder="Search customer"
              sx={{
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

            <div className="flex gap-2">
              <Button
                variant="contained"
                className="min-w-[40px] border-1 border-[#efefef] bg-white text-gray-400"
              >
                <ImportExportIcon />
              </Button>
              <Button
                variant="contained"
                className="min-w-[40px] border-1 border-[#efefef] bg-white text-gray-400"
              >
                <MoreHorizIcon />
              </Button>
            </div>
          </Box>
          <CustomerTable />
        </div>
      }
    />
  );
};

export default CustomerList;
