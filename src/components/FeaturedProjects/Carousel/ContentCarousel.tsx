import ProjectCard from './ProjectCard'
import useCarousalClicks from '../../../hooks/useCarousalClicks'
import type { ProjectsType } from '../../../types/types'

type CarouselProps = {
  projects: ProjectsType
}

export default function ContentCarousel({ projects }: CarouselProps) {
  const { activeIndex, LeftButton, RightButton, IndexBubbles } =
    useCarousalClicks(projects)

  return (
    <>
      <div className="relative flex w-full flex-col shadow-xl">
        <LeftButton />
        <RightButton />
        <div className="flex w-full overflow-hidden">
          <div>
            {projects.map((project: any, index: number) => (
              <ProjectCard
                key={index + project.name}
                project={project}
                isSelected={activeIndex === index}
              />
            ))}
          </div>
        </div>
        <div className="mt-2 flex items-center justify-evenly gap-2 text-foreground dark:bg-background-dark md:hidden">
          <LeftButton view="mobile" />
          <RightButton view="mobile" />
        </div>
      </div>
      <IndexBubbles />
    </>
  )
}
