import React from "react";
import defaultbookimage from "../assets/defaultbookimage.jpg"

const BookCard = ({book}) =>{
    const {volumeInfo} = book;
    const { title, authors, description, imageLinks } = volumeInfo;

    const coverImageUrl = imageLinks?.thumbnail || defaultbookimage
    
    return(
        <div className="bookcard">
            <h2>{title}</h2>
            <img
                src={coverImageUrl}
                alt={title}></img>
            <p>{authors && authors.length > 0 ? `By ${authors.join(", ")}` : "Author unknown"}</p>
            <p>{description ? description.substring(0, 100) + "..." : "No description available."}</p>
    </div>
    )
}
export default BookCard;