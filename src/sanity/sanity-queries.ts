import { sanityFetch } from "./sanity-utils";
import groq from "groq";
import { type SeoType, type ProjectsType, type SkillsType } from "../types/types";

// GROQ Queries
export async function getSEO(): Promise<SeoType> {
  const query = groq`*[_type == "settings"] {
        seo {
            name,
            siteName,
            url,
            description,
            type,
            "image": image.asset->url,
        }
    }[0]`;

  const res = await sanityFetch(query);
  return res.seo;
}


export async function getIntro(){
  const query = groq`*[_type == 'intro'] {
    'profilePicture': profilePicture.asset->url,
    content,
  }[0]`

  const res = await sanityFetch(query)
  return res
}

export async function getResume(): Promise<string> {
  const query = groq`*[_type == 'resume'] {
    "resumeURL": resume.asset->url,
  }[0].resumeURL`

  const res: string = await sanityFetch(query)
  return res
}

export async function getFeaturedProjects(): Promise<ProjectsType> {
  const query = groq`*[_type == 'featuredProjects'] {
    featuredProjects[]->{
      _id,  
      "name": projectName,
      excerpt,
      gitHubUrl,
      liveSiteUrl,
      "image": image.asset->url,
      "tags": tags[]->{
        name
      },
    },
  }[0].featuredProjects`

  const res: ProjectsType = await sanityFetch(query)
  return res
}

export async function getSkills(): Promise<SkillsType[]> {
  const query = groq`*[_type == 'tech'] {
  name,
  link
} | order(lower(name) asc)`

  const res: SkillsType[] = await sanityFetch(query)
  return res
}