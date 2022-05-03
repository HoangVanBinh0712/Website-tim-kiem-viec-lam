import './App.css';
import { Route, Routes, Navigate } from 'react-router-dom'
import AuthContextProvider from './contexts/AuthContext';
import DashBoard from './views/DashBoard';
import LoginForm from './component/auth/loginForm';
import RegisterForm from './component/auth/registerForm';
import ProtectedRoute from './routing/ProtectedRoute'
import EmpRegisterForm from './component/auth/EmpRegisterForm'
import About from './views/About';
import PostContextProvider from './contexts/PostContext';
import InforMation from './views/Information';
import UserContextProvider from './contexts/UserContext';
//Protected Route là để chuyển trang private sang login đăng nhập mới cho xài
function App() {
  return (
    <AuthContextProvider>
      <PostContextProvider>
        <UserContextProvider>

        <Routes>

          <Route exact path='/dashboard' element={<ProtectedRoute component={DashBoard} />} />
          <Route
            exact
            path='/login'
            element={<LoginForm />} />
          <Route
            exact
            path='/register'
            element={<RegisterForm />}
          />
          <Route exact path='/registerEmp'
            element={<EmpRegisterForm />} />
          <Route exac path='/about' element={<ProtectedRoute component={About} />} />
          <Route exac path='/information' element={<ProtectedRoute component={InforMation}/>}/>
          <Route exact path='/' element={<Navigate to='/login' replace />} />

        </Routes>
        </UserContextProvider>

      </PostContextProvider>
    </AuthContextProvider>
  );
}

export default (App);
