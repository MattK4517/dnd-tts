import { spells } from '../../assets/stopWords';

const handleWord = (word: string) => {
  return word
    .toLowerCase()
    .replaceAll(' ', '-')
    .replaceAll('/', '-')
    .replaceAll("'", '');
};
export default handleWord;

//valid types: god, item
export function getAllObjectsOfType(type: 'spell' | 'monster') {
  if (type === 'spell') return spells;
  return [];
}

export async function findObjectWithShortenedName(
  name: string,
  type: 'spell' | 'monster'
) {
  name = name
    .replace(/ /g, '')
    .replace(/'/g, '')
    .replace(/’/g, '')
    .trim()
    .toLowerCase();
  let objectList = getAllObjectsOfType(type);
  return new Promise((resolve) => {
    let currentObjectName = '';
    objectList.forEach((object) => {
      if (type === 'spell') {
        currentObjectName = object
          .replace(/ /g, '')
          .replace(/'/g, '')
          .replace(/’/g, '')
          .trim()
          .toLowerCase();
        if (currentObjectName === name) {
          let godObject = {
            object: object,
            exact: true,
          };
          resolve(godObject);
        }
      }
    });
    //didnt find exact match, now looking for abbreviations
    if (name.length < 2) return;

    objectList.forEach((object) => {
      if (type === 'spell') {
        currentObjectName = object
          .replace(/ /g, '')
          .replace(/'/g, '')
          .replace(/’/g, '')
          .trim()
          .toLowerCase();
        if (currentObjectName.includes(name)) {
          let godObject = {
            object: object,
            exact: false,
          };
          resolve(godObject);
        }
      }
    });
    resolve(false);
  });
}
