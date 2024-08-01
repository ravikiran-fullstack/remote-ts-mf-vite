import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import { Box } from "@mui/material";
import useGetPipelineData from "../../hooks/useGetPipelineData";
import AllPipelinesModal from "../allPipelinesModal/AllPipelinesModal";

interface Notification {
  type: string;
  message: string;
}

interface PipelineStep {
  id: number;
  name: string;
  description?: string;
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
      width: "calc(100% - 26px)",
      top: "12px",
      left: "calc(-50% + 13px)",
      zIndex: 2,
    },
    "&:first-child::before": {
      content: "none",
    },
    "&:last-child::after": {
      content: "none",
    },
  },
  successIcon: {
    color: "#87AFBF !important",
  },
  errorIcon: {
    color: "#D62113 !important",
  },
  stepperItemContent: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "baseline",
    width: "114px",
    fontSize: "12px",
  },
  stepperItemContentText: {
    width: "100px",
  },
  stepDescriptionText: {
    color: "#6F6F6F",
  },
  paddedDiv: {},
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
const Pipeline: React.FC<PipelineProps> = (props) => {
  const classes = useStyles();
  const { pipelineData, loading, error } = useGetPipelineData(
    props.pipelineStageName
  );
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const renderIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return (
          <CheckCircleIcon color="success" className={classes.successIcon} />
        );
      case "Failed":
        return (
          <ReportProblemIcon color="error" className={classes.errorIcon} />
        );
      case "Not Started":
        return (
          <FileUploadRoundedIcon
            color="disabled"
            className={classes.successIcon}
          />
        );
      default:
        return (
          <ArrowForwardIcon color="info" className={classes.successIcon} />
        );
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
        <div className={classes.stepperWrapper}>
          {pipelineData &&
            pipelineData.steps.map((step: PipelineStep) => {
              return (
                <div key={step.id} className={classes.stepperItem}>
                  {renderIcon(step.status)}
                  <div className={classes.stepperItemContent}>
                    <div className={classes.stepperItemContentText}>
                      <p>{step.name}</p>
                      <p className={classes.stepDescriptionText}>
                        {step.description}
                      </p>
                    </div>
                    <div className={classes.paddedDiv}>
                      <ArrowRightIcon />
                    </div>
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

export default Pipeline;
