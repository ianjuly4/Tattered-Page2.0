import Home from "./components/Home"
import SearchResults from "./components/SearchResults"
import Search from "./components/Search"
import ChatRoom from "./components/ChatRoom"
import Account from "./components/Account"
import Login from "./components/Login"
import Register from "./components/Register"

const routes = [
    {
    path: "/",
    element: <Home />,  
  },
  {
    path: "/user/:userId",
    element: <Account/>
  },
  {
    path: "/auth/login",
    element: <Login/>
  },
  {
    path: "/auth/register",
    element: <Register/>
  },
  {
    path: "/books",
    element: <Search/>
  },

  {
    path: "/bookclub",
    element: <ChatRoom/>
  }
]
export default routes