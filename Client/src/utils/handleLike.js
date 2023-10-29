import axios from "axios";

export const handleBookLike = async(isLiked, setIsLiked, likesCount, setLikesCount, _id) => {
    isLiked
        ? setLikesCount(likesCount - 1)
        : setLikesCount(likesCount + 1);
    setIsLiked(!isLiked);

    try {
        await axios.put(`/api/books/${_id}/like`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        });
    } catch (error) {
        console.log(error);
    }
};