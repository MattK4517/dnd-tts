import { Link } from 'react-router-dom';
import { Spell } from '../../models/models';
import Card from '../general/Card';
import { PopoverMenu } from '../general/HoverPopover';

interface ISpellCardProps {
  spell: Spell;
  spellLevel: string;
}

const dcMessage = (dc: Spell['dc']) => {
  let retMessage = '';
  if (dc.dc_success === 'half') retMessage = 'take half damage';
  else if (dc.dc_success === 'other') retMessage = dc.desc || '';
  return retMessage;
};

const SpellCard = ({ spell, spellLevel }: ISpellCardProps) => {
  return (
    <Card>
      <div className='before:bg-red-700 before:w-0.5 before:absolute before:h-full before:rounded-sm before:left-0 pl-5 relative flex items-center w-full mb-6'>
        <span className='text-2xl'>
          {spell.name}
          <span className='text-sm self-center ml-4 text-zinc-500'>
            {spell.concentration ? '(concentration required)' : ''}
          </span>
          <span className='text-sm self-center ml-4 text-zinc-500'>
            {spell.damage?.damage_type
              ? `Damage Type: ${spell.damage.damage_type.name}`
              : ''}
          </span>
        </span>
      </div>
      <div className='flex flex-col w-full justify-start'>
        {spell.desc.map((desc, index) => {
          return (
            <span key={index} className='text-left'>
              {desc}
            </span>
          );
        })}
        <div className='my-7 bg-red-500 h-0.5 rounded-md shadow-2xl' />
        <div
          className='flex flex-col justify-start gap-1'
          id='spell-casting-info'
        >
          <span className='self-center text-lg font-bold'>Casting info</span>
          {spell.higher_level.length > 0 ? (
            <span className='w-fit flex'>
              <span className='font-bold min-w-max h-fit'>
                Casting above {spell.level}:
              </span>
              {spell.higher_level.map((effect) => {
                return <span className='text-left ml-2'>{effect}</span>;
              })}
            </span>
          ) : undefined}
          <span className='w-fit'>
            <span className='font-bold'>Casting time: </span>
            {spell.casting_time}
          </span>
          <span className='w-fit'>
            <span className='font-bold'>Duration: </span>
            {spell.duration}
          </span>
          <span className='w-fit'>
            <span className='font-bold'>Range: </span>
            {spell.area_of_effect
              ? `${spell.area_of_effect.size} ${spell.area_of_effect.type} within `
              : undefined}
            {spell.range}
          </span>
          <span className='w-fit'>
            <span className='font-bold'>Components: </span>
            {spell.components.map((comp) => {
              if (
                spell.components.indexOf(comp) ===
                spell.components.length - 1
              )
                return `${comp}`;
              else return `${comp},`;
            })}
            <span className='text-xs text-zinc-500 ml-3'>
              ({spell.material})
            </span>
          </span>
          {spell.ritual ? (
            <span className='w-fit'>
              <span className='font-bold'>Ritual: </span>
              Can be Ritual cast
            </span>
          ) : undefined}
          {spell.dc ? (
            <span className='w-fit'>
              <span className='font-bold'>DC Type: </span>
              {spell.dc.dc_type.name}
              <span className='text-xs text-zinc-500 ml-3'>
                (on success: {dcMessage(spell.dc)})
              </span>
            </span>
          ) : undefined}
        </div>
        <div className='my-4 bg-red-500 h-0.5 rounded-md shadow-2xl' />
        <div
          className='flex flex-col justify-start gap-1'
          id='spell-general-info'
        >
          <span className='self-center text-lg font-bold'>General info</span>
          <span className='w-fit flex items-center'>
            <span className='font-bold'>School: </span>
            <PopoverMenu
              queryURL={spell.school.url}
              labelText={spell.school.name}
            />
          </span>
          <span className='w-fit flex items-center'>
            <span className='font-bold'>Classes: </span>
            {spell.classes.map((classParams, index) => {
              return (
                <Link
                  to={`/class/${classParams.name}`}
                  target='_blank'
                  key={index}
                  className='px-5 py-4 cursor-pointer'
                >
                  {classParams.name}
                </Link>
              );
            })}
          </span>
          <span className='w-fit flex items-center'>
            <span className='font-bold'>Sub Classes: </span>
            {spell.subclasses.map((classParams, index) => {
              return (
                <Link
                  to={`/subclass/${classParams.name}`}
                  target='_blank'
                  key={index}
                  className='px-5 py-4 cursor-pointer'
                >
                  {classParams.name}
                </Link>
              );
            })}
          </span>
          {/* 
                add subclasses
            */}
        </div>
      </div>
    </Card>
  );
};

export default SpellCard;
