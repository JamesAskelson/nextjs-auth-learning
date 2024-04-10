'use server';

import { auth } from "@/auth";
import { db } from "@/db";
import paths from "@/paths";
import { string, z } from "zod";
import type { Post, Topic } from "@prisma/client";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";


const createPostSchema = z.object({
    title: z.string().min(3),
    content: z.string().min(10),
})

interface CreatePostFormState {
    errors: {
        title?: string[];
        content?: string[];
        _form?: string[];
    };
}

export async function createPost(slug: string, formState: CreatePostFormState, formData: FormData): Promise<CreatePostFormState> {

    const result = createPostSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content')
    });

    if(!result.success){
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    const session = await auth()

    if(!session || !session.user){
        return {
            errors: {
                _form: ['You must be signed in to create a new post']
            }
        }
    }

    const topic = await db.topic.findFirst({
        where: { slug }
    })

    if(!topic){
        return {
            errors: {
                _form: ["Can't find the specific topic."]
            }
        }
    }

        let post: Post;
        try {
            post = await db.post.create({
                data: {
                    title: result.data.title,
                    content: result.data.content,
                    userId: session.user.id,
                    topicId: topic.id

                }
            });
        } catch (err: unknown) {
            if(err instanceof Error) {
                return {
                    errors: {
                        _form: [err.message]
                    }
                }
            } else {
                return {
                    errors: {
                        _form: ['Something went wrong']
                    }
                }
            }
        }

    revalidatePath(paths.topicShow(slug))
    redirect(paths.postShow(slug, post.id))
    // TODO: Revalidate Topic Show
}
