import { GitUser } from './git-user.interface';

export interface GitBase {
  total_count: number;
  incomplete_results: boolean;
  items: GitUser[];
}
