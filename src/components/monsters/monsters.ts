import { API_ROUTE } from '../../App';
import { monsters } from '../../assets/stopWords';
import { Monster, Spell } from '../../models/models';
import handleWord from '../general/handleWord';

interface IParseMonsters {
  word: string;
  setData: React.Dispatch<React.SetStateAction<Spell[] | Monster[]>>;
}

const parseMonsters = ({ word, setData }: IParseMonsters) => {
  const index = monsters.findIndex(
    (monsters) => monsters.toLowerCase().trim() === word.toLowerCase().trim()
  );
  if (index !== -1) {
    fetch(`${API_ROUTE}/api/monsters/${handleWord(word)}/`).then((res) =>
      res.json().then((data) => {
        console.log({ ...data, dataType: 'monster' });
        setData((prevData) => [...prevData, { ...data, dataType: 'monster' }]);
      })
    );
  }
};

export default parseMonsters;
