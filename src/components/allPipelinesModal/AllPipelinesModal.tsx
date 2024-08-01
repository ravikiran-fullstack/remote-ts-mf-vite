import { Box, Button, Modal, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

import React from "react";
import useGetAllPipelineData from "../../hooks/useGetAllPipelineData";
import ModalPipeline from "./ModalPipeline";

const useStyles = makeStyles(() => {
  return {
    modalStyles: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: "1572px",
      height: "80vh", // Set a height to enable scrolling
      backgroundColor: "white",
      color: "black",
      border: "2px solid #000",
      p: 4,
      overflowY: "auto",
    },

    modalTitle: {
      padding: "1rem",
      backgroundColor: "#f5f5f5",
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },

    modalHeading: {
      padding: "0.5rem 1rem",
    },

    pipelineContainer: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "start",
      marginTop: "1rem",
      padding: "2rem",
    },
    singlePipelineContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "start",
      marginTop: "1rem",
    },
  };
});

// interface Notification {
//   type: string;
//   message: string;
// }

// interface PipelineStep {
//   id: number;
//   name: string;
//   status: string;
//   time: string;
//   notification: Notification[];
// }

// interface PipelineData {
//   environment: string;
//   steps: PipelineStep[];
// }

interface ModalProps {
  open: boolean;
  handleClose: () => void;
}

const AllPipelinesModal: React.FC<ModalProps> = (props) => {
  const { allPipelinesData, loading, error } = useGetAllPipelineData();

  console.log("allPipelinesData", allPipelinesData, loading, error);
  const classes = useStyles();

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={classes.modalStyles}>
        <Box className={classes.modalTitle}>
          <Typography id="modal-modal-title" variant="h6" component="h6">
            All Environments Pipeline View
          </Typography>
          <Button onClick={props.handleClose}>Close</Button>
        </Box>
        <Box className={classes.modalHeading}>
          <Typography id="modal-modal-heading" variant="h5" component="h5">
            Application Pipeline
          </Typography>
        </Box>
        <Box className={classes.pipelineContainer}>
          {allPipelinesData &&
            allPipelinesData.map((stage) => {
              return (
                <div key={stage.environment}>
                  {/* <Typography>{stage.title}</Typography> */}
                  {/* <Box className={classes.singlePipelineContainer}>
                    {stage.steps &&
                      stage.steps.map((step: PipelineStep) => {
                        return (
                          <PipelineStep
                            key={step.id}
                            name={step.name}
                            status={step.status}
                          />
                        );
                      })}
                  </Box> */}
                  <ModalPipeline pipelineStageName={stage.environment} />
                </div>
              );
            })}
        </Box>
      </Box>
    </Modal>
  );
};

export default AllPipelinesModal;
