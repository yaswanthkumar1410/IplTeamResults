import React from "react";
import { Link } from "react-router-dom";
import './YearSelector.scss'

export const YearSelector = ({teamName}) => {

    let years = []
    const startYear = parseInt(process.env.REACT_APP_YEAR_START, 10);
    const endYear = parseInt(process.env.REACT_APP_YEAR_END, 10);

    for (let i = startYear; i <= endYear; i++) {
        years.push(i)
    }

    return (
        <div className="YearSelector">
            <ol>
                {
                    years.map(year =>( <li><Link to={`/teams/${teamName}/matches/${year}`}>{year}</Link></li>))
                }
            </ol>
        </div>
    )
}
