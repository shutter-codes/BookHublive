import {FcLike, FcLikePlaceholder} from "react-icons/fc";
import {useEffect, useState} from "react";
import axios from "axios";
import { handleBookLike } from "../../utils/handleLike";

const UserBook = ({
    author,
    title,
    picture,
    review,
    likes,
    genres,
    _id
}) => {
    const [isLiked,
        setIsLiked] = useState(false);
    const [userId,
        setUserId] = useState(JSON.parse(localStorage.getItem("user"))._id);
    const [likesCount,
        setLikesCount] = useState(likes?.length);

    useEffect(() => {
        setIsLiked(likes.includes(userId));
    }, [likes]);

    const handleLike = () => {
        handleBookLike(isLiked, setIsLiked, likesCount, setLikesCount, _id)
    }

    return (
        <div className="book">
            <div className="book-details">
                <div className="img">
                    <img
                        src={`http://localhost:5000/images/${picture}`}
                        alt=""/>
                </div>
                <div className="content">
                    <h3 className="title">{title}</h3>
                    <p className="author">{author}</p>
                    <div className="genres">
                        {genres.map((genre, index) => (
                            <div key={index} className="genre">
                                {genre}
                            </div>
                        ))}
                    </div>
                    {review && <div className="review">{review}</div>}
                </div>
            </div>
            <div className="likes-section">
                <div className="likes">
                    <span>{likesCount}</span>
                    Likes
                </div>
                <div onClick={handleLike} className="like">
                    {isLiked
                        ? <FcLike size={25}/>
                        : <FcLikePlaceholder size={25}/>}
                </div>
            </div>
        </div>
    );
};

export default UserBook;
