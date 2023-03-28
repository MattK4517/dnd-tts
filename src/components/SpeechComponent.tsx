import { useEffect, useState } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { Monster, Spell } from '../models/models';
import MonsterCard from './monsters/MonsterCard';
import parseMonsters from './monsters/monsters';
import SpellCard from './spells/SpellCard';
import parseSpells from './spells/spells';

const SpeechComponent = () => {
  const commandList = [
    {
      command: [
        'can i * (at :spellLevel level)',
        'cast(ing) * (at :spellLevel level)',
        'use * (at :spellLevel level)',
        'using * (at :spellLevel level)',
      ],
      callback: (spellName: string, spellLevel = '') => {
        setSpell(spellName);
        setSpellLevel(spellLevel);
      },
    },
  ];
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition({
    commands: commandList,
  });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const [textBox, setTextBox] = useState<string>('');
  const [spell, setSpell] = useState<string>('');
  const [spellLevel, setSpellLevel] = useState<string>('');
  const [data, setData] = useState<Spell[] | Monster[]>([]);

  useEffect(() => {
    transcript.split(' ').map((word) => {
      parseSpells({ word, setData });
      parseMonsters({ word, setData });
    });
  }, [transcript]);

  useEffect(() => {
    const word = textBox;
    parseSpells({ word, setData });
    parseMonsters({ word, setData });
  }, [textBox]);

  return (
    <div>
      <input
        className='w-10 h-10 bg-slate-800'
        onChange={(e) => setTextBox(e.target.value)}
        type='text'
        value={textBox}
      ></input>
      <div>Microphone: {listening ? 'on' : 'off'}</div>
      <button onClick={async () => SpeechRecognition.startListening()}>
        Start
      </button>
      <button onClick={async () => SpeechRecognition.stopListening()}>
        Stop
      </button>
      <button onClick={resetTranscript}>Reset</button>
      <p>{transcript}</p>
      <div className='flex flex-col gap-5 mt-5'>
        {data.map((entry) => {
          if (entry.dataType === 'spell') {
            return (
              <SpellCard
                key={entry.name}
                // @ts-ignore
                spell={entry}
                spellLevel={spellLevel}
              />
            );
          } else if (entry.dataType === 'monster') {
            return (
              <MonsterCard
                key={entry.name}
                //@ts-ignore
                monster={entry}
              />
            );
          }
        })}
      </div>
    </div>
  );
};
export default SpeechComponent;
