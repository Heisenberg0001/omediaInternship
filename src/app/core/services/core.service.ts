import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { EMPTY, from, Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError, distinctUntilChanged, map, mergeMap, tap } from 'rxjs/operators';

import { GIT_API_URL } from '../../config/http';
import { GitUserDetailed } from '../../shared/interfaces/git-user-detailed.interface';
import { GitRepositories } from '../../shared/interfaces/git-repositories.interface';
import { GitBase } from '../../shared/interfaces/git-base.interface';
import { GitOrganizations } from '../../shared/interfaces/git-organizations.interface';
import { GitUser } from '../../shared/interfaces/git-user.interface';

@Injectable({
  providedIn: 'root'
})

export class CoreService implements OnInit, OnDestroy {
  private _user: GitUserDetailed;
  private _users: GitUser[];
  private _usersInfoSubscription: Subscription;

  constructor( private _httpClient: HttpClient ) {}

  ngOnInit(): void {}
  ngOnDestroy() {
    this._usersInfoSubscription.unsubscribe();
  }

  public setUserInfo( user: GitUserDetailed ): void {
    this._user = user;
  }
  public getUserInfo(): GitUserDetailed {
    return this._user;
  }
  public getUsersInfo(): GitUser[] {
    return this._users;
  }
  public setUsersInfo(newUsers: GitUser[]): void {
    this._users = newUsers;
  }
  public getPopularUsers(): Observable<GitUser[]> {
    return this._httpClient.get<GitBase>(`${GIT_API_URL}?q=followers:>21000`).pipe(
      catchError( err => EMPTY ),
      map( payload => payload.items ));
  }
  public searchUsers( user: string ): Observable<GitUser[]> {
    return this._httpClient.get<GitBase>(`${GIT_API_URL}?q=${user}`).pipe(
      catchError( err => EMPTY ),
      map( payload => payload.items )
    );
  }
  public searchUserName( user: GitUser): Observable<GitUserDetailed> {
    return this._httpClient.get<GitUserDetailed>(`${user['url']}`).pipe(
      catchError( err => EMPTY ));
  }
  public searchUserRepos( user: GitUserDetailed ): Observable<GitRepositories[]> {
    return this._httpClient.get<GitRepositories[]>(`${user['repos_url']}`).pipe(
      catchError( err => EMPTY ));
  }
  public searchUserOrganizations( user: GitUserDetailed ): Observable<GitOrganizations[]> {
    return this._httpClient.get<GitOrganizations[]>(`${user['organizations_url']}`).pipe(
      catchError( err => EMPTY ));
  }
}
