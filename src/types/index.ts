export type Match = {
  match_id: number;
  match_date: string;
  home_team_id: number;
  home_team_name: string;
  away_team_id: number;
  away_team_name: string;
};

export type Formation_Player = {
  match_id: number;
  formation_id: number;
  team_id: number;
  team_name: string;
  player_id: number;
  player_name: string;
  position_id: number;
  position_name: string;
};

export type Pass = {
  match_id: number;
  period: number;
  minute: number;
  second: number;
  team_id: number;
  team_name: string;
  player_id: number;
  player_name: string;
  location_x: number;
  location_y: number;
  outcome_name: string;
  pass_end_location_x: number;
  pass_end_location_y: number;
  pass_recipient_id: number | null;
  pass_recipient_name: string | null;
  obv_added: number;
  team_formation_id: number;
  opp_formation_id: number;
};

export interface PlayerPassDetails {
  player_id: number;
  totalValueAdded: number;
  player_name: string;
  team_name: string;
}
