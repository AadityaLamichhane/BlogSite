import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { decode, sign, verify } from 'hono/jwt'
import { z } from 'zod'
import {signupInput , signinInput} from 'aaditya-npm-packeges-testing'
import { except } from 'hono/combine'
import { cors } from 'hono/cors'

const userRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string,
    JWT_KEY: string
  },
  Variables: {
    userId: number
  }
}>();

userRouter.use('*', cors());

userRouter.post('/signup', async (c) => {
  const body = await c.req.json();

  const databaseUrl = c.env.DATABASE_URL;
  if (!databaseUrl) {
    c.status(500);
    return c.json({ error: 'DATABASE_URL is not defined' });
  }

  const prisma = new PrismaClient({
    datasourceUrl: databaseUrl,
  }).$extends(withAccelerate());

  try {
    const { success, data } = signupInput.safeParse({
      username: body.username,
      password: body.password,
      name: body.name
    });
    if (!success) {
      c.status(405);
      return c.json({ msg: "Failed Authentication" });
    }
  } catch (err) {
    c.status(400);
    return c.json({ msg: "Failed While doing authentication" });
  }

  try {
    // Checking the previous data
    const pastUser = await prisma.user.findFirst({
      where: {
        username: body.username
      }
    });
    if (pastUser) {
      c.status(403);
      return c.json({ msg: "Already user exist with same credentials" });
    }

    const user = await prisma.user.create({
      // Every user when logged in will be provided the id in the user variable that is unique
      // Checking for the authentication for the user
      data: {
        username: body.username,
        password: body.password,
        name: body.name
      }
    });
    const jwtValue = await sign({
      id: user.id
    }, c.env.JWT_KEY);

    c.status(200);

    return c.json({ msg: 'This is the post method for the signin', jwtvalue: jwtValue });

  } catch (e) {
    c.status(404);
    c.json({ error: e });
    return c.text("Something went wrong while storing the data");
  }
});

userRouter.post('/signin', async (c) => {
  const databaseUrl = c.env.DATABASE_URL;
  const inputdata = await c.req.json();
  if (!databaseUrl) {
    c.status(500);
    return c.json({ error: 'DATABASE_URL is not defined' });
  }
  const {success,data} = signinInput.safeParse(inputdata);
  if(!success)
  {
    c.status(400);
    return c.json({msg:"Validation input error"});
  }
  const avalue = success

  const prisma = new PrismaClient({
    datasourceUrl: databaseUrl,
  }).$extends(withAccelerate());
  
  const body = await c.req.json();
  const userexist = await prisma.user.findFirst({
    where: {
      username: data.username,
    }
  });

  if (!userexist) {
    c.status(404);
    return c.text("User Doesn't Exist");
  }
  // Writing the code to generate the jwt token
  const jwt = await sign({
    id: userexist.id
  }, c.env.JWT_KEY);

  c.set('userId', userexist.id);
  c.status(200);
  return c.json({ msg: "Successfully Signed you in", token: jwt });
});

// Remove the leading 'api/v1/' from the route path
userRouter.put('/blog', (c) => {
  return c.text('This is the test ');
});

export { userRouter };
