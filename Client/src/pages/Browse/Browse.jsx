import {useEffect, useState} from "react";
import "./index.css"
import axios from "axios"
import {Link} from "react-router-dom";
import Book from "../../components/Book/Book";

const Browse = ({searchedBooks, setUser, searchTerm}) => {

    const [books,
        setBooks] = useState([])
    const [searched,
        setSearched] = useState([])
    const [sortTerm,
        setSortTerm] = useState(null)

    useEffect(() => {
        setSearched(searchedBooks)
    }, [searchedBooks])

    useEffect(() => {
        const getBooks = async() => {
            let {data} = await axios.get("/api/books", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
            setBooks(data);
        };
        getBooks();
    }, [])

    const options = {
        category: [
            "All",
            "Personal Development",
            "Communication",
            "Finance",
            "Productivity",
            "Design",
            "Marketing",
            "Biography"
        ],
        date: ["Newest", "Oldest"]
    };

    const renderSelect = (optionType) => {
        const sortType = `${optionType}-sort`

        return <div key={optionType} className={sortType}>
            <label htmlFor={sortType}>Category</label>
            <select onChange={(e) => setSortTerm(e.target.value)} id={sortType}>
                {options[optionType].map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    }

    return (
        <div className="home">
            <div className="container">
                <div className="title">
                    <h1>Browse</h1>
                    <div className="line"></div>
                    <p>Browse all books or select a category</p>
                </div>
                <div className="sort-by">
                    {renderSelect("category")}
                    {renderSelect("date")}
                </div>
                <div className="books">
                    {searchTerm?.length > 0
                            ? (searched.length > 0
                                ? (searched.map((book, index) => (<Book setUser={setUser} key={index} {...book}/>)))
                                : (
                                    <h1>No Result</h1>
                                ))
                            : books.length > 0
                                ? (books.map((book, index) => (<Book setUser={setUser} key={index} {...book}/>)))
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

export default Browse