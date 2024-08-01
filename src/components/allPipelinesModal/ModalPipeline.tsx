import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ReportProblemIcon from "@mui/icons-material/ReportProblem";
import FileUploadRoundedIcon from "@mui/icons-material/FileUploadRounded";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
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
    alignItems: "flex-start",
    // flex: 1,
    padding: "15px 0 0 20px",
  },
  stepperItem: {
    position: "relative",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: 1,
    width: "130px",
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
    // border: "3px solid #c5a5da",
    // width: "1248px",
    padding: "1rem",
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

  modalPipelineContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "start",
    marginTop: "1rem",
    // padding: "2rem",
    // width: "100%",
    // border: "3px solid #c5a5da",
  },

  modalPipelineHeading: {
    width: "100px",
    // border: "3px solid #c5a5da",
    textAlign: "right",
    paddingTop: "33px",
    marginRight: "20px",
  },

  modalPipelineDividerLine: {
    position: 'relative',
    width: '1px',          // Set the width of the vertical line
    height: '100px',       // Set the height of the vertical line
    backgroundColor: '#B3B3B3', // Set the color of the vertical line

    '&::before, &::after': {
      content: '""',
      position: 'absolute',
      width: '10px',       // Set the width of the horizontal lines
      height: '1px',       // Set the height of the horizontal lines
      backgroundColor: '#B3B3B3', // Set the color of the horizontal lines
    },

    '&::before': {
      top: '0',            // Position the first horizontal line at the top
      left: '0px',       // Position it 10px to the left of the vertical line
    },

    '&::after': {
      bottom: '0',         // Position the second horizontal line at the bottom
      left: '0px',       // Position it 10px to the left of the vertical line
    },
  },

  modalPipelineContent: {
    // border: "3px solid #c5a5da",
    paddingTop: "20px",
  },
});
const ModalPipeline: React.FC<PipelineProps> = (props) => {
  const classes = useStyles();
  const { pipelineData, loading, error } = useGetPipelineData(
    props.pipelineStageName
  );

  console.log("pipelineData title", pipelineData?.title);

  const [open, setOpen] = React.useState(false);
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
      <Box className={classes.modalPipelineContainer}>
        <div className={classes.modalPipelineHeading}>
          <Typography variant="body1" gutterBottom>
            {pipelineData?.title}
          </Typography>
        </div>
        <div className={classes.modalPipelineDividerLine}></div>
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

export default ModalPipeline;
