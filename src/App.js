import './App.css';
import Home from './pages/Home';
import Register from './pages/Register';
import { createBrowserRouter,RouterProvider } from 'react-router-dom';
import SignIn from './pages/SignIn';

import 'react-toastify/dist/ReactToastify.css';
import List from './pages/List';
import Navbar from './components/Navbar';

const router = createBrowserRouter([
  {path:'/',
element:<Home/>},
{
  path:'/login',
  element:<SignIn/>,
},
{
  path:'/signup',
  element:<Register/>
},

{
  path:'/book/listing',
  element:<List/>
}

])

function App() {
  return (<>
  <RouterProvider router={router}>
    
  </RouterProvider>
  </>
  );
}

export default App;
