import "./App.css";
import {Route, Routes} from "react-router-dom";
import Home from "./pages/Home"
import Navbar from "./components/common/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ForgotPassword from "./pages/ForgotPassword";
import OpenRoute from "./components/core/Auth/OpenRoute";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import MyProfile from "./components/core/Dashboard/MyProfile";
import PrivateRoute from "./components/core/Auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Error from "./pages/Error";
import Contact from "./pages/Contact";
import Settings from "./components/core/Dashboard/Settings/Settings";
import EnrolledCourses from "./components/core/Dashboard/EnrolledCourses";
import Cart from "./components/core/Dashboard/Cart/index"
import AddCourse from "./components/core/Dashboard/AddCourse/index"
import { useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";
import MyCourse from "./components/core/Dashboard/MyCourse";
import EditCourse from "./components/core/Dashboard/EditCourse/EditCourse";


function App() {

  const {user} = useSelector( (state)=>state.profile);
  return (
    <div className="w-screen min-h-screen  bg-richblack-900 flex flex-col font-inter">
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />

          <Route 
            path="/login" 
            element={
              <OpenRoute>
                <Login/>
              </OpenRoute>
            } 
          />

          <Route 
            path="/signup" 
            element={
              <OpenRoute>
                <Signup/>
              </OpenRoute>
            } 
          />

          <Route 
            path="/forgot-password" 
            element={
              <OpenRoute>
                <ForgotPassword/>
              </OpenRoute>
            } 
          />

          <Route 
            path="/update-password/:id" 
            element={
              <OpenRoute>
                <UpdatePassword/>
              </OpenRoute>
            } 
          />

          <Route 
            path="/verify-email" 
            element={
              <OpenRoute>
                <VerifyEmail/>
              </OpenRoute>
            } 
          />

          <Route 
            path="/about" 
            element={
              <About/>
            } 
          />

          <Route 
            path="/contact" 
            element={
              <Contact/>
            } 
          />

          <Route element={
             <PrivateRoute>
              <Dashboard/>
             </PrivateRoute>}
            >

              {/* child route  */}
              <Route 
                path="/dashboard/my-profile" 
                element={<MyProfile/>}
              />

              <Route 
                path="/dashboard/settings" 
                element={<Settings/>}
              />

              {/* Route only for Instructor */}
              {
                user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
                  <>
                    <Route path="/dashboard/add-course" element={<AddCourse/>}/>

                    <Route path="/dashboard/my-courses" 
                     element={<MyCourse/>}/>

                    <Route path="/dashboard/edit-course/:courseId" element={<EditCourse/>}/>
                  </>
                )
              }

              





              {/* Route only for Students */}

              {
                user?.accountType === ACCOUNT_TYPE.STUDENT && (
                  <>
                    <Route 
                    path="/dashboard/enrolled-courses" 
                    element={<EnrolledCourses/>}
                    />

                    <Route 
                    path="/dashboard/wishlist" 
                    element={<Cart/>}
                    />
                   
                  </>
                )
              }

              

               



          </Route>

          

          <Route path="*" element={<Error/>}/>

        </Routes>

    </div>
  );
}

export default App;
