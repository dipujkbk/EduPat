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


function App() {
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
                element={
                  <PrivateRoute>
                    <MyProfile/>
                  </PrivateRoute>
                }
              />

              <Route 
                path="/dashboard/settings" 
                element={
                  <PrivateRoute>
                    <Settings/>
                  </PrivateRoute>
                }
              />

              <Route 
                path="/dashboard/enrolled-courses" 
                element={
                  <PrivateRoute>
                    <EnrolledCourses/>
                  </PrivateRoute>
                }
             />



          </Route>

          

          <Route path="*" element={<Error/>}/>

        </Routes>

    </div>
  );
}

export default App;
