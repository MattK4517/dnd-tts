import { useLoaderData } from 'react-router-dom';
import { IClass } from '../../models/models';

const ClassPage = () => {
  const classData: IClass = useLoaderData();
  return (
    <div>
      <span>{JSON.stringify(classData)}</span>
    </div>
  );
};

export default ClassPage;
