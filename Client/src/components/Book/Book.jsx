import "./index.css"
import {AiOutlinePlusSquare} from "react-icons/ai"
import {FcLike, FcLikePlaceholder} from "react-icons/fc";
import {PiMinusSquare} from 'react-icons/pi'
import {useEffect, useState} from "react"
import axios from "axios"
import { handleBookLike } from "../../utils/handleLike";

const Book = ({
    author,
    title,
    picture,
    user,
    review,
    likes,
    genres,
    _id,
    setUser
}) => {

    const [isLiked,
        setIsLiked] = useState(false)
    const [userId,
        setUserId] = useState(JSON.parse(localStorage.getItem("user"))._id);
    const [likesCount,
        setLikesCount] = useState(likes?.length)
    const [isUserFollowed,
        setIsUserFollowed] = useState(false)

    useEffect(() => {
        if (likes) 
            setLikesCount(likes?.length)
        }, [likes])

    useEffect(() => {
        setIsLiked(likes?.includes(userId))
        let userFollowing = JSON.parse(localStorage.getItem("user")).following
        setIsUserFollowed(userFollowing?.includes(user?._id))
    }, [likes, user?.following])

    const handleLike = () => {
        handleBookLike(isLiked, setIsLiked, likesCount, setLikesCount, _id)
    }

    const handleFollow = async() => {
        setIsUserFollowed(!isUserFollowed)

        const requestConfig = {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        };

        try {
            const userId = user?.id
            const requestUrl = `/api/users/${userId}/${isUserFollowed ? "unfollow" : "follow"}`

            await axios.put(requestUrl, {}, requestConfig);

            setUser((prev) => {
                const updatedFollowing = isUserFollowed
                    ? prev
                        .following
                        .filter((friend) => friend !== userId)
                    : [
                        userId, ...prev.following
                    ];

                return {
                    ...prev,
                    following: updatedFollowing
                };
            });
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="book">
            <div className="book-details">
                <div className="img">
                    <img src={`http://localhost:5000/images/${picture}`} alt=""/>
                </div>
                <div className="content">
                    <h3 className="title">{title}</h3>
                    <p className="author">{author}</p>
                    <div className="genres">
                        {genres?.map((genre, index) => (
                                <div key={index} className="genre">
                                    {genre}
                                </div>
                            ))}
                    </div>
                    {review && <div className="review">{review}</div>}
                </div>
            </div>
            <div className="user">
                <div className="left">
                    Recommended by:
                    <span>{user?.name}</span>
                </div>
                <div onClick={handleFollow} className="follow">
                    {isUserFollowed
                        ? (<PiMinusSquare size={35}/>)
                        : (<AiOutlinePlusSquare size={35}/>)}
                </div>
            </div>
            <div className="likes-section">
                <div className="likes">
                    <span className="">{likesCount}</span>
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
}

export default Book