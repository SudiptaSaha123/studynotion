import { Route, Routes, useNavigate } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import NavBar from "./components/common/NavBar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OpenRoute from "./components/core/auth/OpenRoute";
import ForgotPassword from "./pages/ForgotPassword";
import UpdatePassword from "./pages/UpdatePassword";
import VarifyEmail from "./pages/VarifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./components/core/dashboard/MyProfile";
import PrivateRoute from "./components/core/auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Settings from "./components/core/dashboard/Settings/Settings";
import { useDispatch, useSelector } from "react-redux";
import { ACCOUNT_TYPE } from "./utils/constants";
import AddCourse from "./components/core/dashboard/AddCourse/AddCourse";
import MyCourses from "./components/core/dashboard/MyCourses";
import EditCourse from "./components/core/dashboard/EditCourse/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import Cart from "./components/core/dashboard/Cart/Cart";
import EnrolledCourse from "./components/core/dashboard/EnrolledCourse/EnrolledCourse";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/viewCourse/VideoDetails";
import { useEffect } from "react";
import { getUserDetails } from "./services/operations/userAPI";
import Instructor from "./components/core/dashboard/InstructorDashboard/Instructor";

function App() {
  const { user } = useSelector((state) => state.profile);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      const token = JSON.parse(localStorage.getItem("token"));
      dispatch(getUserDetails(token, navigate));
    }
  }, []);

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex flex-col font-inter">
      <NavBar></NavBar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/about" element={<About></About>}></Route>
        <Route path="/contact" element={<Contact></Contact>}></Route>
        <Route
          path="/courses/:courseId"
          element={<CourseDetails></CourseDetails>}
        ></Route>
        <Route
          path="/catalog/:catalogName"
          element={<Catalog></Catalog>}
        ></Route>
        <Route
          element={
            <PrivateRoute>
              <Dashboard></Dashboard>
            </PrivateRoute>
          }
        >
          <Route
            path="/dashboard/my-profile"
            element={<MyProfile></MyProfile>}
          ></Route>
          <Route
            path="/dashboard/settings"
            element={<Settings></Settings>}
          ></Route>

          {/* Routes For Instructors  */}
          {user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
            <>
              <Route
                path="/dashboard/add-course"
                element={<AddCourse></AddCourse>}
              ></Route>
              <Route
                path="/dashboard/my-courses"
                element={<MyCourses></MyCourses>}
              ></Route>
              <Route
                path="/dashboard/edit-course/:courseId"
                element={<EditCourse></EditCourse>}
              ></Route>
              <Route
                path="/dashboard/instructor"
                element={<Instructor></Instructor>}
              ></Route>
            </>
          )}

          {/* Routes for Students */}
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="/dashboard/cart-items"
                element={<Cart></Cart>}
              ></Route>
              <Route
                path="/dashboard/enrolled-courses"
                element={<EnrolledCourse></EnrolledCourse>}
              ></Route>
            </>
          )}
        </Route>

        {/* For Watching Course Videos */}
        <Route
          element={
            <PrivateRoute>
              <ViewCourse></ViewCourse>
            </PrivateRoute>
          }
        >
          {user?.accountType === ACCOUNT_TYPE.STUDENT && (
            <>
              <Route
                path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
                element={<VideoDetails></VideoDetails>}
              ></Route>
            </>
          )}
        </Route>

        <Route
          path="/signup"
          element={
            <OpenRoute>
              <Signup></Signup>
            </OpenRoute>
          }
        ></Route>
        <Route
          path="/login"
          element={
            <OpenRoute>
              <Login></Login>
            </OpenRoute>
          }
        ></Route>
        <Route
          path="/forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword></ForgotPassword>
            </OpenRoute>
          }
        ></Route>
        <Route
          path="/verify-email"
          element={
            <OpenRoute>
              <VarifyEmail></VarifyEmail>
            </OpenRoute>
          }
        ></Route>
        <Route
          path="/update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword></UpdatePassword>
            </OpenRoute>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
