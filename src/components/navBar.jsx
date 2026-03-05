import {useState} from "react";
import '../css/navResponsiveContent.css';
export default function NavBar () {
    const [menuVisible, setMenuVisible] = useState (false);
    const toggleMenu = () => {
        setMenuVisible (!menuVisible);
    };
    return (
        <header className="navheader">
            <nav className="navbox">
                <a href="/" className="navlogo">Color Palette App</a>
            </nav>
        </header>
    );
}