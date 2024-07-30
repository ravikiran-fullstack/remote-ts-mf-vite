import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PipelineStep from "../pipelineStep/PipelineStep";
import useGetPipelineData from "../../hooks/useGetPipelineData";
import { Box } from "@mui/material";
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

const useStyles = makeStyles(() => {
  return {
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
    pipelineContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "start",
      marginTop: "1rem",
    },
    modalStyles: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "2px solid #000",
      p: 4,
    },
    linkStyle: {
      cursor: "pointer",
      color: "#007bff",
      textDecoration: "underline",
    }
  };
});

const Pipeline: React.FC<PipelineProps> = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  console.log(
    "pipelineStageName in pipeline component",
    props.pipelineStageName
  );
  const { pipelineData, loading, error } = useGetPipelineData(
    props.pipelineStageName
  );
  console.log(
    "pipelineData in pipeline component end ---------------------------------",
    pipelineData
  );
  const classes = useStyles();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className={classes.container}>
      <div className={classes.containerHeading}>
        <h4>Pipeline</h4>
        <span className={classes.linkStyle} onClick={handleOpen}>See All Environments</span>
      </div>
      <Box className={classes.pipelineContainer}>
        {pipelineData &&
          pipelineData.steps.map((step: PipelineStep) => {
            return (
              <PipelineStep
                key={step.id}
                name={step.name}
                status={step.status}
              />
            );
          })}
      </Box>
      <div>
        <AllPipelinesModal open={open} handleClose={handleClose}/>
      </div>
    </div>
  );
};

export default Pipeline;
