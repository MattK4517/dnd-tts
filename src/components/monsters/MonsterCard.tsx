import { API_ROUTE } from '../../App';
import { Monster } from '../../models/models';
import Card from '../general/Card';
import StatBlock from './StatBlock';

interface IMonsterCardProps {
  monster: Monster;
}

const MonsterCard = ({ monster }: IMonsterCardProps) => {
  return (
    <Card>
      <div className='before:bg-red-700 before:w-0.5 before:absolute before:h-full before:rounded-sm before:left-0 pl-5 relative flex items-center w-full mb-6'>
        <img src={API_ROUTE + monster.image} className='w-16 h-16' />
        <div className='flex-1 flex flex-col justify-start items-start pl-3'>
          <span className='text-2xl'>{monster.name}</span>
          <span className='text-base text-zinc-500'>
            {monster.size}, {monster.type}
          </span>
        </div>
        <div className='flex flex-col ml-4'>
          <span className='w-full text-left text-sm self-center text-zinc-500'>
            HP: {monster.hit_points} ({monster.hit_points_roll})
          </span>
          <span className='w-full text-left text-sm self-center text-zinc-500'>
            Speed: {monster.armor_class[0].type}
          </span>
          <span className='w-full text-left text-sm self-center text-zinc-500'>
            Value: {monster.armor_class[0].value}
          </span>
        </div>
      </div>
      <div className='grid grid-cols-6'>
        <StatBlock stat={'Strength'} value={monster.strength} />
        <StatBlock stat={'Dexterity'} value={monster.dexterity} />
        <StatBlock stat={'Constitution'} value={monster.constitution} />
        <StatBlock stat={'Intelligence'} value={monster.intelligence} />
        <StatBlock stat={'Wisdom'} value={monster.wisdom} />
        <StatBlock stat={'Charisma'} value={monster.charisma} />
      </div>
      <div className='my-7 bg-red-500 h-0.5 rounded-md shadow-2xl' />
      <div className='flex'>
        <div className='flex flex-col gap-1 flex-1' id='monster-immunity'>
          <span className='self-center text-lg font-bold'>Immunities</span>
          {monster.condition_immunities.map((condition) => {
            return (
              <span className='w-fit flex self-center'>{condition.name}</span>
            );
          })}
          {monster.damage_immunities.map((condition) => {
            return <span className='w-fit flex self-center'>{condition}</span>;
          })}
        </div>

        <div className='flex flex-col gap-1 flex-1' id='monster-immunity'>
          <span className='self-center text-lg font-bold'>Resistances</span>
          {monster.damage_resistances.map((condition) => {
            return <span className='w-fit flex self-center'>{condition}</span>;
          })}
        </div>
        <div
          className='flex flex-col justify-start gap-1 flex-1'
          id='monster-vulnerability'
        >
          <span className='self-center text-lg font-bold'>Vulnerabilities</span>
          {monster.damage_vulnerabilities.map((condition) => {
            return <span className='w-fit flex self-center'>{condition}</span>;
          })}
        </div>
      </div>
      <div className='my-7 bg-red-500 h-0.5 rounded-md shadow-2xl' />
    </Card>
  );
};

export default MonsterCard;
