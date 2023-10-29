import {Link} from "react-router-dom";
import Book from "../../components/Book/Book";
import "./index.css"
import {useEffect, useState} from "react";
import axios from "axios"

const Home = ({setUser, user}) => {

    const [books,
        setBooks] = useState([])

    useEffect(() => {
        const getBooks = async() => {
            let {data} = await axios.get("/api/books/following-books", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setBooks(data);
        }
        getBooks()
    }, [user])

    return (
        <div className="home">
            <div className="container">
                <div className="title">
                    <h1>Latest Recommendations</h1>
                    <div className="line"></div>
                </div>
                <div className="books">
                    {books.length > 0
                        ? books.map((book, index) => (<Book setUser={setUser} key={index} {...book}/>))
                        : <h1>No Recommendations</h1>}
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

export default Home