import { useLoaderData } from 'react-router-dom';

const ClassPage = () => {
  const classData = useLoaderData();
  return (
    <div>
      <span>{JSON.stringify(classData)}</span>
    </div>
  );
};

export default ClassPage;
