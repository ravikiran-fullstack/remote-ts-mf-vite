import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { customTheme } from "../../styles/customThemes";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import PreDeployPipeline from "../preDeployPipeline/PreDeployPipeline";
import EndToEndPipeline from "../endToEndPipeline/EndToEndPipeline";
import DevPipeline from "../devPipeline/DevPipeline";
import QatPipeline from "../qatPipeline/QatPipeline";
import ProdDeployPipeline from "../prodDeployPipeline/ProdDeployPipeline";

const useStyles = makeStyles(() => {
  const baseCircle = {
    width: "15px",
    height: "15px",
    marginTop: "3px",
    borderRadius: "50%",
  };

  return {
    testStyles: {
      width: "180px !important",
      minWidth: "180px !important",
      textTransform: "lowercase",
    },
    preDeployTabStyles: {
      border: "3px solid #c5a5da",
      color: "#c5a5da",
    },

    tabsContainer: {
      color: "white",
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },

    baseCircle: {
      width: "15px",
      height: "15px",
      marginTop: "3px",
      borderRadius: "50%",
    },
    circle1: {
      backgroundColor: "#C5A5DA",
      ...baseCircle,
    },
    circle2: {
      backgroundColor: "#00AEB5",
      ...baseCircle,
    },
    CICDContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      paddingTop: "10px",
    },
    marginLeft10: {
      marginLeft: "10px",
    },
  };
});

function a11yProps(index: number) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <div>{children}</div>}
    </div>
  );
};

const PipelineMain: React.FC = () => {
  const [value, setValue] = React.useState(0);

  const classes = useStyles();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <ThemeProvider theme={customTheme}>
      <Box className={classes.tabsContainer}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab
            className={classes.testStyles}
            label="End-to-End Process"
            {...a11yProps(0)}
          />
          <Tab
            className={classes.testStyles + " " + classes.preDeployTabStyles}
            label="Pre-Deploy"
            {...a11yProps(1)}
          />
          <Tab
            className={classes.testStyles}
            label="DEV Deploy"
            {...a11yProps(2)}
          />
          <Tab
            className={classes.testStyles}
            label="QAT Deploy"
            {...a11yProps(0)}
          />
          <Tab
            className={classes.testStyles}
            label="UAT Deploy"
            {...a11yProps(1)}
          />
          <Tab
            className={classes.testStyles}
            label="PROD Deploy"
            {...a11yProps(2)}
          />
        </Tabs>
        <Box className={classes.CICDContainer}>
          <div className={`${classes.circle1} ${classes.marginLeft10}`}></div>
          <div className={classes.marginLeft10}>CI</div>
          <div className={`${classes.circle2} ${classes.marginLeft10}`}></div>
          <div className={classes.marginLeft10}>CD</div>
        </Box>
      </Box>

      <Box style={{ backgroundColor: "white", color: "black" }}>
        <TabPanel value={value} index={0}>
          <EndToEndPipeline />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <PreDeployPipeline />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <DevPipeline />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <QatPipeline />
        </TabPanel>
        <TabPanel value={value} index={4}>
          <QatPipeline />
        </TabPanel>
        <TabPanel value={value} index={5}>
          <ProdDeployPipeline />
        </TabPanel>
      </Box>
    </ThemeProvider>
  );
};

export default PipelineMain;
