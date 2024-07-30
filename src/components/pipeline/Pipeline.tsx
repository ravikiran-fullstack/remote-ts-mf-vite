import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PipelineStep from "../pipelineStep/PipelineStep";
import useGetPipelineData from "../../hooks/useGetPipelineData";
import { Box } from "@mui/material";

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
  };
});

const Pipeline: React.FC<PipelineProps> = (props) => {
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
        <a href="#">See All Environments</a>
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
    </div>
  );
};

export default Pipeline;
