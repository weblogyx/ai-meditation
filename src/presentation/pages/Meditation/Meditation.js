import './Meditation.css';
import medImg from '../../assets/meditation.png';
import { useState } from 'react';
import { GenerateImage, GetGeneration } from '../../../data/apis/StableDiffusion';
import { WaitSeconds } from '../../../utilities/Wait';

const Meditation = () => {
    const [happyPlace, setHappyPlace] = useState('');
    const [currentImg, setCurrentImg] = useState(medImg);
    const [state, setState] = useState(0);
    /** States
     * 0: Just starting, no happy place yet
     * 1: Loading happy place
     * 2: Happy place loaded
     */

    const happyPlaceUpdated = ({target}) => {
        setHappyPlace(target.value);
    }
    const handleContinue = async () => {
        if(happyPlace!=='') {
            setState(1);
            const generation = await GenerateImage(happyPlace);
            if(generation) {
                console.log('Image generated');
                await WaitSeconds(8000);
                let generatedImg = await GetGeneration(generation);

                const setGeneratedImage = async(iteration) => {
                    if(generatedImg.status==='processing'||generatedImg.status==='starting') {
                        if(iteration<3) {
                            console.log(`Iteration ${iteration} processing`);
                            iteration += 1;
                            await WaitSeconds(4000);
                            generatedImg = await GetGeneration(generation);
                            setGeneratedImage(iteration);
                        }
                        else {
                            console.log('Timeout');
                        }
                    }
                    else if(generatedImg.status==='succeeded') {
                        const output = generatedImg.output[0];
                        setState(2);
                        setCurrentImg(output);
                    }
                    else {
                        console.log('ERROR');
                        console.log(generatedImg);
                    }
                };
                setGeneratedImage(0);
            }
            else {
                console.log('Image not generated');
            }
        }
        else {
            window.alert('Remember to write down your happy place.');
        }
    }

    return (
        <div className='meditation'>
            <p className='mainInstruction'>Sit down in a comfortable position.</p>
            <img src={currentImg} alt='Happy place' />
            {
                state===0?
                    <>
                        <input type={'text'} placeholder={'Write down your happy place'} onChange={happyPlaceUpdated}/>
                        <button onClick={handleContinue}>Continue</button>
                    </>
                    :
                    state===1?
                        <p>Loading...</p>
                        :
                        <div className='happyPlaceText'>
                            <p>Your happy place is your main fuel of energy. When you feel low, close your eyes and visualize it. Breathe deeply and travel in your mind to that special place.</p>
                            <p>Being there spiritually will give you the strength and motivation to keep going in life.</p>
                            <p>Enjoy.</p>
                        </div>
                        
            }
        </div>
    );
};

export default Meditation;