import z from "zod";
export declare const signupInput: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
    name: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
    name?: string | undefined;
}, {
    username: string;
    password: string;
    name?: string | undefined;
}>;
export type SignupType = z.infer<typeof signupInput>;
export declare const signinInput: z.ZodObject<{
    username: z.ZodString;
    password: z.ZodString;
}, "strip", z.ZodTypeAny, {
    username: string;
    password: string;
}, {
    username: string;
    password: string;
}>;
export type SigninType = z.infer<typeof signinInput>;
export declare const createPostInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    userId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    userId: string;
}, {
    title: string;
    content: string;
    userId: string;
}>;
export type CreatePostType = z.infer<typeof createPostInput>;
export declare const updatePostInput: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
    userId: z.ZodString;
    id: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    userId: string;
    id: number;
    title?: string | undefined;
    content?: string | undefined;
}, {
    userId: string;
    id: number;
    title?: string | undefined;
    content?: string | undefined;
}>;
export type UpdatePostType = z.infer<typeof updatePostInput>;
export declare const getElement: z.ZodObject<{
    id: z.ZodNumber;
    authorId: z.ZodNumber;
    content: z.ZodString;
    authorname: z.ZodOptional<z.ZodString>;
    title: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    id: number;
    authorId: number;
    authorname?: string | undefined;
}, {
    title: string;
    content: string;
    id: number;
    authorId: number;
    authorname?: string | undefined;
}>;
export type GetELementType = z.infer<typeof getElement>;
