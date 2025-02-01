import { useParams } from 'react-router-dom';

const SpotDetails = () => {
  const { id } = useParams();

  return <div>Details for Spot {id}</div>;
};

export default SpotDetails;