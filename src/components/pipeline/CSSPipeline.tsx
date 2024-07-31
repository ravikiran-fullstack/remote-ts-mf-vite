import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import "./pipeline.css";
import { Box, Typography } from "@mui/material";
import useGetPipelineData from "../../hooks/useGetPipelineData";
import AllPipelinesModal from "../allPipelinesModal/AllPipelinesModal";

interface Notification {
  type: string;
  message: string;
}

interface PipelineStep {
  id: number;
  name: string;
  status: string;
  time: string;
  notification: Notification[];
}

interface PipelineProps {
  pipelineStageName: string;
}

const useStyles = makeStyles({
  stepperWrapper: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px",
  },
  stepperItem: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    width: "100px",
    "&::before": {
      position: "absolute",
      content: '""',
      borderBottom: "1px solid #ccc",
      width: "81%",
      top: "12px",
      left: "-41%",
      zIndex: 2,
    },
    "&:first-child::before": {
      content: "none",
    },
    "&:last-child::after": {
      content: "none",
    },
  },
  icon: {
    color: "#007bff",
  },
  stepTextContent: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #ccc",
    width: "100px",
  },
  container: {
    width: "1248px",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
  },
  containerHeading: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  linkStyle: {
    cursor: "pointer",
    color: "#007bff",
    textDecoration: "underline",
  },
});
const CSSPipeline: React.FC<PipelineProps> = (props) => {
  const classes = useStyles();
  const { pipelineData, loading, error } = useGetPipelineData(
    props.pipelineStageName
  );
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const renderIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircleIcon color="success" className={classes.icon} />;
      case "Failed":
        return <ReportProblemIcon color="error" className={classes.icon} />;
      case "Not Started":
        return (
          <HourglassBottomIcon color="disabled" className={classes.icon} />
        );
      default:
        return <ArrowForwardIcon color="info" className={classes.icon} />;
    }
  };

  return (
    <div className={classes.container}>
      <div className={classes.containerHeading}>
        <h4>Pipeline</h4>
        <span className={classes.linkStyle} onClick={handleOpen}>
          See All Environments
        </span>
      </div>
      <Box style={{ marginTop: "20px" }}>
        {/* <div className={classes.stepperWrapper}>
          <div className={classes.stepperItem}>
            <CheckCircleIcon className={classes.icon} />
            <div className={classes.stepTextContent}>
              <Typography variant="h6">Deploy</Typography>
              <ArrowRightIcon />
            </div>
          </div>
          <div className={classes.stepperItem}>
            <ArrowForwardIcon className={classes.icon} />
            <div className={classes.stepTextContent}>
              <Typography variant="h6">Deploy</Typography>
              <ArrowRightIcon />
            </div>
          </div>
          <div className={classes.stepperItem}>
            <ReportProblemIcon className={classes.icon} />
            <div className={classes.stepTextContent}>
              <Typography variant="h6">Deploy</Typography>
              <ArrowRightIcon />
            </div>
          </div>
          <div className={classes.stepperItem}>
            <HourglassBottomIcon className={classes.icon} />
            <div className={classes.stepTextContent}>
              <Typography variant="h6">Deploy</Typography>
              <ArrowRightIcon />
            </div>
          </div>
        </div> */}
        <div className={classes.stepperWrapper}>
          {pipelineData &&
            pipelineData.steps.map((step: PipelineStep) => {
              return (
                <div className={classes.stepperItem}>
                  {renderIcon(step.status)}
                  <div className={classes.stepTextContent}>
                    <p>{step.name}</p>
                    <ArrowRightIcon />
                  </div>
                </div>
              );
            })}
        </div>
      </Box>
      <div>
        <AllPipelinesModal open={open} handleClose={handleClose} />
      </div>
    </div>
  );
};

export default CSSPipeline;
