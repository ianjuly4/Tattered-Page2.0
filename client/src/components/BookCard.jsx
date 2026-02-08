import React from "react";

const BookCard = ({book}) =>{
    const {volumeInfo} = book;
    const { title, authors, description, imageLinks } = volumeInfo;
    
    return(
        <div className="bookcard">
            <h2>{title}</h2>
            <p>{authors && authors.length > 0 ? `By ${authors.join(", ")}` : "Author unknown"}</p>
            <p>{description ? description.substring(0, 100) + "..." : "No description available."}</p>
    </div>
    )
}
export default BookCard;