const abilityScoreMod = (abilityScore: number) => {
  const asm = Math.floor((abilityScore - 10) / 2);
  if (asm > 0) return `+${asm}`;
  else return asm;
};

const StatBlock = ({ stat, value }: { stat: string; value: number }) => {
  return (
    <div className='flex flex-col items-center'>
      <span>{stat}</span>
      <span>
        {value}{' '}
        <span className='text-xs self-center text-zinc-500'>
          ({abilityScoreMod(value)})
        </span>
      </span>
    </div>
  );
};

export default StatBlock;
