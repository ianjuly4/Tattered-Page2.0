import React, {useState, createContext} from "react";

const MyContext = createContext();
const API_KEY = "AIzaSyBf_grAHTnhr09zZ0oZI_NQ8AlSyBeXS_s";

const MyContextProvider = ({children})=>{ 
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [books, setBooks] = useState([])
  const [user, setUser] = useState([])
  const [isLoggedIn, setIsLoggedIn] = useState(false)

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
    fetch(" http://127.0.0.1:5555/users", {
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
    setError(null);
    fetch(" http://127.0.0.1:5555/login", {
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
        setIsLoggedIn(true)
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

return (
    <MyContext.Provider
      value={{
        books,
        error,
        loading,
        fetchBooks,
        register,
        login,
        isLoggedIn
      }}
    >
      {children}
    </MyContext.Provider>
  );
}

export { MyContext, MyContextProvider };
