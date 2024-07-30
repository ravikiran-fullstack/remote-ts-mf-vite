import React from 'react'
import Pipeline from '../pipeline/Pipeline'

const ProdDeployPipeline:React.FC = () => {
  return (
    <Pipeline pipelineStageName="prodDeploy"/>
  )
}

export default ProdDeployPipeline