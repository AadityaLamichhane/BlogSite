import { Hono } from 'hono'
import { userRouter } from '../routes/user'
import { blogRouter } from '../routes/blog'
import { cors } from 'hono/cors'
const app = new Hono<{
  Bindings:{
    DATABASE_URL:string
    ,JWT_KEY:string
  }
}>();

app.route('/api/v1/user/', userRouter);
app.route('/api/v1/blog/',blogRouter);
// to check if the route is running properly this was done 
app.get("/",(c)=>{
  
  return c.json({msg:"This was successfully hit in the backend"});
})
app.post("/",async(c)=>{
  const data  =  await c.req.json();
  console.log("This was the post eleement ");
  return c.json({ data :data, msg:"This was the messafe in the output"});

})
app.use(cors());




export default app
