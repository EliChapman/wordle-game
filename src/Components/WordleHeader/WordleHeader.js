import './WordleHeader.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'
import { faTrophy } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const WordleHeader = () => {

    return (
        <div id="wordle-header">
            <div></div>
            <div id='header-text'>
                <Link id="title" to={'/'}>
                    <h1 id='title'>Wordle</h1>
                </Link>
            </div>
            <div id='icons'>
                <Link to={'/leaderboard'}>
                    <FontAwesomeIcon 
                        icon={faTrophy} 
                        className='icon' 
                        id='leaderboard'
                    />
                </Link>
            </div>
        </div>
    );
}

export default WordleHeader;