import { useState,useEffect } from "react";
export const useScroll = () =>{
    const [y, setY] = useState(window.scrollY);
    const [direction,setDirection] = useState('')
    const handleNavigation = (e:any) => {
        const window = e.currentTarget;
        if (y > window.scrollY) {
            // console.log("scrolling up");
            setDirection('up')
        } else if (y < window.scrollY) {
            // console.log("scrolling down");
            setDirection('down')
        }
        setY(window.scrollY);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleNavigation);
        return () => {
            window.removeEventListener("scroll", handleNavigation);
        };
    }, [y]);

    return direction
}