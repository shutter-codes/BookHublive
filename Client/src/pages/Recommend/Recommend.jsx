import {useEffect, useRef, useState} from "react";
import "./index.css"
import axios from "axios"
import {useNavigate} from "react-router-dom"
import {AiOutlinePlus} from 'react-icons/ai'
import {HiOutlineChevronUp, HiOutlineChevronDown} from "react-icons/hi";
import TextInput from "../../components/UI/TextInput";

const inputFields = [
    {
        label: "Book title",
        name: "book-title",
        type: "text",
        state: "title"
    }, {
        label: "Author's name",
        name: "author-name",
        type: "text",
        state: "authorName"
    },
];

const Recommend = () => {

    const [formData,
        setFormData] = useState({title: "", authorName: ""});
    const [review,
        setReview] = useState("")
    const [file,
        setFile] = useState(null)
    const [photoError,
        setPhotoError] = useState(false)
    const [isListOpened,
        setIsListOpened] = useState(false)
        const photoRef = useRef()
        const navigate = useNavigate()
        
        const handleInputChange = (e, stateName) => {
            setFormData({
                ...formData,
                [stateName]: e.target.value
            });
        };
        
        const genresInitial = [
        {
            id: 1,
            label: "Personal Development"
        }, {
            id: 2,
            label: "Communication"
        }, {
            id: 4,
            label: "Finance"
        }, {
            id: 5,
            label: "Productivity"
        }, {
            id: 6,
            label: "Design"
        }, {
            id: 7,
            label: "Marketing"
        }, {
            id: 8,
            label: "Biography"
        }
    ];

    const [genres,
        setGenres] = useState(genresInitial);
    
    const handleCheckboxChange = (id) => {
        const updatedItems = genres.map((item) => item.id === id
            ? {
                ...item,
                checked: !item.checked
            }
            : item);
        setGenres(updatedItems);
    };

    const handleSubmit = async(e) => {
        e.preventDefault()

        if (!file) {
            setPhotoError(true)
            setTimeout(() => {
                setPhotoError(false)
            }, 3000)
            return
        }

        let checkedGenres = genres.filter(item => {
            if (item.checked) {
                return item.label
            }
        })

        let genresToSend = checkedGenres.map(item => {
            return item.label
        })

        let newPost = {
            title: formData.title,
            author: formData.authorName,
            review,
            genres: genresToSend
        }

        let data;

        if (file) {
            data = new FormData()
            const filename = Date.now() + file.name
            data.append("name", filename)
            data.append("file", file)
            newPost.picture = filename
        }

        try {
            await axios.post("/api/upload", data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
        } catch (error) {
            console.log(error)
        }

        try {
            const response = await axios.post("/api/books", newPost, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            });
        } catch (error) {
            console.log(error)
        }

        navigate("/home/my-books")
    }

    const handlePhotoUpload = () => {
        photoRef.current.click();
    }

    const handleOpenList = () => {
        setIsListOpened(!isListOpened);
    }

    return (
        <div className="recommend">
            <div className="container">
                <div className="form">
                    <div className="title">
                        <h1>Recommend a book</h1>
                        <div className="line"></div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        {inputFields.map(({label, name, type, state}) => (<TextInput
                            key={name}
                            label={label}
                            name={name}
                            type={type}
                            value={formData[state]}
                            onChange={(e) => handleInputChange(e, state)}
                            required/>))}
                        <div className="genres-input">
                            <div className="main-checkbox">
                                <label htmlFor="genres">Genres</label>
                                <div onClick={handleOpenList} className="top">
                                    <span>Select genres</span>
                                    {isListOpened
                                        ? (<HiOutlineChevronUp size={25}/>)
                                        : (<HiOutlineChevronDown size={25}/>)}
                                </div>
                                <div className={`checkbox-list ${isListOpened && "open"}`}>
                                    {genres.map(({id, checked, label}) => (
                                        <label key={id} className="item">
                                            <input
                                                checked={checked || false}
                                                onChange={() => handleCheckboxChange(id)}
                                                type="checkbox"/>
                                            <span>{label}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="input">
                            <label htmlFor="review">Your review</label>
                            <textarea
                                onChange={(e) => setReview(e.target.value)}
                                required
                                id="review"
                                cols="10"
                                rows="6"></textarea>
                        </div>
                        <input
                            onChange={(e) => setFile(e.target.files[0])}
                            ref={photoRef}
                            type="file"
                            style={{
                            display: "none"
                        }}/>
                        <div className="photo-upload" onClick={handlePhotoUpload}>
                            Add a photo
                        </div>
                        {photoError && <p className="photo-error">A photo is required</p>}
                        <button type="submit">Submit the form</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Recommend