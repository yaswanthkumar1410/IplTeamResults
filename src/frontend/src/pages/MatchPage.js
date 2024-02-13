import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import RecentMatchComponent from "../components/RecentMatchComponent";
import './Matchpage.scss'
import { YearSelector } from "../components/YearSelector";

export const MatchPage = () =>{
    const[matches, setMatches] = useState([])
    const {teamName, year} = useParams();
    const[filter, setFilter] = useState("all")
    const[filteredMatches, setFilteredMatches]= useState([])
    useEffect(
        () => {
            const fetchMatches = async() => {
                try{
                    const response = await fetch(`http://localhost:8080/teams/${teamName}/matches?year=${year}`)
                    const data = await response.json()
                    setMatches(data)
                    console.log(data)
                    console.log(teamName)
                }
                catch(e){
                    console.log(e)
                }
            }
            fetchMatches();
           

        },[teamName, year, filter]
    )
    useEffect(() => {
        // Filter matches based on the selected filter
        if (filter === "win") {
            setFilteredMatches(matches.filter(match => teamName === match.matchWinner));
        } else if (filter === "loss") {
            setFilteredMatches(matches.filter(match => teamName !== match.matchWinner));
        } else {
            setFilteredMatches(matches);
        }
    }, [teamName, matches, filter]);

        
        const handleFilterClick= (filter) => {
            setFilter(filter);
        }

    return(
        <div className="MatchPage">
            <p className="home-section"><Link to={'/'}>Home</Link></p>
            <h1 className="heading">{teamName}</h1>
            <div className="year-selector">
                <h4>Years</h4>
                <YearSelector teamName={teamName} year={year}/>
                <h4>Select Matches Filter</h4>
                <button onClick={() => handleFilterClick("win")}>Wins</button><br></br>
                <button onClick={() => handleFilterClick("loss")}>loss</button><br></br>
                <button onClick={() => handleFilterClick("all")}>All</button><br />
            </div>
            <div>
                {filteredMatches.map(match=>(
                    <RecentMatchComponent key={match.id} match={match} teamName={teamName}/>
                    ))}
            </div>
        </div>
    )
}