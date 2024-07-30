import React from 'react'
import Pipeline from '../pipeline/Pipeline'

const DevPipeline:React.FC = () => {
  return (
    <Pipeline pipelineStageName="devDeploy"/>
  )
}

export default DevPipeline