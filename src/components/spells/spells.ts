import { API_ROUTE } from '../../App';
import { spells } from '../../assets/stopWords';
import { Monster, Spell } from '../../models/models';
import handleWord from '../general/handleWord';

interface IParseSpells {
  word: string;
  setData: React.Dispatch<React.SetStateAction<Spell[] | Monster[]>>;
}

const parseSpells = ({ word, setData }: IParseSpells) => {
  const index = spells.findIndex(
    (spell) => spell.toLowerCase().trim() === word.toLowerCase().trim()
  );
  if (index !== -1) {
    fetch(`${API_ROUTE}/api/spells/${handleWord(word)}/`).then((res) =>
      res.json().then((data) => {
        console.log('HERE', { ...data, dataType: 'spell' });
        setData((prevData) => [...prevData, { ...data, dataType: 'spell' }]);
      })
    );
  }
};

export default parseSpells;
