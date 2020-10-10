import React from "react" 
import menuGroupContainerStyles from "./menu-group-container.module.css"

export default function MenuGroupContainer({ children }) {
    return (
        <div className={menuGroupContainerStyles.menuGroupContainer}>
            { children }
        </div>
    )
}


