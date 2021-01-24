import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';

import { GitUser } from '../../shared/models/git-user.model';
import { GitRepositories } from '../../shared/models/git-repositories.model';
import { CoreService } from '../../core/services/core.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})

export class LandingPageComponent implements OnInit, OnDestroy {
  private _toListView: boolean;
  private _toGridView: boolean;
  private _usersInfo: GitUser[];
  private _userRepos: GitRepositories[];
  private _usersInfoSubscription: Subscription;


  //   = [
  //   {
  //     avatar_url: "https://avatars0.githubusercontent.com/u/2?v=4",
  //     bio: "🍔",
  //     blog: "http://chriswanstrath.com/",
  //     company: null,
  //     created_at: "2007-10-20T05:24:19Z",
  //     email: null,
  //     events_url: "https://api.github.com/users/defunkt/events{/privacy}",
  //     followers: 21118,
  //     followers_url: "https://api.github.com/users/defunkt/followers",
  //     following: 210,
  //     following_url: "https://api.github.com/users/defunkt/following{/other_user}",
  //     gists_url: "https://api.github.com/users/defunkt/gists{/gist_id}",
  //     gravatar_id: "",
  //     hireable: null,
  //     html_url: "https://github.com/defunkt",
  //     id: 2,
  //     location: null,
  //     login: "defunkt",
  //     name: "Chris Wanstrath",
  //     node_id: "MDQ6VXNlcjI=",
  //     organizations_url: "https://api.github.com/users/defunkt/orgs",
  //     public_gists: 273,
  //     public_repos: 107,
  //     received_events_url: "https://api.github.com/users/defunkt/received_events",
  //     repos_url: "https://api.github.com/users/defunkt/repos",
  //     site_admin: false,
  //     starred_url: "https://api.github.com/users/defunkt/starred{/owner}{/repo}",
  //     subscriptions_url: "https://api.github.com/users/defunkt/subscriptions",
  //     twitter_username: null,
  //     type: "User",
  //     updated_at: "2019-11-01T21:56:00Z",
  //     url: "https://api.github.com/users/defunkt"
  //   },
  //   {
  //     avatar_url: "https://avatars2.githubusercontent.com/u/39101574?v=4",
  //     bio: null,
  //     blog: "",
  //     company: null,
  //     created_at: "2018-05-08T19:26:32Z",
  //     email: null,
  //     events_url: "https://api.github.com/users/Heisenberg0001/events{/privacy}",
  //     followers: 1,
  //     followers_url: "https://api.github.com/users/Heisenberg0001/followers",
  //     following: 0,
  //     following_url: "https://api.github.com/users/Heisenberg0001/following{/other_user}",
  //     gists_url: "https://api.github.com/users/Heisenberg0001/gists{/gist_id}",
  //     gravatar_id: "",
  //     hireable: null,
  //     html_url: "https://github.com/Heisenberg0001",
  //     id: 39101574,
  //     location: null,
  //     login: "Heisenberg0001",
  //     name: null,
  //     node_id: "MDQ6VXNlcjM5MTAxNTc0",
  //     organizations_url: "https://api.github.com/users/Heisenberg0001/orgs",
  //     public_gists: 0,
  //     public_repos: 12,
  //     received_events_url: "https://api.github.com/users/Heisenberg0001/received_events",
  //     repos_url: "https://api.github.com/users/Heisenberg0001/repos",
  //     site_admin: false,
  //     starred_url: "https://api.github.com/users/Heisenberg0001/starred{/owner}{/repo}",
  //     subscriptions_url: "https://api.github.com/users/Heisenberg0001/subscriptions",
  //     twitter_username: null,
  //     type: "User",
  //     updated_at: "2021-01-06T19:02:42Z",
  //     url: "https://api.github.com/users/Heisenberg0001"
  //   }
  // ];
  public checkInput: boolean = false;

  constructor( private _coreService: CoreService
  ) {
      this._toGridView = true;
      this._toListView = false;
  }

  ngOnInit(): void {}

  ngOnDestroy() {
    this._usersInfoSubscription.unsubscribe();
  }

  public getListView(): boolean {
    return this._toListView;
  }

  public getGridView(): boolean {
    return this._toGridView;
  }

  public getUsersInfo(): GitUser[] {
    return this._usersInfo;
  }

  public getUserRepo(): GitRepositories[] {
    return this._userRepos;
  }

  public onSubmit(form: NgForm): void {
    console.log(form.value["gitUserName"]);

    //Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.
    if(/^[\d\w][\d\w-]*[\d\w]?$/g.test(form.value["gitUserName"])) {
      this._usersInfoSubscription = this._coreService.searchUsers(form.value["gitUserName"]).subscribe(
        (users) => {
          this._usersInfo = users;
          console.log(this._usersInfo);

          for ( let user of this._usersInfo) {
            this._coreService.searchUserRepos(user).subscribe(
              (repos) => {
                console.log(repos);
              });
          }
        }
      );
    } else {
      console.log("false");
      return;
    }
  }

  public onListView(): void {

    if(!this._toListView){
      this._toListView = true;
      this._toGridView = !this._toListView;
    } else return;

  }

  public onGridView(): void {

    if (!this._toGridView) {
      this._toGridView = true;
      this._toListView = !this._toGridView;
    } else return;
  }

}
