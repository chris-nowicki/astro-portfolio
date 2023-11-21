import { type ColumnType } from 'kysely'

export type SeoType = {
  name: string
  siteName: string
  url: string
  description: string
  type: string
  image: string
}

export type ProjectsType = {
  name: string
  image: string
  excerpt: string
  liveSiteURL: string
  gitHubURL: string
  tags: {
    name: string
  }[]
}[]

export type SkillsType = {
  name: string
  link: string
}

// export type Article = {
//   id: string;
//   title: string;
//   url: string;
//   published_at: string;
//   page_views_count: number;
//   reading_time_minutes: number;
// };

export type Database = {
  tweetCount: TweetCountTable
  githubMetrics: GitHubMetricsTable
}

type TweetCountTable = {
  count: number
  updated_at?: ColumnType<Date, string | undefined>
  id?: number
}

type GitHubMetricsTable = {
  commits: number
  repos: number
  updated_at?: ColumnType<Date, string | undefined>
  id?: number
}

export type githubMetricsType = {
  commits: number
  repos: number
}

export type MetricsType = {
  tweetCount: number
  githubCommits: number
  githubRepos: number
}
