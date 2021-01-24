import {Component} from '@angular/core';
import {GitUser} from '../../shared/models/git-user.model';
import {GitOrganizations} from '../../shared/models/git-organizations.model';
import {GitRepositories} from '../../shared/models/git-repositories.model';

@Component({
  selector: 'app-user',
  templateUrl: 'user-page.component.html',
  styleUrls: ['user-page.component.css']
})

export class UserPageComponent{
  private _userInfo: GitUser =  {
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
  private _userOrganizationsInfo: GitOrganizations[] = [
    {
      "login": "mustache",
      "id": 197655,
      "node_id": "MDEyOk9yZ2FuaXphdGlvbjE5NzY1NQ==",
      "url": "https://api.github.com/orgs/mustache",
      "repos_url": "https://api.github.com/orgs/mustache/repos",
      "events_url": "https://api.github.com/orgs/mustache/events",
      "hooks_url": "https://api.github.com/orgs/mustache/hooks",
      "issues_url": "https://api.github.com/orgs/mustache/issues",
      "members_url": "https://api.github.com/orgs/mustache/members{/member}",
      "public_members_url": "https://api.github.com/orgs/mustache/public_members{/member}",
      "avatar_url": "https://avatars.githubusercontent.com/u/197655?v=4",
      "description": "Logic-less templates."
    },
    {
      "login": "mustache",
      "id": 197655,
      "node_id": "MDEyOk9yZ2FuaXphdGlvbjE5NzY1NQ==",
      "url": "https://api.github.com/orgs/mustache",
      "repos_url": "https://api.github.com/orgs/mustache/repos",
      "events_url": "https://api.github.com/orgs/mustache/events",
      "hooks_url": "https://api.github.com/orgs/mustache/hooks",
      "issues_url": "https://api.github.com/orgs/mustache/issues",
      "members_url": "https://api.github.com/orgs/mustache/members{/member}",
      "public_members_url": "https://api.github.com/orgs/mustache/public_members{/member}",
      "avatar_url": "https://avatars.githubusercontent.com/u/197655?v=4",
      "description": "Logic-less templates."
    },
    {
      "login": "mustache",
      "id": 197655,
      "node_id": "MDEyOk9yZ2FuaXphdGlvbjE5NzY1NQ==",
      "url": "https://api.github.com/orgs/mustache",
      "repos_url": "https://api.github.com/orgs/mustache/repos",
      "events_url": "https://api.github.com/orgs/mustache/events",
      "hooks_url": "https://api.github.com/orgs/mustache/hooks",
      "issues_url": "https://api.github.com/orgs/mustache/issues",
      "members_url": "https://api.github.com/orgs/mustache/members{/member}",
      "public_members_url": "https://api.github.com/orgs/mustache/public_members{/member}",
      "avatar_url": "https://avatars.githubusercontent.com/u/197655?v=4",
      "description": "Logic-less templates."
    },
    {
      "login": "mustache",
      "id": 197655,
      "node_id": "MDEyOk9yZ2FuaXphdGlvbjE5NzY1NQ==",
      "url": "https://api.github.com/orgs/mustache",
      "repos_url": "https://api.github.com/orgs/mustache/repos",
      "events_url": "https://api.github.com/orgs/mustache/events",
      "hooks_url": "https://api.github.com/orgs/mustache/hooks",
      "issues_url": "https://api.github.com/orgs/mustache/issues",
      "members_url": "https://api.github.com/orgs/mustache/members{/member}",
      "public_members_url": "https://api.github.com/orgs/mustache/public_members{/member}",
      "avatar_url": "https://avatars.githubusercontent.com/u/197655?v=4",
      "description": "Logic-less templates."
    },
    {
      "login": "mustache",
      "id": 197655,
      "node_id": "MDEyOk9yZ2FuaXphdGlvbjE5NzY1NQ==",
      "url": "https://api.github.com/orgs/mustache",
      "repos_url": "https://api.github.com/orgs/mustache/repos",
      "events_url": "https://api.github.com/orgs/mustache/events",
      "hooks_url": "https://api.github.com/orgs/mustache/hooks",
      "issues_url": "https://api.github.com/orgs/mustache/issues",
      "members_url": "https://api.github.com/orgs/mustache/members{/member}",
      "public_members_url": "https://api.github.com/orgs/mustache/public_members{/member}",
      "avatar_url": "https://avatars.githubusercontent.com/u/197655?v=4",
      "description": "Logic-less templates."
    },
    {
      "login": "mustache",
      "id": 197655,
      "node_id": "MDEyOk9yZ2FuaXphdGlvbjE5NzY1NQ==",
      "url": "https://api.github.com/orgs/mustache",
      "repos_url": "https://api.github.com/orgs/mustache/repos",
      "events_url": "https://api.github.com/orgs/mustache/events",
      "hooks_url": "https://api.github.com/orgs/mustache/hooks",
      "issues_url": "https://api.github.com/orgs/mustache/issues",
      "members_url": "https://api.github.com/orgs/mustache/members{/member}",
      "public_members_url": "https://api.github.com/orgs/mustache/public_members{/member}",
      "avatar_url": "https://avatars.githubusercontent.com/u/197655?v=4",
      "description": "Logic-less templates."
    },
    {
      "login": "mustache",
      "id": 197655,
      "node_id": "MDEyOk9yZ2FuaXphdGlvbjE5NzY1NQ==",
      "url": "https://api.github.com/orgs/mustache",
      "repos_url": "https://api.github.com/orgs/mustache/repos",
      "events_url": "https://api.github.com/orgs/mustache/events",
      "hooks_url": "https://api.github.com/orgs/mustache/hooks",
      "issues_url": "https://api.github.com/orgs/mustache/issues",
      "members_url": "https://api.github.com/orgs/mustache/members{/member}",
      "public_members_url": "https://api.github.com/orgs/mustache/public_members{/member}",
      "avatar_url": "https://avatars.githubusercontent.com/u/197655?v=4",
      "description": "Logic-less templates."
    },
    {
      "login": "mustache",
      "id": 197655,
      "node_id": "MDEyOk9yZ2FuaXphdGlvbjE5NzY1NQ==",
      "url": "https://api.github.com/orgs/mustache",
      "repos_url": "https://api.github.com/orgs/mustache/repos",
      "events_url": "https://api.github.com/orgs/mustache/events",
      "hooks_url": "https://api.github.com/orgs/mustache/hooks",
      "issues_url": "https://api.github.com/orgs/mustache/issues",
      "members_url": "https://api.github.com/orgs/mustache/members{/member}",
      "public_members_url": "https://api.github.com/orgs/mustache/public_members{/member}",
      "avatar_url": "https://avatars.githubusercontent.com/u/197655?v=4",
      "description": "Logic-less templates."
    },
    {
      "login": "mustache",
      "id": 197655,
      "node_id": "MDEyOk9yZ2FuaXphdGlvbjE5NzY1NQ==",
      "url": "https://api.github.com/orgs/mustache",
      "repos_url": "https://api.github.com/orgs/mustache/repos",
      "events_url": "https://api.github.com/orgs/mustache/events",
      "hooks_url": "https://api.github.com/orgs/mustache/hooks",
      "issues_url": "https://api.github.com/orgs/mustache/issues",
      "members_url": "https://api.github.com/orgs/mustache/members{/member}",
      "public_members_url": "https://api.github.com/orgs/mustache/public_members{/member}",
      "avatar_url": "https://avatars.githubusercontent.com/u/197655?v=4",
      "description": "Logic-less templates."
    },
    {
      "login": "mustache",
      "id": 197655,
      "node_id": "MDEyOk9yZ2FuaXphdGlvbjE5NzY1NQ==",
      "url": "https://api.github.com/orgs/mustache",
      "repos_url": "https://api.github.com/orgs/mustache/repos",
      "events_url": "https://api.github.com/orgs/mustache/events",
      "hooks_url": "https://api.github.com/orgs/mustache/hooks",
      "issues_url": "https://api.github.com/orgs/mustache/issues",
      "members_url": "https://api.github.com/orgs/mustache/members{/member}",
      "public_members_url": "https://api.github.com/orgs/mustache/public_members{/member}",
      "avatar_url": "https://avatars.githubusercontent.com/u/197655?v=4",
      "description": "Logic-less templates."
    },
    {
      "login": "mustache",
      "id": 197655,
      "node_id": "MDEyOk9yZ2FuaXphdGlvbjE5NzY1NQ==",
      "url": "https://api.github.com/orgs/mustache",
      "repos_url": "https://api.github.com/orgs/mustache/repos",
      "events_url": "https://api.github.com/orgs/mustache/events",
      "hooks_url": "https://api.github.com/orgs/mustache/hooks",
      "issues_url": "https://api.github.com/orgs/mustache/issues",
      "members_url": "https://api.github.com/orgs/mustache/members{/member}",
      "public_members_url": "https://api.github.com/orgs/mustache/public_members{/member}",
      "avatar_url": "https://avatars.githubusercontent.com/u/197655?v=4",
      "description": "Logic-less templates."
    },
    {
      "login": "mustache",
      "id": 197655,
      "node_id": "MDEyOk9yZ2FuaXphdGlvbjE5NzY1NQ==",
      "url": "https://api.github.com/orgs/mustache",
      "repos_url": "https://api.github.com/orgs/mustache/repos",
      "events_url": "https://api.github.com/orgs/mustache/events",
      "hooks_url": "https://api.github.com/orgs/mustache/hooks",
      "issues_url": "https://api.github.com/orgs/mustache/issues",
      "members_url": "https://api.github.com/orgs/mustache/members{/member}",
      "public_members_url": "https://api.github.com/orgs/mustache/public_members{/member}",
      "avatar_url": "https://avatars.githubusercontent.com/u/197655?v=4",
      "description": "Logic-less templates."
    },
    {
      "login": "mustache",
      "id": 197655,
      "node_id": "MDEyOk9yZ2FuaXphdGlvbjE5NzY1NQ==",
      "url": "https://api.github.com/orgs/mustache",
      "repos_url": "https://api.github.com/orgs/mustache/repos",
      "events_url": "https://api.github.com/orgs/mustache/events",
      "hooks_url": "https://api.github.com/orgs/mustache/hooks",
      "issues_url": "https://api.github.com/orgs/mustache/issues",
      "members_url": "https://api.github.com/orgs/mustache/members{/member}",
      "public_members_url": "https://api.github.com/orgs/mustache/public_members{/member}",
      "avatar_url": "https://avatars.githubusercontent.com/u/197655?v=4",
      "description": "Logic-less templates."
    },
    {
      "login": "mustache",
      "id": 197655,
      "node_id": "MDEyOk9yZ2FuaXphdGlvbjE5NzY1NQ==",
      "url": "https://api.github.com/orgs/mustache",
      "repos_url": "https://api.github.com/orgs/mustache/repos",
      "events_url": "https://api.github.com/orgs/mustache/events",
      "hooks_url": "https://api.github.com/orgs/mustache/hooks",
      "issues_url": "https://api.github.com/orgs/mustache/issues",
      "members_url": "https://api.github.com/orgs/mustache/members{/member}",
      "public_members_url": "https://api.github.com/orgs/mustache/public_members{/member}",
      "avatar_url": "https://avatars.githubusercontent.com/u/197655?v=4",
      "description": "Logic-less templates."
    }
  ];
  private _userRepositories: GitRepositories[];

  public getUserInfo(): GitUser {
    return this._userInfo;
  }
  public getUserOrganizations(): GitOrganizations[] {
    return this._userOrganizationsInfo;
  }
  public getUserRepositories(): GitRepositories[] {
    return this._userRepositories;
  }


}
