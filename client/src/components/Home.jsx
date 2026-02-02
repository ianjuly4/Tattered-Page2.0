import React from "react";
import Header from "./Header";
import Search from "./Search"

const Home = () => {
    return(
        <div>
            <div className="bg-[#a348a6] w-full h-screen">
                <Header/>
                <Search/>
            </div>
            
        </div>
    )
}
export default Home