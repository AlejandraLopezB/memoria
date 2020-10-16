import React from "react"
import footerStyles from "./footer.module.css"

export default function Footer({ children }) {
	return (
        <div className={footerStyles.footer}>
            <p>versión 0.1.0</p>
            {children}
        </div>
    )
}