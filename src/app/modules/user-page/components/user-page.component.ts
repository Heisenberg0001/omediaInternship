import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { GitUserDetailed } from '../../../shared/interfaces/git-user-detailed.interface';
import { GitOrganizations } from '../../../shared/interfaces/git-organizations.interface';
import { CoreService } from '../../../core/services/core.service';
import { GitRepositories } from '../../../shared/interfaces/git-repositories.interface';

@Component({
  selector: 'app-user',
  templateUrl: 'user-page.component.html',
  styleUrls: ['user-page.component.css']
})

export class UserPageComponent implements OnInit, OnDestroy {
  private _userInfo: GitUserDetailed;
  private _userOrganizationsInfo: GitOrganizations[];
  private _userRepositories: GitRepositories[];
  private _userOrganizationSubscription: Subscription;
  private _userReposSubscription: Subscription;

  constructor( private _router: Router,
               private _activatedRoute: ActivatedRoute,
               private _coreService: CoreService
               ) {}

  ngOnInit() {
    if (this._coreService.getUserInfo()) {

      this._userInfo = this._coreService.getUserInfo();
      if (this._userInfo) {
        this._userOrganizationSubscription = this._coreService.searchUserOrganizations(this._userInfo).subscribe((organization) => {
            this._userOrganizationsInfo = organization;
          });
        this._userReposSubscription = this._coreService.searchUserRepos(this._userInfo).subscribe( (repos) => {
          this._userRepositories = repos;
        });
      }
    }
  }
  ngOnDestroy() {
    if (this._userOrganizationSubscription || this._userReposSubscription) {
      this._userOrganizationSubscription.unsubscribe();
      this._userReposSubscription.unsubscribe();
    }
  }

  public getUserInfo(): GitUserDetailed {
    return this._userInfo;
  }
  public getUserOrganizations(): GitOrganizations[] {
    return this._userOrganizationsInfo;
  }
  public getUserRepos(): GitRepositories[] {
    return this._userRepositories;
  }
  public onBackBtn(): void {
    this._router.navigate([''], { relativeTo: this._activatedRoute })
  }
}
