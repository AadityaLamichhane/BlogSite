
import{BrowserRouter,Routes,Route} from'react-router-dom'
import './App.css'
import {Signup} from '../src/pages/Signup'
import {Signin} from '../src/pages/Signin'
import {Blog} from '../src/pages/Blog'
import { CreateBlog } from './pages/CreateBlog'
import { BlogDetail } from './pages/BlogDetail'
function App() {
  

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Signup/>}></Route>
      <Route path="/signup" element={<Signup/>}></Route>
      <Route path="/signin" element={<Signin/>}></Route>
      <Route path="/blog" element={<Blog/>}></Route>
      <Route path="/createBlog" element={<CreateBlog/>}></Route>
      <Route path='/blog/:id' element={<BlogDetail></BlogDetail>}/>  
    </Routes >
    </BrowserRouter>
    </>
  )
}

export default App
