import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {NgForm} from '@angular/forms';
import {GitUser} from '../shared/models/git-user.model';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})

export class LandingPageComponent implements OnInit {
  public setInfo: Subscription;
  public userInfo: GitUser = {
    avatar_url: "https://avatars0.githubusercontent.com/u/2?v=4",
    bio: "🍔",
    blog: "http://chriswanstrath.com/",
    company: null,
    created_at: "2007-10-20T05:24:19Z",
    email: null,
    events_url: "https://api.github.com/users/defunkt/events{/privacy}",
    followers: 21118,
    followers_url: "https://api.github.com/users/defunkt/followers",
    following: 210,
    following_url: "https://api.github.com/users/defunkt/following{/other_user}",
    gists_url: "https://api.github.com/users/defunkt/gists{/gist_id}",
    gravatar_id: "",
    hireable: null,
    html_url: "https://github.com/defunkt",
    id: 2,
    location: null,
    login: "defunkt",
    name: "Chris Wanstrath",
    node_id: "MDQ6VXNlcjI=",
    organizations_url: "https://api.github.com/users/defunkt/orgs",
    public_gists: 273,
    public_repos: 107,
    received_events_url: "https://api.github.com/users/defunkt/received_events",
    repos_url: "https://api.github.com/users/defunkt/repos",
    site_admin: false,
    starred_url: "https://api.github.com/users/defunkt/starred{/owner}{/repo}",
    subscriptions_url: "https://api.github.com/users/defunkt/subscriptions",
    twitter_username: null,
    type: "User",
    updated_at: "2019-11-01T21:56:00Z",
    url: "https://api.github.com/users/defunkt"
  };
  public usersInfo: GitUser[] = [
    {
      avatar_url: "https://avatars0.githubusercontent.com/u/2?v=4",
      bio: "🍔",
      blog: "http://chriswanstrath.com/",
      company: null,
      created_at: "2007-10-20T05:24:19Z",
      email: null,
      events_url: "https://api.github.com/users/defunkt/events{/privacy}",
      followers: 21118,
      followers_url: "https://api.github.com/users/defunkt/followers",
      following: 210,
      following_url: "https://api.github.com/users/defunkt/following{/other_user}",
      gists_url: "https://api.github.com/users/defunkt/gists{/gist_id}",
      gravatar_id: "",
      hireable: null,
      html_url: "https://github.com/defunkt",
      id: 2,
      location: null,
      login: "defunkt",
      name: "Chris Wanstrath",
      node_id: "MDQ6VXNlcjI=",
      organizations_url: "https://api.github.com/users/defunkt/orgs",
      public_gists: 273,
      public_repos: 107,
      received_events_url: "https://api.github.com/users/defunkt/received_events",
      repos_url: "https://api.github.com/users/defunkt/repos",
      site_admin: false,
      starred_url: "https://api.github.com/users/defunkt/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/defunkt/subscriptions",
      twitter_username: null,
      type: "User",
      updated_at: "2019-11-01T21:56:00Z",
      url: "https://api.github.com/users/defunkt"
    },
    {
      avatar_url: "https://avatars2.githubusercontent.com/u/39101574?v=4",
      bio: null,
      blog: "",
      company: null,
      created_at: "2018-05-08T19:26:32Z",
      email: null,
      events_url: "https://api.github.com/users/Heisenberg0001/events{/privacy}",
      followers: 1,
      followers_url: "https://api.github.com/users/Heisenberg0001/followers",
      following: 0,
      following_url: "https://api.github.com/users/Heisenberg0001/following{/other_user}",
      gists_url: "https://api.github.com/users/Heisenberg0001/gists{/gist_id}",
      gravatar_id: "",
      hireable: null,
      html_url: "https://github.com/Heisenberg0001",
      id: 39101574,
      location: null,
      login: "Heisenberg0001",
      name: null,
      node_id: "MDQ6VXNlcjM5MTAxNTc0",
      organizations_url: "https://api.github.com/users/Heisenberg0001/orgs",
      public_gists: 0,
      public_repos: 12,
      received_events_url: "https://api.github.com/users/Heisenberg0001/received_events",
      repos_url: "https://api.github.com/users/Heisenberg0001/repos",
      site_admin: false,
      starred_url: "https://api.github.com/users/Heisenberg0001/starred{/owner}{/repo}",
      subscriptions_url: "https://api.github.com/users/Heisenberg0001/subscriptions",
      twitter_username: null,
      type: "User",
      updated_at: "2021-01-06T19:02:42Z",
      url: "https://api.github.com/users/Heisenberg0001"
    }
  ];


  constructor( private _http: HttpClient
  ) {}

  ngOnInit(): void {
  }

  public onSubmit(form: NgForm): void {
    this.setInfo = this._http.get<GitUser>('https://api.github.com/users/defunkt').subscribe(
      (data: GitUser) => {
        console.log(data);
      }
    );
  }
}
