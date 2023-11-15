import { GitHub, Twitter, TrendingUpArrowIcon } from '../../assets/ReactIcons'

export default function Metrics({ socialLinks, metrics }: {socialLinks: any, metrics: any}) {
  const githubLink = socialLinks.filter((link: any) => link.name === 'GitHub')[0]
  const twitterLink = socialLinks.filter((link: any) => link.name === 'Twitter')[0]

  return (
    <div className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-borderColor-light p-4 hover:border-purple-light dark:border-gray-300/20 dark:hover:border-purple-dark md:w-1/2">
      <span className="flex items-center gap-2">
        <TrendingUpArrowIcon
          size={20}
          classProps="animate-pulse transition-all"
        />
        <span className="text-purple-light dark:text-purple-dark">
          {metrics.tweetCount.toLocaleString()}
        </span>{' '}
        posts on{' '}
        <a
          href={twitterLink.URL}
          className=" hover:scale-110 hover:text-purple-light  hover:duration-75 hover:ease-in-out dark:hover:text-purple-dark"
          target="_blank"
        >
          <Twitter size={24} />
        </a>
      </span>
      <span className="flex items-center gap-2">
        <TrendingUpArrowIcon
          size={20}
          classProps="animate-pulse transition-all"
        />
        <span className="text-purple-light dark:text-purple-dark">
          {metrics.githubCommits.toLocaleString()}
        </span>
        <a
          href={githubLink.URL}
          className=" hover:scale-110 hover:text-purple-light hover:duration-75 hover:ease-in-out dark:hover:text-purple-dark"
          target="_blank"
        >
          <GitHub size={24} />
        </a>
        commits
      </span>
    </div>
  )
}