import {AiOutlineSearch} from "react-icons/ai";
import "./index.css"
import axios from "axios";
import {useEffect} from "react";

const SearchBar = ({setSearchTerm, searchTerm, setSearchedBooks}) => {

    useEffect(() => {
        const getSearchBooks = async() => {
            try {
                const {data} = await axios.get(`/api/books/search/${searchTerm}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                });
                return data
            } catch (error) {
                console.log(error)
                return []
            }
        }
        if (searchTerm) {
            const fetchData = async() => {
                const data = await getSearchBooks();
                setSearchedBooks(data);
            };

            fetchData();
        }else {
            setSearchedBooks([])
        }
    }, [searchTerm])

    return (
        <div className="searchBar">
            <form>
                <input
                    onChange={e => setSearchTerm(e.target.value)}
                    type="text"
                    placeholder="Search books"/>
                <button>
                    <AiOutlineSearch size={25}/>
                </button>
            </form>
        </div>
    );
}

export default SearchBar