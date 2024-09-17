import {BrowserRouter,Route, Routes} from "react-router-dom"
import Layout from "./Pages/Layout"
import Home from "./Pages/Home"
import Profile from "./Pages/Profile"
import UserProfile from "./Pages/Update"
import Login from "./Pages/Login"
import Signup from "./Pages/Signup"

function Routeprovider() {
  return (
   <BrowserRouter>
    <Routes>
        <Route path="/" element={<Layout />} >
        <Route path="/" element={<Home />} />
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="update" element={<UserProfile />} />
        </Route>
    </Routes>
   </BrowserRouter>
  )
}
export default Routeprovider;
