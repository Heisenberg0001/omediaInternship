import {Injectable, OnInit} from '@angular/core';

import { GitUser } from '../../shared/models/git-user.model';
import { GitRepositories } from '../../shared/models/git-repositories.model';
import { HttpClient } from '@angular/common/http';
import { EMPTY, from, Observable } from 'rxjs';
import { ajax } from 'rxjs/ajax';
import { catchError, distinctUntilChanged, map } from 'rxjs/operators';
import { GitBase} from '../../shared/models/git-base.model';

@Injectable({
  providedIn: 'root'
})

export class CoreService implements OnInit {
  private readonly _url = "https://api.github.com/search/users?q=";
  private _userInfo: GitUser;
  private _userRepos: GitRepositories[];

  constructor( private _http: HttpClient ) {
  }

  ngOnInit(): void {
  }

  public setUserInfo( user: GitUser ): void {
    this._userInfo = user;
  }

  public setUserRepos( repositories: GitRepositories[] ): void {
    this._userRepos = repositories;
  }

  public searchUsers( user: string ): Observable<GitUser[]> {
    return from(
      ajax.getJSON<GitBase>(this._url + user ).pipe(
        map( users => users.items),
        distinctUntilChanged(),
        catchError( err => EMPTY )
      )
    );
  }

  public searchUserRepos( userRepoURL: GitUser ): Observable<GitRepositories[]> {

      return from(
        ajax.getJSON<GitRepositories[]>(userRepoURL['repos_url']).pipe(
          catchError( err => EMPTY )
        ));

  }
}
