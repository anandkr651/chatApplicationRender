import Signup from "./components/Signup.jsx";
import Left from "./home/leftPart/Left.jsx";
import Right from "./home/rightPart/Right.jsx";
import Login from "./components/Login.jsx";
import { Toaster } from "react-hot-toast";
import { useAuth } from "./context/AuthProvider.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";

function App() {
  const [authUser, setAuthUser] = useAuth();
  // console.log(authUser);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <>
        <Route>
          <Route path="/" element={authUser ? (<div className="flex h-screen"><Left /><Right /></div> ) : (<Navigate to="/login" />)}/>
          <Route path="/signup" element={authUser ? <Navigate to="/" /> : <Signup />} />
          <Route path="/login" element={authUser ? <Navigate to="/" /> : <Login />} />
        </Route>
      </>
    )
  );
  return (
    <div>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App;
