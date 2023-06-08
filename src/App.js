import React from 'react'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import Home from './components/pages/home/Home';
import About from './components/pages/about/About';
import Process from './components/pages/process/Process';
import Contact from './components/pages/contact/Contact';

import ProductForm from './components/pages/product/ProductForm';






const App = () => {
  return (
    <>
   
   <BrowserRouter>
   <Sidebar>
<Routes>
<Route path='/' element={<Dashboard />} />
<Route path='/product' element={<ProductForm />} />
<Route path='/update/:id' element={<ProductForm />} />
<Route path='/home' element={<Home />} />
<Route path='/about' element={<About />} />
<Route path='/about/:id' element={<About />} />
<Route path='/process'element={<Process />} />
<Route path='/process/:id'element={<Process />} />
<Route path='/contact'element={<Contact />} />
<Route path='/contact/:id'element={<Contact />} />
</Routes>
</Sidebar>
</BrowserRouter>
    </>
  )
}

export default App