import Home from "./components/Home"
import SearchResults from "./components/SearchResults"
import Search from "./components/Search"
import ChatRoom from "./components/ChatRoom"
import Account from "./components/Account"

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
    path: "/books",
    element: <Search/>
  },
  {
    path: "/bookclub",
    element: <ChatRoom/>
  }
]
export default routes