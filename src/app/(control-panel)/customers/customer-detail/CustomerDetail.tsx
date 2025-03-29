import FusePageSimple from "@fuse/core/FusePageSimple/FusePageSimple";
import { styled } from "@mui/material/styles";
import React, { useRef, useEffect } from "react";
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
  openRightSideBar,
  closeRightSidebar,
} from "@/store/slices/customerSlice";
import withReducer from "@/store/withReducer";
import reducer from "../store";
import { position } from "stylis";
import { relative } from "path";
import FuseScrollbars from "@fuse/core/FuseScrollbars";

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

  const handleOpenLeftSidebar = () => {
    dispatch(openLeftSideBar(selectOpenLeftSideBar));
  };
  
  const handleOpenRightSidebar = () => {
    dispatch(openRightSideBar(selectOpenRightSideBar));
  };

  const leftSidebarWidth = isSmallScreen ? 340 : 300;
  const rightSidebarWidth = isSmallScreen ? 340 : 300;

  return (
    <Root
      header={<div></div>}
      leftSidebarOpen={selectOpenLeftSideBar}
      leftSidebarContent={
        <FuseScrollbars>
          <div className="lg:w-full w-[100%] lg:h-screen lg:pb-0 sm:pb-0 xs:pb-60">
            <LeftSidebar />
          </div>
        </FuseScrollbars>
      }
      leftSidebarWidth={leftSidebarWidth}
      rightSidebarWidth={rightSidebarWidth}
      leftSidebarOnClose={() => {
        dispatch(closeLeftSidebar(selectOpenLeftSideBar));
      }}

      rightSidebarOnClose={() => {
        dispatch(closeRightSidebar(selectOpenRightSideBar));
      }}
      // leftSidebarProps={
      //   ref = leftSidebarRef
      // }

      rightSidebarOpen={selectOpenRightSideBar}
      rightSidebarContent={
        <div className="lg:w-full w-[100%] lg:h-screen lg:pb-0">
          <RightSidebar />
        </div>
      }
      content={
        <div>
          <div className="flex justify-between">
            {!selectOpenLeftSideBar && (
              <div>
                <Button sx={{ padding: 0 }} variant="text" onClick={handleOpenLeftSidebar}>
                  <MenuIcon />
                </Button>
              </div>
            )}
            {!selectOpenRightSideBar && (
              <div>
                <Button
                  sx={{ margin: 0 }}
                  variant="text"
                  onClick={handleOpenRightSidebar}
                >
                  <MenuIcon />
                </Button>
              </div>
            )}
          </div>
          <MainContent />
        </div>
      }
      scroll={isSmallScreen ? "normal" : "content"}
    />
  );
};

export default withReducer("customer", reducer)(CustomerDetail);
