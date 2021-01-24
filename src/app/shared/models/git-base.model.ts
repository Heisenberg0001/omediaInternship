import {GitUser} from './git-user.model';

export class GitBase {
  incomplete_results: boolean;
  items: GitUser[];
  total_count: number;
}
