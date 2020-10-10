import React from "react" 
import menuContainerStyles from "./menu-container.module.css"

export default function MenuContainer({ children }) {
    return (
        <div className={menuContainerStyles.menuContainer}>
            { children }
        </div>
    )
}


