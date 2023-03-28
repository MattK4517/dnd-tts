export interface Spell extends baseParams {
  dataType: string;
  desc: string[];
  higher_level: string[];
  range: string;
  components: string[];
  material: string;
  ritual: boolean;
  duration: string;
  concentration: boolean;
  casting_time: string;
  level: string;
  damage: {
    damage_type: baseParams;
    damage_at_slot_level: {
      3: '8d6';
      4: '9d6';
      5: '10d6';
      6: '11d6';
      7: '12d6';
      8: '13d6';
      9: '14d6';
    };
  };
  dc: {
    dc_type: baseParams;
    dc_success: string;
    desc?: string;
  };
  area_of_effect: {
    type: string;
    size: number;
  };
  school: baseParams;
  classes: baseParams[];
  subclasses: baseParams[];
}

type Size = 'Tiny' | 'Small' | 'Medium' | 'Large' | 'Huge' | 'Gargantuan';

type Alignment =
  | 'chaotic neutral'
  | 'chaotic evil'
  | 'chaotic good'
  | 'lawful neutral'
  | 'lawful evil'
  | 'lawful good'
  | 'neutral'
  | 'neutral evil'
  | 'neutral good'
  | 'any alignment'
  | 'unaligned';

export interface Monster extends baseParams {
  dataType: string;
  desc: string[];
  charisma: number;
  constitution: number;
  dexterity: number;
  intelligence: number;
  strength: number;
  wisdom: number;
  image: string;
  size: Size;
  type: string;
  subtype: string;
  alignments: Alignment;
  armor_class: {
    type: 'dex' | 'natural' | 'armor';
    value: number;
    desc: string;
    armor?: baseParams[];
    spell?: baseParams[];
    condition?: baseParams[];
  }[];
  hit_points: number;
  hit_dice: string;
  hit_points_roll: string;
  actions: {
    name: string;
    desc: string;
  };

  condition_immunities: baseParams[];
  damage_immunities: string[];
  damage_resistances: string[];
  damage_vulnerabilities: string[];
}

export interface IClass extends baseParams {
  hit_die: number;
  class_levels: string;
  multi_classing: {
    prerequisites: {
      ability_score: baseParams;
      minimum_score: number;
    }[];
    proficiencies: baseParams[];
  };
  spellcasting: {
    level: number;
    info: {
      name: string;
      desc: string[];
    }[];
    spellcasting_ability: baseParams;
  };
  spells: string;
  proficiencies: baseParams[];
  saving_throws: baseParams[];
  subclasses: baseParams[];
}

interface baseParams {
  index: string;
  name: string;
  url: string;
}
