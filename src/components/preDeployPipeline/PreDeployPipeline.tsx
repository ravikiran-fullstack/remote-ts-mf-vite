import React from "react";
import Pipeline from "../pipeline/Pipeline";


const PreDeployPipeline: React.FC = () => {
  return (
    <Pipeline pipelineStageName="preDeploy"/>
  );
};

export default PreDeployPipeline;
