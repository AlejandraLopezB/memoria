import React from "react"
import footerStyles from "./footer.module.css"

export default function Footer() {
	return (
        <div style={{ position: `fixed`, bottom: `0`, width: `95%`}}>
            <div className={footerStyles.footer}>
                <div className={footerStyles.footerItem + ' ' + footerStyles.footerOne}></div>
                <div className={footerStyles.footerItem + ' ' + footerStyles.footerTwo}>
                    <p>Datos obtenidos del Congreso Nacional de Chile desde enero del 2015 hasta junio del 2018</p>
                </div>
                <div className={footerStyles.footerItem + ' ' + footerStyles.footerThree}>
                    <p style={{ display: `flex`, justifyContent: `flex-end`}}>versión 0.1.0</p>
                </div>
            </div>
        </div>
    )
}