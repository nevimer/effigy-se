import { BooleanLike } from 'common/react';
import { sendAct } from '../../backend';
import { Gender } from './preferences/gender';

export enum Food {
  Alcohol = 'ALCOHOL',
  Breakfast = 'BREAKFAST',
  Bugs = 'BUGS',
  Cloth = 'CLOTH',
  Dairy = 'DAIRY',
  Fried = 'FRIED',
  Fruit = 'FRUIT',
  Gore = 'GORE',
  Grain = 'GRAIN',
  Gross = 'GROSS',
  Junkfood = 'JUNKFOOD',
  Meat = 'MEAT',
  Nuts = 'NUTS',
  Oranges = 'ORANGES',
  Pineapple = 'PINEAPPLE',
  Raw = 'RAW',
  Seafood = 'SEAFOOD',
  Sugar = 'SUGAR',
  Toxic = 'TOXIC',
  Vegetables = 'VEGETABLES',
}

export enum JobPriority {
  Low = 1,
  Medium = 2,
  High = 3,
}

export type Name = {
  can_randomize: BooleanLike;
  explanation: string;
  group: string;
};

export type Species = {
  name: string;
  desc: string;
  lore: string[];
  icon: string;

  use_skintones: BooleanLike;
  sexes: BooleanLike;

  enabled_features: string[];

  perks: {
    positive: Perk[];
    negative: Perk[];
    neutral: Perk[];
  };

  diet?: {
    liked_food: Food[];
    disliked_food: Food[];
    toxic_food: Food[];
  };
};

export type Perk = {
  ui_icon: string;
  name: string;
  description: string;
};

export type Department = {
  head?: string;
};

export type Job = {
  description: string;
  department: string;
};
// EFFIGY EDIT ADD START (#3 Customization - Ported from Skyrat)
export type Language = {
  description: string;
  name: string;
  icon: string;
};

export type Marking = {
  name: string;
  color: string;
  marking_id: string;
};

export type MarkingData = {
  marking_choices: string[];
  markings_list: Marking[];
};

export type Limb = {
  slot: string;
  name: string;
  can_augment: boolean;
  chosen_aug: string;
  chosen_style: string;
  aug_choices: Record<string, string>;
  costs: Record<string, number>;
  markings: MarkingData;
};

export type Organ = {
  slot: string;
  name: string;
  chosen_organ: string;
  organ_choices: Record<string, string>;
  costs: Record<string, number>;
};
// EFFIGY EDIT ADD END (#3 Customization - Ported from Skyrat)
export type Quirk = {
  description: string;
  icon: string;
  name: string;
  value: number;
};

export type QuirkInfo = {
  max_positive_quirks: number;
  quirk_info: Record<string, Quirk>;
  quirk_blacklist: string[][];
};

export enum RandomSetting {
  AntagOnly = 1,
  Disabled = 2,
  Enabled = 3,
}

export enum JoblessRole {
  BeOverflow = 1,
  BeRandomJob = 2,
  ReturnToLobby = 3,
}

export enum GamePreferencesSelectedPage {
  Settings,
  Keybindings,
}

export const createSetPreference =
  (act: typeof sendAct, preference: string) => (value: unknown) => {
    act('set_preference', {
      preference,
      value,
    });
  };

export enum Window {
  Character = 0,
  Game = 1,
  Keybindings = 2,
}

export type PreferencesMenuData = {
  character_preview_view: string;
  character_profiles: (string | null)[];

  preview_options: string; // EFFIGY EDIT ADD (#3 Customization - Ported from Skyrat)
  preview_selection: string; // EFFIGY EDIT ADD (#3 Customization - Ported from Skyrat)

  character_preferences: {
    clothing: Record<string, string>;
    features: Record<string, string>;
    game_preferences: Record<string, unknown>;
    non_contextual: {
      random_body: RandomSetting;
      [otherKey: string]: unknown;
    };
    secondary_features: Record<string, unknown>;
    supplemental_features: Record<string, unknown>;

    names: Record<string, string>;

    misc: {
      gender: Gender;
      joblessrole: JoblessRole;
      species: string;
    };

    randomization: Record<string, RandomSetting>;
  };

  content_unlocked: BooleanLike;

  job_bans?: string[];
  job_days_left?: Record<string, number>;
  job_required_experience?: Record<
    string,
    {
      experience_type: string;
      required_playtime: number;
    }
  >;
  job_preferences: Record<string, JobPriority>;
  // EFFIGY EDIT ADD START (#3 Customization - Ported from Skyrat)
  job_alt_titles: Record<string, string>;

  robotic_styles: string[];
  limbs_data: Limb[];
  organs_data: Organ[];
  marking_presets: string[];

  selected_languages: Language[];
  unselected_languages: Language[];
  total_language_points: number;
  quirks_balance: number;
  positive_quirk_count: number;
  species_restricted_jobs?: string[];
  // EFFIGY EDIT ADD END (#3 Customization - Ported from Skyrat)
  keybindings: Record<string, string[]>;
  overflow_role: string;
  selected_quirks: string[];

  antag_bans?: string[];
  antag_days_left?: Record<string, number>;
  selected_antags: string[];

  active_slot: number;
  name_to_use: string;

  window: Window;
};

export type ServerData = {
  jobs: {
    departments: Record<string, Department>;
    jobs: Record<string, Job>;
  };
  names: {
    types: Record<string, Name>;
  };
  quirks: QuirkInfo;
  random: {
    randomizable: string[];
  };
  species: Record<string, Species>;
  [otheyKey: string]: unknown;
};
