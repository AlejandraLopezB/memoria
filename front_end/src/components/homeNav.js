import React from "react"
import homeNavStyles from "./homeNav.module.css"
import HomeIcon from '@material-ui/icons/Home';
import { Link } from "gatsby"

export default function HomeNav() {
    return (
        <Link to="/">
            <h1 className={homeNavStyles.homeNav}>
                <HomeIcon fontSize="large" />
                <div style={{marginLeft: `0.2em`}}>HOME</div>
            </h1>
        </Link>
    )
}