import {z} from 'zod'
export const courseLevels=["Beginner","Intermedi","Advanced"] as const
export const courseStatus=['Draft','Published','archived'] as const
export const courseCategories=[
    "Development",
    "Business",
    "Finance",
    "IT & Software",
    "Office Productivity",
    "Personal Development",
    "Design",
    "Marketing",
    "Health & Fitness",
    "Music",
    "Teaching & Acaddemics"
] as const

export const courseSchema=z.object({
    title:z.string().min(3,{message:"Title must be at least 3 characters long"}).max(100,{message:"Title must be at most 3 characters long"}),
    description:z.string().min(3,{message:"Description must be at least 3 characters long"}),
    fileKey:z.string().min(1,{message:"File is required!"}),
    price:z.number().min(1,{message:"Price is required!"}),
    duration:z.number().min(1,{message:"Duration must be 1h"}).max(500,{message:"Duration must be at most 500h"}),
    level:z.enum(courseLevels,{message:"Level is required!"}),
    category:z.enum(courseCategories,{message:"Category required!"}),
    smallDescription:z.string().min(3,{message:"Small description must be at least 3 characters"}).max(200," Small description must be at most 200 characters "),
    slug:z.string().min(3,{message:"Slug must be at least 3 characters long"}),
    status:z.enum(courseStatus,{message:"Status is required!"})
})

export type CourseSchemaType=z.infer<typeof courseSchema>