import React from "react"
import footerStyles from "./footer.module.css"
import githubLogo from "../../public/GitHub-Mark/PNG/GitHub-Mark-Light-32px.png"
import linkedinLogo from "../../public/LinkedIn-Logos/linkedin-4-32.png"

export default function Footer() {
	return (
        <div style={{ position: `fixed`, bottom: `0`, width: `95%`}}>
            <div className={footerStyles.footer}>
                <div className={footerStyles.footerItem + ' ' + footerStyles.footerOne}>
                    <a href="https://github.com/AlejandraLopezB/memoria" target="_blank" rel="noopener noreferrer">
                        <img src={githubLogo} style={{ width: `17px`, marginRight: `0.3em`}} alt="Github Logo" />
                    </a>
                    <a href="https://www.linkedin.com/in/alejandralopezbalboa" target="_blank" rel="noopener noreferrer">
                        <img src={linkedinLogo} style={{ width: `17px`, marginRight: `0.3em`}} alt="Linkedin Logo" />
                    </a>
                    <p>Creado por Alejandra López Balboa</p>
                </div>
                <div className={footerStyles.footerItem + ' ' + footerStyles.footerTwo}>
                    <p>Datos obtenidos del Congreso Nacional de Chile desde enero del 2015 hasta junio del 2018</p>
                </div>
                <div className={footerStyles.footerItem + ' ' + footerStyles.footerThree}>
                    <p style={{ display: `flex`, justifyContent: `flex-end`, marginLeft: `6em`}}>versión alpha</p>
                </div>
            </div>
        </div>
    )
}