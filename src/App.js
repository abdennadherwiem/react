import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductsTable from './components/ProductsTable';
import AddProductForm from './components/AddProductForm';
import UpdateProductForm from './components/UpdateProductForm ';
import RegistrationForm from './components/RegistrationForm';
import LoginForm from './components/LoginForm';
import UserTable from './components/UserTable';
import UpdateUserForm from './components/UpdateUserForm';
import ViewUser from './components/ViewUser';
import AddTitleForm from './components/AddTitleForm';
import TitleTable from './components/TitleTable';
import AddColorForm from './components/AddColorForm';
import AddModelForm from './components/AddModelForm';
import ModelTable from './components/ModelTable';
const App = () => {
  

  return (
    <Router>
      <Routes>
            <Route path="/pp" element={<ProductsTable />} />
            <Route path="/addproduct" element={<AddProductForm />} />
            <Route path="/putproduct/:id" element={<UpdateProductForm />} />
            <Route path="/usertable" element={<UserTable />} />
            <Route path="/putuser/:id" element={<UpdateUserForm />} />
            <Route path="/RegistrationForm" element={<RegistrationForm />} />
            <Route path="/LoginForm" element={<LoginForm />} />
            <Route path="/viewuser/:id" element={<ViewUser />} />
            <Route path="/AddTitleForm" element={<AddTitleForm />}/>
            <Route path="/TitleTable" element={<TitleTable />} />
            <Route path="/AddColorForm" element={<AddColorForm />} />
            <Route path="/AddModelForm" element={<AddModelForm />} />
            <Route path="/ModelTable" element={<ModelTable />} />
      </Routes>
    </Router>
  );
};

export default App;
