import React from 'react';
import { Link } from 'react-router-dom';
import './recentmatch.scss'

const RecentMatchComponent = ({ teamName, match }) => {
  if (!match) {
    return <div>No match data available.</div>
  }

  const { team1, team2 } = match;
  const otherTeamName = teamName === team1 ? team2 : team1
  const otherTeamRoute = `/teams/${otherTeamName}`
  const firstInningsTeam = `/teams/${match.team1}`
  const secondInningsTeam = `/teams/${match.team2}`
  const isMatchWon = teamName === match.matchWinner
  const teamJoin = teamName.replace(/ /g,"_");

  const classNameVar = isMatchWon ? `RecentMatch others ${teamJoin}` : 'RecentMatch lost-card'

  return (
    <div className={classNameVar}>
      <div className='main-match-info-section'>
        <h3>Latest Matches</h3>
        <h4>vs <Link className="team-name" to={otherTeamRoute}>{otherTeamName}</Link></h4>
        <h4 className='match-date'>on {match.date}</h4>
        <h4 className='match-venue'>at {match.venue} {match.matchWinner} won by {match.resultMargin} {match.result}</h4>
      </div>
      <div className='other-info-section'>
        <h4>First Innings</h4>
        <h4><Link className="team-name" to={firstInningsTeam}>{match.team1}</Link></h4>
        <h4>Second Innings</h4>
        <h4><Link className="team-name" to={secondInningsTeam}>{match.team2}</Link></h4>
        <h4>Man of the match</h4>
        <p>{match.playerOfMatch}</p>
        <h4>Umpires</h4>
        <p>{match.umpire1}, {match.umpire2}</p>
      </div>
    </div>
  );
};

export default RecentMatchComponent;
