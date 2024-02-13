import './TeamTile.scss'
import { Link } from 'react-router-dom'

// Your React component
export const TeamTile = ({ teamName }) => {
    

    return (
        <div className={`TeamTile`}>
            <h1 className='team-name'>
                <Link to={`teams/${teamName}`}>{teamName}</Link>
            </h1>
        </div>
    );
};
