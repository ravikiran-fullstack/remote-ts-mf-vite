import React from "react";
import Pipeline from "../pipeline/Pipeline";
import CSSPipeline from "../pipeline/CSSPipeline";

const PreDeployPipeline: React.FC = () => {
  return (
    <>
      <Pipeline pipelineStageName="preDeploy" />
      <CSSPipeline pipelineStageName="preDeploy" />
    </>
  );
};

export default PreDeployPipeline;
