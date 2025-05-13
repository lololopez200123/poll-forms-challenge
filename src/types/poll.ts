export interface PollOption {
  id: string;
  text: string;
  count: number;
}

export interface Poll {
  id: string;
  question: string;
  options: PollOption[];
  totalVotes: number;
  createdAt: Date;
}
