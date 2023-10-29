import {useEffect, useState} from 'react'
import {Link} from 'react-router-dom';
import UserBook from '../../components/UserBook/UserBook';
import axios from 'axios';

const MyBooks = () => {

    const [myBooks,
        setMyBooks] = useState([])

    useEffect(() => {
        const getBooks = async() => {
            let {data} = await axios.get("/api/books/my-books", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            const sortedBooks = data.slice().sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
            setMyBooks(sortedBooks.reverse());
        };
        getBooks();
    }, [])

    return (
        <div className="home">
            <div className="container">
                <div className="title">
                    <h1>My Books</h1>
                    <div className="line"></div>
                </div>
                <div className="books">
                    {myBooks.length > 0
                        ? (myBooks.map((book, index) => <UserBook {...book} key={index}/>))
                        : (
                            <h1>No Recommendations</h1>
                        )}
                </div>
                <div className="bottom">
                    <h2>Do you have a recommendation?</h2>
                    <p>Do you know about some amazing book people should read?</p>
                    <Link to="/home/recommend">
                        <div className="suggest-book">
                            <button>Suggest a book</button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default MyBooks