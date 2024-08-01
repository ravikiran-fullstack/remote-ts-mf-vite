// import { useEffect, useRef, useState } from "react";
import "./App.css";
import PipelineMain from "./components/pipelineMain/PipelineMain";
// import { Box } from "@mui/material";
// import SvgLines from "./components/lines/SvgLines";
// import ReactArcher from "./components/lines/ReactArcher";
// import ProcessesAndCharts from "./pages/ProcessesAndCharts";

import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    
    MuiTabs: {
      styleOverrides: {
        fixed: {
          // Your custom styles here
          // backgroundColor: "lightblue",
        },
        indicator: {
          backgroundColor: "transparent",
        },

        root: {
          textTransform: "lowercase",
          button: {
            "&:hover": {
              border: "1px solid #E0E0E0",
              borderBottom: "none",
              color:'red'
            },
          },
        },

        
      },
    },

    MuiButtonBase: {
      
      defaultProps: {
        // The props to apply
        
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
    // MuiButtonBase: {
    //   styleOverrides: {
    //     root: {
    //       // Your custom styles here
    //       backgroundColor: "#E0E0E0",
    //       color: "black",
    //       borderTopLeftRadius:"5px",
    //       borderTopRightRadius:"5px",
    //     },
    //   },
    // },
    MuiTab: {
      styleOverrides: {
        root: {
          // Your custom styles here
          textTransform: "none",
          backgroundColor: "#fff",
          color: "black",
          border: "1px solid #E0E0E0",
          borderTopLeftRadius: "5px",
          borderTopRightRadius: "5px",
          borderBottom: "none",
          "&.Mui-selected": {
            borderBottom: "none",
          },
          "&.Mui-selected:hover": {
            backgroundColor: "#fff",
            
          },
        },
      },
    },
  },
});

function App() {
  // const box1Ref = useRef<HTMLDivElement>(null);
  // const box2Ref = useRef<HTMLDivElement>(null);
  // const box3Ref = useRef<HTMLDivElement>(null);

  // const [positions, setPositions] = useState({
  //   start: { x: 0, y: 0 },
  //   mid: { x: 0, y: 0 },
  //   end1: { x: 0, y: 0 },
  //   end2: { x: 0, y: 0 },
  // });

  // useEffect(() => {
  //   const updatePositions = () => {
  //     if (box1Ref.current && box2Ref.current && box3Ref.current) {
  //       const box1 = box1Ref.current.getBoundingClientRect();
  //       const box2 = box2Ref.current.getBoundingClientRect();
  //       const box3 = box3Ref.current.getBoundingClientRect();

  //       setPositions({
  //         start: { x: box1.left + box1.width / 2, y: box1.top + box1.height },
  //         mid: { x: box1.left + box1.width / 2, y: (box2.top + box3.top) / 2 },
  //         end1: { x: box2.left + box2.width / 2, y: box2.top },
  //         end2: { x: box3.left + box3.width / 2, y: box3.top },
  //       });
  //     }
  //   };

  //   updatePositions();
  //   window.addEventListener("resize", updatePositions);
  //   return () => window.removeEventListener("resize", updatePositions);
  // }, []);

  return (
    <>
      {/* <ProcessesAndCharts /> */}
      <ThemeProvider theme={theme}>
        <PipelineMain />
      </ThemeProvider>
      {/* <Box display="flex" flexDirection="column" alignItems="center">
        <Box
          ref={box1Ref}
          sx={{ width: 100, height: 100, bgcolor: "red", mb: 2 }}
        >
          Box 1
        </Box>
        <Box display="flex" justifyContent="space-between" width="100%">
          <Box
            ref={box2Ref}
            sx={{ width: 100, height: 100, bgcolor: "blue", mb: 2 }}
          >
            Box 2
          </Box>
          <Box
            ref={box3Ref}
            sx={{ width: 100, height: 100, bgcolor: "green", mb: 2 }}
          >
            Box 3
          </Box>
        </Box>
        <SvgLines positions={positions} />
      </Box>
      <ReactArcher /> */}
    </>
  );
}

export default App;
