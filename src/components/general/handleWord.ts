const handleWord = (word: string) => {
  return word
    .toLowerCase()
    .replaceAll(' ', '-')
    .replaceAll('/', '-')
    .replaceAll("'", '');
};
export default handleWord;
