import ContentCarousel from './Carousel/ContentCarousel'
import { getFeaturedProjects } from '../../sanity/sanity-queries'
import type { ProjectsType } from '../../types/types'

const projects: ProjectsType = await getFeaturedProjects()

export default function FeaturedProjects() {
  return (
    <section className="flex scroll-mt-20 flex-col md:scroll-mt-16">
      <h1 className="mb-4 w-full text-center text-4xl uppercase dark:text-purple-dark">
        Projects
      </h1>
      <div className="flex w-full max-w-3xl flex-col items-center lg:items-start">
        <div className="flex w-full flex-col items-center gap-4  md:flex-row md:flex-wrap md:items-start ">
          <ContentCarousel projects={projects} />
        </div>
      </div>
    </section>
  )
}
