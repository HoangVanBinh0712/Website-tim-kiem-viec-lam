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
import CategoryContextProvider from './contexts/CategoryContext';
import PostDetail from './component/posts/PostDetail';
import NavbarMenu from './layouts/NavBarMenu';
import EmployerPost from './component/posts/employer/EmployerPost';
import AdminPost from './component/posts/admin/AdminPost'
import MarkedPosts from './component/posts/jobseeker/MarkedPost';
import Profile from './component/posts/jobseeker/Profile';
import ViewSubmmiterProfile from './component/posts/employer/ViewSubmitterProfile';
import ProfileSearch from './component/posts/employer/ProfileSearch';
//Protected Route là để chuyển trang private sang login đăng nhập mới cho xài
function App() {
  return (
    <AuthContextProvider>
      <CategoryContextProvider>

      <PostContextProvider>
        <UserContextProvider>

        <Routes>

          {/* <Route exact path='/dashboard' element={<ProtectedRoute component={DashBoard} />} /> */}
          <Route exac path='/posts/yourposts' element={<ProtectedRoute component={EmployerPost} />} />
          <Route exac path='/posts/admin' element={<ProtectedRoute component={AdminPost} />} />
          <Route exac path='/posts/markedposts' element={<ProtectedRoute component={MarkedPosts} />} />
          <Route exac path='/posts/yourposts/:id/submitted' element={<ProtectedRoute component={ViewSubmmiterProfile} />} />
          <Route exact path='/profile/search' element={<><NavbarMenu> </NavbarMenu> <ProfileSearch/></>} />

          <Route exac path='/profile' element={<ProtectedRoute component={Profile} />} />

          <Route exact path='/dashboard' element={<><NavbarMenu> </NavbarMenu> <DashBoard/></>} />

          {/* <Route exac path='/postDetail/:id' element={<ProtectedRoute component={PostDetail}/>}/> */}
          <Route exact path='/postDetail/:id' element={<><NavbarMenu> </NavbarMenu> <PostDetail/></>} />
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
          <Route exact path='/about' element={<><NavbarMenu> </NavbarMenu> <About/></>} />
          <Route exac path='/information' element={<ProtectedRoute component={InforMation}/>}/>
          <Route exact path='/' element={<Navigate to='/login' replace />} />

        </Routes>
        </UserContextProvider>

      </PostContextProvider>
      </CategoryContextProvider>

    </AuthContextProvider>
  );
}

export default (App);
