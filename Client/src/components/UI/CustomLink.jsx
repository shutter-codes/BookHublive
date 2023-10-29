import {Link} from "react-router-dom";

const CustomLink = ({to, onClick, className, text}) => {
    const handleClick = () => {
        if (onClick) onClick()
    };
    return (
        <Link onClick={handleClick} to={to}>
            <div className={className}>
                <button>{text}</button>
            </div>
        </Link>
    );
}

export default CustomLink