import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {decode,sign,verify} from 'hono/jwt'
import { userRouter } from '../routes/user'
import { blogRouter } from '../routes/blog'
import { cors } from 'hono/cors'
import axios from 'axios'
const app = new Hono<{
  Bindings:{
    DATABASE_URL:string
    ,JWT_KEY:string
  }
}>();

app.route('/api/v1/user/', userRouter);
app.route('/api/v1/blog/',blogRouter);
app.use(cors());


export default app
