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
        setData((prevData) => {
          if (prevData.findIndex((prev) => prev.name === data.name) === -1)
            return [...prevData, { ...data, dataType: 'spell' }];
          else return prevData;
        });
      })
    );
  }
};

export default parseSpells;
