import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className='home'>
            <h1>AI Meditation</h1>
            <p className='description'>Experience the power of AI-powered meditation with our immersive web experience. Our program is designed to bring greater awareness and clarity to your life, helping you achieve a new level of inner peace. Let's take your relaxation to the next level.</p>
            <Link to={'/meditate'}>
                <button>START</button>
            </Link>
        </div>
    );
};

export default Home;