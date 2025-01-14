import { Hono } from 'hono'
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import { cors } from 'hono/cors'
import {createPostInput} from'aaditya-npm-packeges-testing'
import { CreatePostType } from 'aaditya-npm-packeges-testing'
import { UpdatePostType } from 'aaditya-npm-packeges-testing'
import {GetELementType} from 'aaditya-npm-packeges-testing' 
import { verify, sign } from 'hono/jwt'
type blog = CreatePostType;
const blogRouter = new Hono<{
    Bindings: {
      DATABASE_URL: string,
      JWT_KEY: string
    },
    Variables: {
      userId: number
    }
  }>();
  blogRouter.use('*',cors());



blogRouter.post('/', async (c) => {

    const databaseUrl = c.env.DATABASE_URL;

    const prisma = new PrismaClient({
        datasourceUrl: databaseUrl,
      }).$extends(withAccelerate());

    
    const input = await c.req.json();
     
    const {success, data} = createPostInput.safeParse(input);
    if(!success){
        c.status(401);
        return c.json({msg:"Unexpected input for the blog"});
    }
    const jwttoken = data.userId;
  
    if(!jwttoken)
    {
      c.json({msg:"Json Wb token"})
      return c.json({msg:"Worng input"})
    }
    let id:any = null
    const idnum = await verify(jwttoken,c.env.JWT_KEY);
    id  = idnum.id;

    try{
     // Chekcing if the user with id exist or not 
        const userExist = await prisma.user.findFirst({
            where:{
                id:id
        }        
      });
      
        if(!userExist)
            {
          c.status(400)
          return c.json({msg:"userDoesnot Exist"})
            }
    }
    catch(err){
      c.status(400)
        return c.json({msg:"Failed While authenticatin " , err:err});
    }
    // Storing the data in the db 
    try{
       const responce =  await prisma.blog.create({
            data:{
                title: input.title,
                content: input.content,
                authorId: id,
                date: new Date(),
              
            }
        });
       
        c.status(200);
        return c.json({msg:"succssfully created the data",responce:responce}  ) 
    }
    catch(err)
    {
         c.status(400)
         return c.json({msg:"Failed While storing the data"})
    }
 
});
blogRouter.get('/bulk',async(c)=>{

  const databaseUrl = c.env.DATABASE_URL;
  const prisma =new PrismaClient({
    datasourceUrl:databaseUrl
  }).$extends(withAccelerate());
  
  try{  
    //  Find the name of the person 
     const blogData = await prisma.blog.findMany({
      include:{
        author:{
          select:{name:true}
        }
      }
      });
    
     const validoutput:GetELementType[] = blogData.map((e)=>{
      return {
      id: e.id,
      authorId: e.authorId,
      content: e.content,
      title: e.title,
      authorname: e.author.name ?? undefined
      };

     })
 
    c.status(200);
    return c.json(validoutput);
  }
  catch(err)  
  {
  c.status(400);
  return c.json({msg:"Error on Getting the data"})
  }


}
)

blogRouter.put('/', async(c) => {

  const databaseUrl = c.env.DATABASE_URL;

  const prisma = new PrismaClient({
      datasourceUrl: databaseUrl,
    }).$extends(withAccelerate());
 
    const input:UpdatePostType  = await  c.req.json();
    const id:number = input.id;
        //Storing the data in the variable 
        try{
          await prisma.blog.update({
            data:{
              title:input.title,
              content:input.content,
  
            },
            where:{
              id:id
            }
          })
        }
        catch{
          c.status(400);
          return c.json({msg:"Cannot Update The data Problem in db "})
        }
 return 
});
blogRouter.get('/',async(c)=>{

    const databaseUrl = c.env.DATABASE_URL;

    const prisma = new PrismaClient({
        datasourceUrl: databaseUrl,
      }).$extends(withAccelerate());
  

  const token = c.req.header('token');
  if(!token)
  {
    c.status(305);
    return c.json({msg:"No token was found in the browser"})
  }

  const data = await verify(token , c.env.JWT_KEY);
  const id = Number(data.id);
  if( id===undefined)
    {
      c.status(500);
      return c.json({msg:"Invalid id "})
    } 
  
  try{
    console.log("This is executed ");
    const blogsArray = await prisma.blog.findMany({
      include:{
        author:{
          select:{
            name:true
          }
        }
      }
      ,
        where:{
            authorId:id
        }
    });
 console.log('199');
    const validoutput:GetELementType[] = blogsArray.map((e)=>{
      return {
      id: e.id,
      authorId: e.authorId,
      content: e.content,
      title: e.title,
      authorname: e.author.name ?? undefined
      };});

    if(!blogsArray)
      {
        c.status(205);
        return c.json({msg:"No Array"})
      }
  c.status(200);
  return c.json(validoutput);
  }
  catch(error)
  { 
    c.status(400)
    return c.json({msg:"Error While getting the dtaa"});
  }
});
blogRouter.get('/:id',async (c) => {
  const databaseUrl = c.env.DATABASE_URL;

  const prisma = new PrismaClient({
      datasourceUrl: databaseUrl,
    }).$extends(withAccelerate());

  const blogid = parseInt(c.req.param('id'), 0);

  if (isNaN(blogid) || blogid==null) {
    c.status(400);
    return c.json({ msg: "Invalid blog ID" });
  };
  const data  = await prisma.blog.findFirst({
    include:{
      author:{select:{name:true}}
    },
    where:{
      id:blogid
    }
  });
  if(!data)
  {
    c.status(405)
    return c.json({msg:`No data were found of id =${blogid}`})
  }

  const validoutput:GetELementType={
    id: data.id,
    authorId: data.authorId,
    content: data.content,
    title: data.title,
    authorname: data.author.name || "Anonymous"
    };
 

return c.json({msg:'Successfult Retrieved Data ' , data:validoutput});
});


export { blogRouter };
