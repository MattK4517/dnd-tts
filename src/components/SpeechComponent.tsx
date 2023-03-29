import { useEffect, useState } from 'react';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { Monster, Spell } from '../models/models';
import { findObjectWithShortenedName } from './general/handleWord';
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
        console.log(spellName);
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

  const [textBox, setTextBox] = useState<string>('Search Here');
  const [spell, setSpell] = useState<string>('');
  const [spellLevel, setSpellLevel] = useState<string>('');
  const [data, setData] = useState<Spell[] | Monster[]>([]);

  useEffect(() => {
    findObjectWithShortenedName(transcript, 'spell').then(
      // @ts-ignore
      (res) => {
        const word = res.object;
        if (res.exact) parseSpells({ word, setData });
      }
      // parseSpells({res.object, setData}),
    );
  }, [transcript]);

  useEffect(() => {
    findObjectWithShortenedName(spell, 'spell').then(
      // @ts-ignore
      (res) => {
        const word = res.object;
        if (res.exact) parseSpells({ word, setData });
      }
      // parseSpells({res.object, setData}),
    );
  }, [spell]);

  useEffect(() => {
    findObjectWithShortenedName(textBox, 'spell').then(
      // @ts-ignore
      (res) => {
        const word = res.object;
        if (res.exact) parseSpells({ word, setData });
      }
    );
    const word = textBox;
    parseSpells({ word, setData });
    parseMonsters({ word, setData });
  }, [textBox]);

  useEffect(() => {
    resetTranscript();
  }, [data]);

  return (
    <div className='flex flex-col'>
      <div className='flex flex-col mb-9'>
        <span className='text-2xl'>DND 5e Voice activated Search</span>
        <span>
          Can be used to query data for monsters/spells in Dungeons and Dragons
          5th Edition.
          <br />
          Speech-to-text allows this to search for rules in real-time to
          streamline games for the DM
        </span>
      </div>
      <input
        className='w-full h-10 bg-slate-800 rounded-md shadow-2xl text-white p-4 border-2 border-slate-900'
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
      <span>Try turning the Microphone on and saying "Fireball"</span>
      <p>{transcript}</p>
      <div className='flex flex-col gap-5 mt-5'>
        {data.map((entry, index) => {
          if (entry.dataType === 'spell') {
            return (
              <SpellCard
                key={index}
                // @ts-ignore
                spell={entry}
                spellLevel={spellLevel}
              />
            );
          } else if (entry.dataType === 'monster') {
            return (
              <MonsterCard
                key={index}
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
