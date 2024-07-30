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
    environment: string;
    title: string;
    steps: PipelineStep[];
  }

// Define the custom hook
const useGetAllPipelineData = ( ) => {
  const [allPipelinesData, setAllPipelinesData] = useState<PipelineStage[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get<PipelineStage[]>("http://localhost:9001/pipelineStepsData");
        setAllPipelinesData(response.data);
        setLoading(false);
        console.log('in hook end',allPipelinesData);
      } catch (err) {
        setError(`Error occurred while fetching data: ${err}`);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { allPipelinesData, loading, error };
};

export default useGetAllPipelineData;