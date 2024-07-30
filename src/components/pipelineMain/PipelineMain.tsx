import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { customTheme } from "../../styles/customThemes";
import { makeStyles, ThemeProvider } from "@material-ui/core/styles";
import { css } from "@emotion/react";
import PreDeployPipeline from "../preDeployPipeline/PreDeployPipeline";
import EndToEndPipeline from "../endToEndPipeline/EndToEndPipeline";
import DevPipeline from "../devPipeline/DevPipeline";
import QatPipeline from "../qatPipeline/QatPipeline";
import ProdDeployPipeline from "../prodDeployPipeline/ProdDeployPipeline";

const useStyles = makeStyles(() => ({
  testStyles: css`
    width: 200px !important;
    min-width: 200px !important;
    text-transform: none !important;
  `,
}));

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
  const [value, setValue] = React.useState(1);

  const classes = useStyles();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (
    <ThemeProvider theme={customTheme}>
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
          className={classes.testStyles}
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

      <Box>
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
