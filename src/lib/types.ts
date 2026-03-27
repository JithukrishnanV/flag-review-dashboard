export interface Case {
  id: number;
  case_number: string;
  total_flags: number;
  reviewed_flags: number;
}

export interface Flag {
  id: number;
  case_id: number;
  title: string;
  category: string;
  status: string;
  budget_screen_info: string;
  case_file_info: string;
  explanation: string;
  notes: string;
  reviewed_at: string | null;
  created_at: string;
}
