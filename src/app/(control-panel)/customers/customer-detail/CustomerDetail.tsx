import FusePageSimple from "@fuse/core/FusePageSimple/FusePageSimple";
import { styled } from "@mui/material/styles";
import React, { useEffect } from "react";
import LeftSidebar from "./components/LeftSidebar";
import MainContent from "./components/MainContent";
import RightSidebar from "./components/RightSidebar";
import { useTheme, useMediaQuery, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import {
  closeLeftSidebar,
  openLeftSideBar,
  isSidebarOpen,
  selectOpenLeftSidebar,
  selectOpenRightSidebar,
} from "@/store/slices/customerSlice";
import withReducer from "@/store/withReducer";
import reducer from "../store";

const Root = styled(FusePageSimple)(({ theme }) => ({
  "& .FusePageSimple-header": {
    backgroundColor: "white",
  },
  "& .FusePageSimple-content": {
    backgroundColor: "#fff",
  },

  "& .FusePageSimple-sidebarContent": {
    backgroundColor: "#fff",
  },
}));

const CustomerDetail = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("lg"));
  // const [isSidebarHidden, setIsSidebarHidden] = useState(isSmallScreen);
  const selectOpenLeftSideBar = useSelector(selectOpenLeftSidebar);
  const selectOpenRightSideBar = useSelector(selectOpenRightSidebar);

  useEffect(() => {
    dispatch(isSidebarOpen(!isSmallScreen));
    // console.log("screen: " + isSmallScreen);
  }, [isSmallScreen]);

  const handleCloseSidebar = () => {
    dispatch(closeLeftSidebar(selectOpenLeftSideBar));
  };

  const handleOpenLeftSidebar = () => {
    dispatch(openLeftSideBar(selectOpenLeftSideBar));
    console.log(selectOpenLeftSideBar);
  };

  // console.log("selectOpenSidebar: " + selectOpenLeftSideBar);

  const leftSidebarWidth = isSmallScreen ? 280 : 300;

  return (
    <Root
      header={<div></div>}
      leftSidebarOpen={selectOpenLeftSideBar}
      // leftSidebarOnClose={() => {
      //   console.log("Leftsidebar is closed");
      // }}
      leftSidebarContent={
        <div className="flex justify-center lg:w-full w-[90%] h-screen overflow-y-auto xs:pb-240">
          <LeftSidebar />
        </div>
      }
      leftSidebarWidth={leftSidebarWidth}
      rightSidebarWidth={300}
      rightSidebarOpen={selectOpenRightSideBar}
      rightSidebarContent={
        <>
          <RightSidebar />
        </>
      }
      content={
        <div>
          {!selectOpenLeftSideBar && (
            <div>
              <Button variant="text" onClick={handleOpenLeftSidebar}>
                <MenuIcon />
              </Button>
            </div>
          )}
          <MainContent />
        </div>
      }
    />
  );
};

export default withReducer("customer", reducer)(CustomerDetail);
