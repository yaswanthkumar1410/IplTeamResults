import { React, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom';
import RecentMatchComponent from '../components/RecentMatchComponent';
import {OtherRecentMatches} from '../components/OtherRecentMatchesComponent'
import { PieChart } from 'react-minimal-pie-chart';

import './TeamPage.scss';

export const TeamPage = () => {

    const[team, setTeam] = useState({})
    const {teamName} = useParams()
    const more = 'more>>'

    useEffect(
        () => {
            const fetchMatches = async () =>{
               try{
                const response = await fetch(`http://localhost:8080/teams/${teamName}`)
                const data = await response.json()
                setTeam(data)

                                

                console.log(data)
                
               }
               catch(error){
                console.log(error)
               }
            }
            fetchMatches();
        },[teamName]

    )
    if(!team.teamName){
        return <h1>Loading...</h1>
    }
    return (
        <div>
            <div className='home-section'>
            <p><Link to={'/'}>Home</Link></p>
            </div>            <div className = "TeamPage">
            <div className='team-name-section'>
                <h1  className='team-name'>{team.teamName}</h1>
            </div>
            <div className='win-loss-section'>
                <p className='win-loss-heading'>Win/Loss - {(team.totalWins*100/team.totalMatches).toFixed(2)}%</p>
                <PieChart
                data={[
                    { title: `lost (${((team.totalMatches - team.totalWins) * 100 / team.totalMatches).toFixed(2)}%)`, value: team.totalMatches - team.totalWins, color: 'gray' },
                    { title: `won (${(team.totalWins * 100 / team.totalMatches).toFixed(2)}%)`, value: team.totalWins, color: 'green' }
                ]}
                radius={45}
                cx={50}
                cy={50}
            />
            </div>
            <div className='latest-match-section'>
                <RecentMatchComponent key={team.matches[0].id} teamName = {team.teamName} match = {team.matches[0]}/>
            </div>
                {team.matches.slice(1).map(match => <OtherRecentMatches key={match.id} teamName = {team.teamName} match={match} />)}
            <div className='more-link'>
                <h1><Link to={`/teams/${teamName}/matches/${team.matches[0].date.slice(0,4)}`}>{more}</Link></h1>
            </div>
        </div>
        </div>
        
    )
};