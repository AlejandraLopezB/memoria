import React from "react"
import homeNavStyles from "./homeNav.module.css"
import { Link } from "gatsby"

export default function HomeNav() {
    return (
        <Link to="/" style={{ display: `table`}}>
            <h1 className={homeNavStyles.homeNav}>HOME</h1>
        </Link>
    )
}