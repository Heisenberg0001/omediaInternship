import { Component, OnDestroy, OnInit } from '@angular/core';
import { from, of, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { GitUser } from '../../../shared/interfaces/git-user.interface';
import { CoreService } from '../../../core/services/core.service';
import { GitUserDetailed } from '../../../shared/interfaces/git-user-detailed.interface';
import { delay, mergeMap } from 'rxjs/operators';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})

export class LandingPageComponent implements OnInit, OnDestroy {
  private _toListView: boolean;
  private _toGridView: boolean;
  private _users: GitUser[] = [];
  private _usersInfo: GitUserDetailed[] = [];
  private _usersSubscription: Subscription;
  private _usersInfoSubscription: Subscription;

  public checkInput: boolean = false;

  constructor( private _coreService: CoreService,
               private _router: Router,
               private _activatedRoute: ActivatedRoute
  ) {
      this._toGridView = true;
      this._toListView = false;
  }

  ngOnInit(): void {
    this.getPopularUsers();
  }
  ngOnDestroy() {
    if(this._usersSubscription) {
      this._usersSubscription.unsubscribe();
    }
    if(this._usersInfoSubscription) {
      this._usersInfoSubscription.unsubscribe()
    }
  }

  private getPopularUsers() {
    if (!localStorage.getItem('popularUsersInfo') || localStorage.getItem('usersInfo') === undefined ) {

      // this._usersInfo = [
      //   {
      //     avatar_url: "https://avatars.githubusercontent.com/u/810438?v=4",
      //     bio: null,
      //     blog: "",
      //     company: "@facebook ",
      //     created_at: "2011-05-25T18:18:31Z",
      //     email: null,
      //     events_url: "https://api.github.com/users/gaearon/events{/privacy}",
      //     followers: 66527,
      //     followers_url: "https://api.github.com/users/gaearon/followers",
      //     following: 171,
      //     following_url: "https://api.github.com/users/gaearon/following{/other_user}",
      //     gists_url: "https://api.github.com/users/gaearon/gists{/gist_id}",
      //     gravatar_id: "",
      //     hireable: null,
      //     html_url: "https://github.com/gaearon",
      //     id: 810438,
      //     location: null,
      //     login: "gaearon",
      //     name: "Dan Abramov",
      //     node_id: "MDQ6VXNlcjgxMDQzOA==",
      //     organizations_url: "https://api.github.com/users/gaearon/orgs",
      //     public_gists: 72,
      //     public_repos: 249,
      //     received_events_url: "https://api.github.com/users/gaearon/received_events",
      //     repos_url: "https://api.github.com/users/gaearon/repos",
      //     site_admin: false,
      //     starred_url: "https://api.github.com/users/gaearon/starred{/owner}{/repo}",
      //     subscriptions_url: "https://api.github.com/users/gaearon/subscriptions",
      //     twitter_username: "dan_abramov",
      //     type: "User",
      //     updated_at: "2021-06-08T18:35:01Z",
      //     url: "https://api.github.com/users/gaearon"
      //   },
      //   {avatar_url: "https://avatars.githubusercontent.com/u/499550?v=4",
      //     bio: null,
      //     blog: "http://evanyou.me",
      //     company: "vuejs",
      //     created_at: "2010-11-28T01:05:40Z",
      //     email: null,
      //     events_url: "https://api.github.com/users/yyx990803/events{/privacy}",
      //     followers: 70971,
      //     followers_url: "https://api.github.com/users/yyx990803/followers",
      //     following: 94,
      //     following_url: "https://api.github.com/users/yyx990803/following{/other_user}",
      //     gists_url: "https://api.github.com/users/yyx990803/gists{/gist_id}",
      //     gravatar_id: "",
      //     hireable: null,
      //     html_url: "https://github.com/yyx990803",
      //     id: 499550,
      //     location: "New Jersey ⇄ China",
      //     login: "yyx990803",
      //     name: "Evan You",
      //     node_id: "MDQ6VXNlcjQ5OTU1MA==",
      //     organizations_url: "https://api.github.com/users/yyx990803/orgs",
      //     public_gists: 69,
      //     public_repos: 171,
      //     received_events_url: "https://api.github.com/users/yyx990803/received_events",
      //     repos_url: "https://api.github.com/users/yyx990803/repos",
      //     site_admin: false,
      //     starred_url: "https://api.github.com/users/yyx990803/starred{/owner}{/repo}",
      //     subscriptions_url: "https://api.github.com/users/yyx990803/subscriptions",
      //     twitter_username: null,
      //     type: "User",
      //     updated_at: "2021-06-10T12:50:13Z",
      //     url: "https://api.github.com/users/yyx990803"},
      //   {
      //     avatar_url: "https://avatars.githubusercontent.com/u/905434?v=4",
      //     bio: null,
      //     blog: "https://twitter.com/ruanyf",
      //     company: null,
      //     created_at: "2011-07-10T01:07:17Z",
      //     email: null,
      //     events_url: "https://api.github.com/users/ruanyf/events{/privacy}",
      //     followers: 66319,
      //     followers_url: "https://api.github.com/users/ruanyf/followers",
      //     following: 0,
      //     following_url: "https://api.github.com/users/ruanyf/following{/other_user}",
      //     gists_url: "https://api.github.com/users/ruanyf/gists{/gist_id}",
      //     gravatar_id: "",
      //     hireable: null,
      //     html_url: "https://github.com/ruanyf",
      //     id: 905434,
      //     location: "Shanghai, China",
      //     login: "ruanyf",
      //     name: "Ruan YiFeng",
      //     node_id: "MDQ6VXNlcjkwNTQzNA==",
      //     organizations_url: "https://api.github.com/users/ruanyf/orgs",
      //     public_gists: 27,
      //     public_repos: 67,
      //     received_events_url: "https://api.github.com/users/ruanyf/received_events",
      //     repos_url: "https://api.github.com/users/ruanyf/repos",
      //     site_admin: false,
      //     starred_url: "https://api.github.com/users/ruanyf/starred{/owner}{/repo}",
      //     subscriptions_url: "https://api.github.com/users/ruanyf/subscriptions",
      //     twitter_username: null,
      //     type: "User",
      //     updated_at: "2021-06-06T00:05:25Z",
      //     url: "https://api.github.com/users/ruanyf"
      //   },
      //   {
      //     avatar_url: "https://avatars.githubusercontent.com/u/66577?v=4",
      //     bio: null,
      //     blog: "jakewharton.com",
      //     company: "@square / @cashapp",
      //     created_at: "2009-03-24T16:09:53Z",
      //     email: null,
      //     events_url: "https://api.github.com/users/JakeWharton/events{/privacy}",
      //     followers: 60379,
      //     followers_url: "https://api.github.com/users/JakeWharton/followers",
      //     following: 9,
      //     following_url: "https://api.github.com/users/JakeWharton/following{/other_user}",
      //     gists_url: "https://api.github.com/users/JakeWharton/gists{/gist_id}",
      //     gravatar_id: "",
      //     hireable: null,
      //     html_url: "https://github.com/JakeWharton",
      //     id: 66577,
      //     location: "Pittsburgh, PA, USA",
      //     login: "JakeWharton",
      //     name: "Jake Wharton",
      //     node_id: "MDQ6VXNlcjY2NTc3",
      //     organizations_url: "https://api.github.com/users/JakeWharton/orgs",
      //     public_gists: 54,
      //     public_repos: 122,
      //     received_events_url: "https://api.github.com/users/JakeWharton/received_events",
      //     repos_url: "https://api.github.com/users/JakeWharton/repos",
      //     site_admin: false,
      //     starred_url: "https://api.github.com/users/JakeWharton/starred{/owner}{/repo}",
      //     subscriptions_url: "https://api.github.com/users/JakeWharton/subscriptions",
      //     twitter_username: "JakeWharton",
      //     type: "User",
      //     updated_at: "2021-06-12T11:11:06Z",
      //     url: "https://api.github.com/users/JakeWharton"
      //   },
      //   {
      //     avatar_url: "https://avatars.githubusercontent.com/u/25254?v=4",
      //     bio: null,
      //     blog: "https://apex.sh",
      //     company: "Apex",
      //     created_at: "2008-09-18T22:37:28Z",
      //     email: null,
      //     events_url: "https://api.github.com/users/tj/events{/privacy}",
      //     followers: 45784,
      //     followers_url: "https://api.github.com/users/tj/followers",
      //     following: 45,
      //     following_url: "https://api.github.com/users/tj/following{/other_user}",
      //     gists_url: "https://api.github.com/users/tj/gists{/gist_id}",
      //     gravatar_id: "",
      //     hireable: null,
      //     html_url: "https://github.com/tj",
      //     id: 25254,
      //     location: "London, UK",
      //     login: "tj",
      //     name: "TJ Holowaychuk",
      //     node_id: "MDQ6VXNlcjI1MjU0",
      //     organizations_url: "https://api.github.com/users/tj/orgs",
      //     public_gists: 551,
      //     public_repos: 297,
      //     received_events_url: "https://api.github.com/users/tj/received_events",
      //     repos_url: "https://api.github.com/users/tj/repos",
      //     site_admin: false,
      //     starred_url: "https://api.github.com/users/tj/starred{/owner}{/repo}",
      //     subscriptions_url: "https://api.github.com/users/tj/subscriptions",
      //     twitter_username: "tjholowaychuk",
      //     type: "User",
      //     updated_at: "2021-05-12T09:44:38Z",
      //     url: "https://api.github.com/users/tj"
      //   },
      //   {
      //     avatar_url: "https://avatars.githubusercontent.com/u/150330?v=4",
      //     bio: "I like to explore JS and FP techniques. Helping build a culture of engineering excellence for my employer.",
      //     blog: "http://getify.me",
      //     company: "Getify Solutions",
      //     created_at: "2009-11-08T06:56:21Z",
      //     email: null,
      //     events_url: "https://api.github.com/users/getify/events{/privacy}",
      //     followers: 31456,
      //     followers_url: "https://api.github.com/users/getify/followers",
      //     following: 2,
      //     following_url: "https://api.github.com/users/getify/following{/other_user}",
      //     gists_url: "https://api.github.com/users/getify/gists{/gist_id}",
      //     gravatar_id: "",
      //     hireable: true,
      //     html_url: "https://github.com/getify",
      //     id: 150330,
      //     location: "Austin, TX",
      //     login: "getify",
      //     name: "Kyle Simpson",
      //     node_id: "MDQ6VXNlcjE1MDMzMA==",
      //     organizations_url: "https://api.github.com/users/getify/orgs",
      //     public_gists: 384,
      //     public_repos: 57,
      //     received_events_url: "https://api.github.com/users/getify/received_events",
      //     repos_url: "https://api.github.com/users/getify/repos",
      //     site_admin: false,
      //     starred_url: "https://api.github.com/users/getify/starred{/owner}{/repo}",
      //     subscriptions_url: "https://api.github.com/users/getify/subscriptions",
      //     twitter_username: null,
      //     type: "User",
      //     updated_at: "2021-06-11T22:46:06Z",
      //     url: "https://api.github.com/users/getify"
      //   },
      //   {
      //     avatar_url: "https://avatars.githubusercontent.com/u/1279609?v=4",
      //     bio: "subscribe to my youtube channel! \r\nwww.youtube.com/c/sirajraval\r\n",
      //     blog: "www.youtube.com/c/sirajraval",
      //     company: null,
      //     created_at: "2011-12-22T09:57:32Z",
      //     email: null,
      //     events_url: "https://api.github.com/users/llSourcell/events{/privacy}",
      //     followers: 36020,
      //     followers_url: "https://api.github.com/users/llSourcell/followers",
      //     following: 4,
      //     following_url: "https://api.github.com/users/llSourcell/following{/other_user}",
      //     gists_url: "https://api.github.com/users/llSourcell/gists{/gist_id}",
      //     gravatar_id: "",
      //     hireable: true,
      //     html_url: "https://github.com/llSourcell",
      //     id: 1279609,
      //     location: "San Francisco, CA",
      //     login: "llSourcell",
      //     name: "Siraj Raval",
      //     node_id: "MDQ6VXNlcjEyNzk2MDk=",
      //     organizations_url: "https://api.github.com/users/llSourcell/orgs",
      //     public_gists: 201,
      //     public_repos: 438,
      //     received_events_url: "https://api.github.com/users/llSourcell/received_events",
      //     repos_url: "https://api.github.com/users/llSourcell/repos",
      //     site_admin: false,
      //     starred_url: "https://api.github.com/users/llSourcell/starred{/owner}{/repo}",
      //     subscriptions_url: "https://api.github.com/users/llSourcell/subscriptions",
      //     twitter_username: null,
      //     type: "User",
      //     updated_at: "2021-05-03T20:58:23Z",
      //     url: "https://api.github.com/users/llSourcell"
      //   },
      //   {
      //     avatar_url: "https://avatars.githubusercontent.com/u/1024025?v=4",
      //     bio: null,
      //     blog: "",
      //     company: "Linux Foundation",
      //     created_at: "2011-09-03T15:26:22Z",
      //     email: null,
      //     events_url: "https://api.github.com/users/torvalds/events{/privacy}",
      //     followers: 137387,
      //     followers_url: "https://api.github.com/users/torvalds/followers",
      //     following: 0,
      //     following_url: "https://api.github.com/users/torvalds/following{/other_user}",
      //     gists_url: "https://api.github.com/users/torvalds/gists{/gist_id}",
      //     gravatar_id: "",
      //     hireable: null,
      //     html_url: "https://github.com/torvalds",
      //     id: 1024025,
      //     location: "Portland, OR",
      //     login: "torvalds",
      //     name: "Linus Torvalds",
      //     node_id: "MDQ6VXNlcjEwMjQwMjU=",
      //     organizations_url: "https://api.github.com/users/torvalds/orgs",
      //     public_gists: 0,
      //     public_repos: 6,
      //     received_events_url: "https://api.github.com/users/torvalds/received_events",
      //     repos_url: "https://api.github.com/users/torvalds/repos",
      //     site_admin: false,
      //     starred_url: "https://api.github.com/users/torvalds/starred{/owner}{/repo}",
      //     subscriptions_url: "https://api.github.com/users/torvalds/subscriptions",
      //     twitter_username: null,
      //     type: "User",
      //     updated_at: "2021-04-19T17:51:59Z",
      //     url: "https://api.github.com/users/torvalds"
      //   },
      //   {
      //     avatar_url: "https://avatars.githubusercontent.com/u/1024025?v=4",
      //     bio: null,
      //     blog: "",
      //     company: "Linux Foundation",
      //     created_at: "2011-09-03T15:26:22Z",
      //     email: null,
      //     events_url: "https://api.github.com/users/torvalds/events{/privacy}",
      //     followers: 137387,
      //     followers_url: "https://api.github.com/users/torvalds/followers",
      //     following: 0,
      //     following_url: "https://api.github.com/users/torvalds/following{/other_user}",
      //     gists_url: "https://api.github.com/users/torvalds/gists{/gist_id}",
      //     gravatar_id: "",
      //     hireable: null,
      //     html_url: "https://github.com/torvalds",
      //     id: 1024025,
      //     location: "Portland, OR",
      //     login: "torvalds",
      //     name: "Linus Torvalds",
      //     node_id: "MDQ6VXNlcjEwMjQwMjU=",
      //     organizations_url: "https://api.github.com/users/torvalds/orgs",
      //     public_gists: 0,
      //     public_repos: 6,
      //     received_events_url: "https://api.github.com/users/torvalds/received_events",
      //     repos_url: "https://api.github.com/users/torvalds/repos",
      //     site_admin: false,
      //     starred_url: "https://api.github.com/users/torvalds/starred{/owner}{/repo}",
      //     subscriptions_url: "https://api.github.com/users/torvalds/subscriptions",
      //     twitter_username: null,
      //     type: "User",
      //     updated_at: "2021-04-19T17:51:59Z",
      //     url: "https://api.github.com/users/torvalds"
      //   },
      //
      //   {
      //     avatar_url: "https://avatars.githubusercontent.com/u/1024025?v=4",
      //     bio: null,
      //     blog: "",
      //     company: "Linux Foundation",
      //     created_at: "2011-09-03T15:26:22Z",
      //     email: null,
      //     events_url: "https://api.github.com/users/torvalds/events{/privacy}",
      //     followers: 137387,
      //     followers_url: "https://api.github.com/users/torvalds/followers",
      //     following: 0,
      //     following_url: "https://api.github.com/users/torvalds/following{/other_user}",
      //     gists_url: "https://api.github.com/users/torvalds/gists{/gist_id}",
      //     gravatar_id: "",
      //     hireable: null,
      //     html_url: "https://github.com/torvalds",
      //     id: 1024025,
      //     location: "Portland, OR",
      //     login: "torvalds",
      //     name: "Linus Torvalds",
      //     node_id: "MDQ6VXNlcjEwMjQwMjU=",
      //     organizations_url: "https://api.github.com/users/torvalds/orgs",
      //     public_gists: 0,
      //     public_repos: 6,
      //     received_events_url: "https://api.github.com/users/torvalds/received_events",
      //     repos_url: "https://api.github.com/users/torvalds/repos",
      //     site_admin: false,
      //     starred_url: "https://api.github.com/users/torvalds/starred{/owner}{/repo}",
      //     subscriptions_url: "https://api.github.com/users/torvalds/subscriptions",
      //     twitter_username: null,
      //     type: "User",
      //     updated_at: "2021-04-19T17:51:59Z",
      //     url: "https://api.github.com/users/torvalds"
      //   },
      //   {
      //     avatar_url: "https://avatars.githubusercontent.com/u/1024025?v=4",
      //     bio: null,
      //     blog: "",
      //     company: "Linux Foundation",
      //     created_at: "2011-09-03T15:26:22Z",
      //     email: null,
      //     events_url: "https://api.github.com/users/torvalds/events{/privacy}",
      //     followers: 137387,
      //     followers_url: "https://api.github.com/users/torvalds/followers",
      //     following: 0,
      //     following_url: "https://api.github.com/users/torvalds/following{/other_user}",
      //     gists_url: "https://api.github.com/users/torvalds/gists{/gist_id}",
      //     gravatar_id: "",
      //     hireable: null,
      //     html_url: "https://github.com/torvalds",
      //     id: 1024025,
      //     location: "Portland, OR",
      //     login: "torvalds",
      //     name: "Linus Torvalds",
      //     node_id: "MDQ6VXNlcjEwMjQwMjU=",
      //     organizations_url: "https://api.github.com/users/torvalds/orgs",
      //     public_gists: 0,
      //     public_repos: 6,
      //     received_events_url: "https://api.github.com/users/torvalds/received_events",
      //     repos_url: "https://api.github.com/users/torvalds/repos",
      //     site_admin: false,
      //     starred_url: "https://api.github.com/users/torvalds/starred{/owner}{/repo}",
      //     subscriptions_url: "https://api.github.com/users/torvalds/subscriptions",
      //     twitter_username: null,
      //     type: "User",
      //     updated_at: "2021-04-19T17:51:59Z",
      //     url: "https://api.github.com/users/torvalds"
      //   },
      //   {
      //     avatar_url: "https://avatars.githubusercontent.com/u/1024025?v=4",
      //     bio: null,
      //     blog: "",
      //     company: "Linux Foundation",
      //     created_at: "2011-09-03T15:26:22Z",
      //     email: null,
      //     events_url: "https://api.github.com/users/torvalds/events{/privacy}",
      //     followers: 137387,
      //     followers_url: "https://api.github.com/users/torvalds/followers",
      //     following: 0,
      //     following_url: "https://api.github.com/users/torvalds/following{/other_user}",
      //     gists_url: "https://api.github.com/users/torvalds/gists{/gist_id}",
      //     gravatar_id: "",
      //     hireable: null,
      //     html_url: "https://github.com/torvalds",
      //     id: 1024025,
      //     location: "Portland, OR",
      //     login: "torvalds",
      //     name: "Linus Torvalds",
      //     node_id: "MDQ6VXNlcjEwMjQwMjU=",
      //     organizations_url: "https://api.github.com/users/torvalds/orgs",
      //     public_gists: 0,
      //     public_repos: 6,
      //     received_events_url: "https://api.github.com/users/torvalds/received_events",
      //     repos_url: "https://api.github.com/users/torvalds/repos",
      //     site_admin: false,
      //     starred_url: "https://api.github.com/users/torvalds/starred{/owner}{/repo}",
      //     subscriptions_url: "https://api.github.com/users/torvalds/subscriptions",
      //     twitter_username: null,
      //     type: "User",
      //     updated_at: "2021-04-19T17:51:59Z",
      //     url: "https://api.github.com/users/torvalds"
      //   },
      //   {
      //     avatar_url: "https://avatars.githubusercontent.com/u/1024025?v=4",
      //     bio: null,
      //     blog: "",
      //     company: "Linux Foundation",
      //     created_at: "2011-09-03T15:26:22Z",
      //     email: null,
      //     events_url: "https://api.github.com/users/torvalds/events{/privacy}",
      //     followers: 137387,
      //     followers_url: "https://api.github.com/users/torvalds/followers",
      //     following: 0,
      //     following_url: "https://api.github.com/users/torvalds/following{/other_user}",
      //     gists_url: "https://api.github.com/users/torvalds/gists{/gist_id}",
      //     gravatar_id: "",
      //     hireable: null,
      //     html_url: "https://github.com/torvalds",
      //     id: 1024025,
      //     location: "Portland, OR",
      //     login: "torvalds",
      //     name: "Linus Torvalds",
      //     node_id: "MDQ6VXNlcjEwMjQwMjU=",
      //     organizations_url: "https://api.github.com/users/torvalds/orgs",
      //     public_gists: 0,
      //     public_repos: 6,
      //     received_events_url: "https://api.github.com/users/torvalds/received_events",
      //     repos_url: "https://api.github.com/users/torvalds/repos",
      //     site_admin: false,
      //     starred_url: "https://api.github.com/users/torvalds/starred{/owner}{/repo}",
      //     subscriptions_url: "https://api.github.com/users/torvalds/subscriptions",
      //     twitter_username: null,
      //     type: "User",
      //     updated_at: "2021-04-19T17:51:59Z",
      //     url: "https://api.github.com/users/torvalds"
      //   },
      //   {
      //     avatar_url: "https://avatars.githubusercontent.com/u/1024025?v=4",
      //     bio: null,
      //     blog: "",
      //     company: "Linux Foundation",
      //     created_at: "2011-09-03T15:26:22Z",
      //     email: null,
      //     events_url: "https://api.github.com/users/torvalds/events{/privacy}",
      //     followers: 137387,
      //     followers_url: "https://api.github.com/users/torvalds/followers",
      //     following: 0,
      //     following_url: "https://api.github.com/users/torvalds/following{/other_user}",
      //     gists_url: "https://api.github.com/users/torvalds/gists{/gist_id}",
      //     gravatar_id: "",
      //     hireable: null,
      //     html_url: "https://github.com/torvalds",
      //     id: 1024025,
      //     location: "Portland, OR",
      //     login: "torvalds",
      //     name: "Linus Torvalds",
      //     node_id: "MDQ6VXNlcjEwMjQwMjU=",
      //     organizations_url: "https://api.github.com/users/torvalds/orgs",
      //     public_gists: 0,
      //     public_repos: 6,
      //     received_events_url: "https://api.github.com/users/torvalds/received_events",
      //     repos_url: "https://api.github.com/users/torvalds/repos",
      //     site_admin: false,
      //     starred_url: "https://api.github.com/users/torvalds/starred{/owner}{/repo}",
      //     subscriptions_url: "https://api.github.com/users/torvalds/subscriptions",
      //     twitter_username: null,
      //     type: "User",
      //     updated_at: "2021-04-19T17:51:59Z",
      //     url: "https://api.github.com/users/torvalds"
      //   },
      //   {
      //     avatar_url: "https://avatars.githubusercontent.com/u/1024025?v=4",
      //     bio: null,
      //     blog: "",
      //     company: "Linux Foundation",
      //     created_at: "2011-09-03T15:26:22Z",
      //     email: null,
      //     events_url: "https://api.github.com/users/torvalds/events{/privacy}",
      //     followers: 137387,
      //     followers_url: "https://api.github.com/users/torvalds/followers",
      //     following: 0,
      //     following_url: "https://api.github.com/users/torvalds/following{/other_user}",
      //     gists_url: "https://api.github.com/users/torvalds/gists{/gist_id}",
      //     gravatar_id: "",
      //     hireable: null,
      //     html_url: "https://github.com/torvalds",
      //     id: 1024025,
      //     location: "Portland, OR",
      //     login: "torvalds",
      //     name: "Linus Torvalds",
      //     node_id: "MDQ6VXNlcjEwMjQwMjU=",
      //     organizations_url: "https://api.github.com/users/torvalds/orgs",
      //     public_gists: 0,
      //     public_repos: 6,
      //     received_events_url: "https://api.github.com/users/torvalds/received_events",
      //     repos_url: "https://api.github.com/users/torvalds/repos",
      //     site_admin: false,
      //     starred_url: "https://api.github.com/users/torvalds/starred{/owner}{/repo}",
      //     subscriptions_url: "https://api.github.com/users/torvalds/subscriptions",
      //     twitter_username: null,
      //     type: "User",
      //     updated_at: "2021-04-19T17:51:59Z",
      //     url: "https://api.github.com/users/torvalds"
      //   },
      //   {
      //     avatar_url: "https://avatars.githubusercontent.com/u/1024025?v=4",
      //     bio: null,
      //     blog: "",
      //     company: "Linux Foundation",
      //     created_at: "2011-09-03T15:26:22Z",
      //     email: null,
      //     events_url: "https://api.github.com/users/torvalds/events{/privacy}",
      //     followers: 137387,
      //     followers_url: "https://api.github.com/users/torvalds/followers",
      //     following: 0,
      //     following_url: "https://api.github.com/users/torvalds/following{/other_user}",
      //     gists_url: "https://api.github.com/users/torvalds/gists{/gist_id}",
      //     gravatar_id: "",
      //     hireable: null,
      //     html_url: "https://github.com/torvalds",
      //     id: 1024025,
      //     location: "Portland, OR",
      //     login: "torvalds",
      //     name: "Linus Torvalds",
      //     node_id: "MDQ6VXNlcjEwMjQwMjU=",
      //     organizations_url: "https://api.github.com/users/torvalds/orgs",
      //     public_gists: 0,
      //     public_repos: 6,
      //     received_events_url: "https://api.github.com/users/torvalds/received_events",
      //     repos_url: "https://api.github.com/users/torvalds/repos",
      //     site_admin: false,
      //     starred_url: "https://api.github.com/users/torvalds/starred{/owner}{/repo}",
      //     subscriptions_url: "https://api.github.com/users/torvalds/subscriptions",
      //     twitter_username: null,
      //     type: "User",
      //     updated_at: "2021-04-19T17:51:59Z",
      //     url: "https://api.github.com/users/torvalds"
      //   },
      //   {
      //     avatar_url: "https://avatars.githubusercontent.com/u/1024025?v=4",
      //     bio: null,
      //     blog: "",
      //     company: "Linux Foundation",
      //     created_at: "2011-09-03T15:26:22Z",
      //     email: null,
      //     events_url: "https://api.github.com/users/torvalds/events{/privacy}",
      //     followers: 137387,
      //     followers_url: "https://api.github.com/users/torvalds/followers",
      //     following: 0,
      //     following_url: "https://api.github.com/users/torvalds/following{/other_user}",
      //     gists_url: "https://api.github.com/users/torvalds/gists{/gist_id}",
      //     gravatar_id: "",
      //     hireable: null,
      //     html_url: "https://github.com/torvalds",
      //     id: 1024025,
      //     location: "Portland, OR",
      //     login: "torvalds",
      //     name: "Linus Torvalds",
      //     node_id: "MDQ6VXNlcjEwMjQwMjU=",
      //     organizations_url: "https://api.github.com/users/torvalds/orgs",
      //     public_gists: 0,
      //     public_repos: 6,
      //     received_events_url: "https://api.github.com/users/torvalds/received_events",
      //     repos_url: "https://api.github.com/users/torvalds/repos",
      //     site_admin: false,
      //     starred_url: "https://api.github.com/users/torvalds/starred{/owner}{/repo}",
      //     subscriptions_url: "https://api.github.com/users/torvalds/subscriptions",
      //     twitter_username: null,
      //     type: "User",
      //     updated_at: "2021-04-19T17:51:59Z",
      //     url: "https://api.github.com/users/torvalds"
      //   },
      // ]

      ////////////////////////////////////////////////////////////////////////////////////////////////////////
      this._usersSubscription = this._coreService.getPopularUsers().subscribe(users => {

        if (users.length) {

          for(let i = 0; i < 25; i++) {
            this._usersInfoSubscription = this._coreService.searchUserName(users[i]).subscribe(
              (userInfo) => {
                this._usersInfo.push(userInfo);

                if( i === 24 ){
                  localStorage.setItem('popularUsersInfo', JSON.stringify(this._usersInfo));
                }
              })
          }
        }
      });

    } else {
      this._usersInfo = JSON.parse(localStorage.getItem('popularUsersInfo'));
    }
  }
  public getListView(): boolean {
    return this._toListView;
  }
  public getGridView(): boolean {
    return this._toGridView;
  }
  public getUsersInfo(): GitUserDetailed[] {
    return this._usersInfo;
  }
  public getUsers(): GitUser[] {
    return this._users;
  }
  public onSubmit(form: NgForm): void {

    //Username may only contain alphanumeric characters or single hyphens, and cannot begin or end with a hyphen.
    if(/^[\d\w][\d\w-]*[\d\w]?$/g.test(form.value["gitUserName"])) {

      this._usersSubscription = this._coreService.searchUsers(form.value["gitUserName"]).subscribe((users) => {
        this._users = users;

        if (this._users.length) {
          for(let i = 0; i < this._users.length; i++) {
            this._usersInfoSubscription = this._coreService.searchUserName(this._users[i]).subscribe(
              (userInfo) => {
                this._usersInfo.push(userInfo);

                if(i === this._users.length - 1) {
                  console.log(this._usersInfo);
                  localStorage.setItem('searchedUsersInfo', JSON.stringify(this._usersInfo));
                }
              })
          }
        }
      });
    } else {
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
  public onClick(clickIndex: number): void {
    let tempUser = this.getUsersInfo()[clickIndex];

    this._coreService.setUserInfo(tempUser);
    this._router.navigate([`/${tempUser['id']}`], { relativeTo: this._activatedRoute })
  }
}
