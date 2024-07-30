import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import HourglassBottomIcon from "@mui/icons-material/HourglassBottom";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";

interface PipelineStepProps {
  name: string;
  status: string;
}

const useStyles = makeStyles({
  stepStyle: {
    maxWidth: "150px",
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
    position: "relative",
    padding: "10px 0",
  },
  icon: {
    marginRight: "10px",
  },
  stepContent: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexGrow: 1,
  },
  stepName: {
    flexGrow: 1,
  },
  arrowIcon: {
    marginLeft: "10px",
    cursor: "pointer",
  },
  connectorLine: {
    position: "absolute",
    left: "20px",
    top: "50%",
    width: "2px",
    height: "100%",
    backgroundColor: "#ccc",
    zIndex: -1,
  },
});

const PipelineStep: React.FC<PipelineStepProps> = ({ name, status }) => {
  const classes = useStyles();

  const renderIcon = () => {
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
    <div className={classes.stepStyle} key={name}>
      <div>{renderIcon()}</div>
      <div className={classes.stepContent}>
        <div className={classes.stepName}>{name}</div>
        <ArrowRightIcon className={classes.arrowIcon} />
      </div>
    </div>
  );
};

export default PipelineStep;
