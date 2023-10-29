import {Fragment, useEffect, useState} from 'react'
import './App.css'
import {Navigate, Route, Routes} from 'react-router-dom'
import Layout from './utils/Layout'
import Home from './pages/Home/Home'
import Recommend from './pages/Recommend/Recommend'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Browse from './pages/Browse/Browse'
import MyBooks from './pages/MyBooks/MyBooks'
import axios from 'axios'

function App() {

    // axios.defaults.baseURL = "https://book-sharing-platform-server.onrender.com";
    axios.defaults.baseURL = "http://localhost:5000";

    let [user,
        setUser] = useState(JSON.parse(localStorage.getItem("user")) || null)
    let [searchTerm,
        setSearchTerm] = useState("")
    let [searchedBooks,
        setSearchedBooks] = useState([])
    let [isDarkMode,
        setIsDarkMode] = useState(false)

    const handleModeToggle = () => {
        setIsDarkMode((prev) => !prev);
        console.log(isDarkMode)
    };

    useEffect(() => {
        localStorage.setItem("user", JSON.stringify(user));
    }, [user]);

    useEffect(() => {
        if (searchTerm === "") {
            setSearchedBooks([])
        }
    }, [searchTerm])

    return (
        <Fragment>
            <Routes>
                <Route
                    path="/"
                    element={< Login setUser = {
                    setUser
                } />}/>
                <Route path="/register" element={< Register />}/>
                <Route
                    path="/home"
                    element={user
                    ? (<Layout
                        handleModeToggle={handleModeToggle}
                        setSearchedBooks={setSearchedBooks}
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                        setUser={setUser}/>)
                    : (<Navigate to="/"/>)}>
                    <Route
                        index
                        element={< Home user = {
                        user
                    }
                    setUser = {
                        setUser
                    } />}/>
                    <Route
                        path="/home/recommend"
                        element={< Recommend setUser = {
                        setUser
                    } />}/>
                    <Route
                        path="/home/browse"
                        element={< Browse user = {
                        user
                    }
                    setUser = {
                        setUser
                    }
                    searchedBooks = {
                        searchedBooks
                    }
                    searchTerm = {
                        searchTerm
                    } />}/>
                    <Route
                        path="/home/my-books"
                        element={< MyBooks user = {
                        user
                    }
                    setUser = {
                        setUser
                    } />}/>
                </Route>
            </Routes>
        </Fragment>
    );
}

export default App
