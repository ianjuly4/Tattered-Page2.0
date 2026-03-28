import React, {useState, createContext, useEffect} from "react";

const MyContext = createContext();
const API_KEY = "AIzaSyBf_grAHTnhr09zZ0oZI_NQ8AlSyBeXS_s";

const MyContextProvider = ({children})=>{ 
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [books, setBooks] = useState([])
  const [user, setUser] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginError, setLoginError] = useState(null)

  const fetchBooks = (searchQuery, filterType) => {
    console.log(searchQuery,filterType)
    setLoading(true);
    setError(null);

    let url = `https://www.googleapis.com/books/v1/volumes?q=`;

    if (filterType === "title") url += `intitle:${searchQuery}`;
    if (filterType === "author") url += `inauthor:${searchQuery}`;
    if (filterType === "genre") url += `subject:${searchQuery}`;

    url += `&key=${API_KEY}`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.items && data.items.length > 0) {
          setBooks(data.items);
          console.log(books)
          console.log(data.items)
          sessionStorage.setItem("books", JSON.stringify(data.items));
        } else {
          setError("No books found.");
          setBooks([]);
        }
      })
      .catch((error) => {
        setLoading(false);
        setError(error.message || "Something went wrong");
      });
  };

  const register = (email, password) => {
    setLoading(true);
    setError(null);
    fetch(" http://localhost/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    })
    .then((response) => {
        if (!response.ok) {
            return response.json().then((data) => {
                throw new Error(data.error || "Create Account failed");
            });
        }
        return response.json();
    })
    .then((data) => {
        setUser(data);
        return true;
    })
    .catch((error) => {
        setError(error.message);  
        return false;
    })
    .finally(() => {
        setLoading(false);
    });
  }

  const login = (email, password) => {
    setLoading(true);
    setLoginError(null);
    fetch("http://localhost:5555/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
      credentials: "include",
    })
    .then((response) => {
        if (!response.ok) {
            return response.json().then((data) => {
                throw new Error(data.error || "Account Login failed");
            });
        }
        return response.json();
    })
    .then((data) => {
        setUser(data.user);
        console.log(data.user)
        setIsLoggedIn(true)

        return true;
    })
    .catch((error) => {
        setLoginError(error.message);  
        return false;
    })
    .finally(() => {
        setLoading(false);
    });
  }

  const logout = () => {
    fetch("http://localhost:5555/logout", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
     
        setUser(null);
        setIsLoggedIn(false);

      })
      .catch((error) => {
        setError("Logout Error: " + error.message);
      });
  };
//TODO figure out whats wrong with session
  useEffect(()=> {
    fetch("http://localhost:5555/check_session", {
      method: "GET",
      credentials: "include"
    })
    .then((r)=> {
      if (r.ok) return r.json();
      throw new Error("Not logged in");
    })
    .then((data)=>{
      setUser(data.user)
      setIsLoggedIn(true)
    })
    .catch(()=>{
      setUser(null);
      setIsLoggedIn(false)
    })
  }, [])

return (
    <MyContext.Provider
      value={{
        books,
        error,
        loading,
        fetchBooks,
        register,
        login,
        isLoggedIn, 
        user, 
        logout,
        loginError
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export { MyContext, MyContextProvider };
