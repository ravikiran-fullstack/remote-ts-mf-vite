import { useState, useEffect } from "react";
import axios from "axios";

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

  interface PipelineStage{
    stage: string;
    steps: PipelineStep[];
  }

// Define the custom hook
const useGetPipelineData = ( pipelineStageName : string) => {
  console.log('in hook pipelineStageName',pipelineStageName);
  const [pipelineData, setPipelineData] = useState<PipelineStage>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<PipelineStage[]>("http://localhost:9001/pipelineStepsData");
        console.log('response.data',response.data);
        console.log('pipelineStageName',response.data.find(pipelineStageInfo => pipelineStageInfo.stage ===  pipelineStageName));
        setPipelineData(response.data.find(pipelineStageInfo => pipelineStageInfo.stage ===  pipelineStageName));
        setLoading(false);
        console.log('in hook end',pipelineData);
      } catch (err) {
        setError(`Error occurred while fetching data: ${err}`);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { pipelineData, loading, error };
};

export default useGetPipelineData;