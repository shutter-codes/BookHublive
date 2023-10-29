import "./index.css";
import {Link, useNavigate} from "react-router-dom";
import {useLocation} from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";
import {FaBars} from "react-icons/fa";
import {useState} from "react";
import {GrClose} from "react-icons/gr";
import CustomLink from "./../../components/UI/CustomLink";

const Header = ({setUser, setSearchTerm, searchTerm, setSearchedBooks}) => {
    const [isNavbarOpened,
        setIsNavbarOpened] = useState(false);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser({});
        navigate("/");
    };

    const setNavbar = (value) => {
        setIsNavbarOpened(value)
    }

    const location = useLocation();
    const currentPathname = location.pathname;

    const links = [
        {
            to: "/home/browse",
            text: "All books",
            className: "all-books"
        }, {
            to: "/home/my-books",
            text: "My books",
            className: "my-books"
        }, {
            to: "/home/recommend",
            text: "Suggest a book",
            className: "suggest-book"
        }
    ];

    return (
        <div className={`header small`}>
            <div className="container">
                <Link to="/home">
                    <div id="logo" className="logo">
                        KITAAB_HOUSE
                    </div>
                </Link>
                {currentPathname === "/home/browse" && (<SearchBar
                    setSearchedBooks={setSearchedBooks}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}/>)}
                <div className="right-header">
                    <div className="buttons">
                        {links.map((link, index) => (<CustomLink key={index} {...link}/>))}
                        <div onClick={handleLogout} className="logout">
                            Logout
                        </div>
                    </div>
                    <div onClick={() => setNavbar(true)} className="burger-icon">
                        <FaBars size={25}/>
                    </div>
                    <div className={`absolute-buttons ${isNavbarOpened && "show"}`}>
                        {links.map((link, index) => 
                        (<CustomLink key={index} {...link} onClick={() => setNavbar(false)}/>))}
                        <div onClick={handleLogout} className="logout">
                            Logout
                        </div>
                        <div onClick={() => setNavbar(false)} className="close">
                            <GrClose size={25}/>
                        </div>
                    </div>
                </div>
            </div>
            <div className="search-sm hide">
                {currentPathname === "/home/browse" && (<SearchBar
                    setSearchedBooks={setSearchedBooks}
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}/>)}
            </div>
        </div>
    );
};

export default Header;
