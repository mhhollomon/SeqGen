import { useAtom } from "jotai";
import {  themeIndexAtom, themes } from "~/atoms";

export default function Header() {

    const [themeIndex, setThemeIndex] = useAtom(themeIndexAtom);

    function handleClick() {
        const newIndex = (themeIndex + 1) % themes.length;
        setThemeIndex(newIndex);
        const newTheme = themes[newIndex];
        console.log(`newTheme : ${newTheme}, index : ${newIndex}`);
        document.documentElement.setAttribute('data-bs-theme', newTheme)
    }

    const nextTheme = themes[(themeIndex + 1) % themes.length];
    const iconClasses = "me-1 bi bi-" + (nextTheme === "light" ? "brightness-high-fill" : "moon-stars");

    return (
        <header className="d-flex justify-content-between align-items-center w-100 mb-3 bg-gray">
            <img src="/IMG_9131.png" width="40" height="40" className="d-inline-block align-text-top ms-3"></img>
            <p className="my-0 mx-3 align-content-center fs-3">SeqGen</p>
            <button className="btn btn-secondary mx-3 my-2" onClick={handleClick}><i className={iconClasses}></i>{nextTheme}</button>
        </header>
    );
}
