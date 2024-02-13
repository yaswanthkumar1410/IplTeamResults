import { useEffect, useState } from "react"
import { TeamTile } from "../components/TeamTile"
import './Homepage.scss'

export const Homepage = () =>{
    const[teams, setTeams] = useState([])
    useEffect(
        () => {
            const fetchTeams =async() =>{
                const response = await fetch("http://localhost:8080/teams")
                const data = await response.json()
                setTeams(data)
            }
            fetchTeams()
        },[]
    )
    if(teams == null) return(<div>Loading...</div>)
    return(
        <div className="Homepage">
            <h1>Ipl Teams</h1>
            <div className="team-grid">
                {teams.map(team => <TeamTile key={team.id} teamName={team.teamName}/>)}
            </div>
        </div>

    )
}