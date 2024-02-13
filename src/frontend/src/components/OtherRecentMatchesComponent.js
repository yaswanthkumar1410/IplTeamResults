import { React } from 'react'
import { Link } from 'react-router-dom'
import './otherRecentMatches.scss'

export const OtherRecentMatches = ({match, teamName}) => {
    if(!match) return null
    const otherTeamName = teamName === match.team1 ? match.team2 : match.team1
    const otherTeamRoute = `/teams/${otherTeamName}`
    const isMatchWon = teamName === match.matchWinner
    const teamJoin = teamName.replace(/ /g,"_");

    const classNameVar = isMatchWon ? `RecentMatch others ${teamJoin}` : 'RecentMatch lost-card'
  
    return(
        <div className={classNameVar}>
            <h3 className='team-name'>vs <Link to={otherTeamRoute}>{otherTeamName}</Link></h3>
            <p className='match-result'>{match.matchWinner} won by {match.resultMargin} {match.result}</p>
        </div>
    )
}