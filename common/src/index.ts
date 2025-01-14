import z from "zod";

export const signupInput = z.object({
    username: z.string().email(),
    password: z.string(),
    name: z.string().optional(),
});

export type SignupType = z.infer<typeof signupInput>;

export const signinInput = z.object({
    username: z.string().email(),
    password: z.string(),
});

export type SigninType = z.infer<typeof signinInput>;

export const createPostInput = z.object({
    title: z.string(),
    content: z.string(),
    userId:z.string()
});

export type CreatePostType = z.infer<typeof createPostInput>;

export const updatePostInput = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
    userId:z.string(),
    id:z.number()
});


export type UpdatePostType = z.infer<typeof updatePostInput>;
 

export const getElement = z.object({
    id: z.number(),
    authorId:z.number(),
    content: z.string(),
    authorname:z.string().optional(),
    title: z.string()
});
export type GetELementType = z.infer<typeof getElement>
