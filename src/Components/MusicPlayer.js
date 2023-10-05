import { useEffect, useRef, useState } from 'react';
import {useMusic} from '../Provider/MusicProvider';
// INSTALL required dependencies and import the required icons.
import PauseRoundedIcon from '@mui/icons-material/PauseRounded';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import SkipPreviousRoundedIcon from '@mui/icons-material/SkipPreviousRounded';
import SkipNextRoundedIcon from '@mui/icons-material/SkipNextRounded';
import CancelRoundedIcon from '@mui/icons-material/CancelRounded';

// install use-sound and import
import useSound from 'use-sound';

const defaultAudio = "https://newton-project-resume-backend.s3.amazonaws.com/audio/64cf937d47ae38c3e33a5577.mp3";

export default function MusicPlayer() {
    const {musicId, musicPlayer, musicPLayStatus, musicType, musicDispatch} = useMusic();

    const isFirstRender = useRef(true);

    const [isReady, setIsReady] = useState(false)

    const [album, setAlbum] = useState({});
    const [audioUrl, setAudioUrl] = useState(defaultAudio);

    const [ play, { duration, pause, stop, sound} ] = useSound(audioUrl, {volume: 1});

    console.log(audioUrl);
    console.log(duration);


    useEffect(()=>{
        if(musicId){
            console.log(musicId);
            musicDispatch({type: "pause"});
            stop();
            setAudioUrl(defaultAudio);
            setIsReady(false);
            fetch(`https://academics.newtonschool.co/api/v1/music/song/${musicId}`,{
                headers: {
                    'projectId': '3adcv0i849w8'
                }
            })
            .then((response)=>response.json())
            .then((result)=>{
                setAlbum(result.data)
                setAudioUrl(result.data.audio_url);
                musicDispatch({type: "play"});
            })
            .catch((err)=>console.warn(err))
        }

        return () => stop();
    },[musicId]);


    useEffect(()=>{
        if(duration>150){
            if(isFirstRender.current){
                isFirstRender.current =  false
                return
            }
            play()
            if(musicPLayStatus === "play"){
                setIsReady(true)
            }
        }
        return () => stop();
    },[duration]);

    useEffect(()=>{
        if(isReady){
            if(musicPLayStatus === "play"){
                play()
            }
            else{
                pause()
            }
        }

        // return () => stop();
    },[musicPLayStatus]);

    function handlePlay() {
        musicDispatch({type: "play"})
        // play();
    }

    function handlePause() {
        // pause();
        musicDispatch({type: "pause"})
    }

    function stopMusicHandler() {
        stop();
        musicDispatch({type: "stop"});
    }



    return (
        <div className='musicPlayer'>
            <div className='musicPlayerDiv'>
                <div className='musicImage'>
                    <div className='musicImageDiv'>
                        <img className='musicImageImg'
                        src={album?.image || album?.thumbnail}/>
                    </div>
                    <div>
                        <p>{album?.title}</p>
                        <p>
                            {
                                album?.artist?.map((e)=>{
                                    return `${album.artist.length === 1 ? e.name : e.name+", "}`
                                })
                                ||album?.description
                            }</p>
                    </div>
                </div>
                <div className='musicActionButtons'>
                    <SkipPreviousRoundedIcon className='musicPrevButton' disabled/>
                    <div className='musicPlayPauseDiv'>
                        {(musicPLayStatus === "play" )&& 
                        <PauseRoundedIcon onClick={handlePause} className='musicPlayPauseButton'/> ||
                        <PlayArrowRoundedIcon onClick={handlePlay} className='musicPlayPauseButton'/>}        
                    </div>
                    <SkipNextRoundedIcon className='musicNextButton' disabled/>      
                </div>
                <div className='musicVolumeDiv'>
                    {/* <div className=''></div> */}
                    <CancelRoundedIcon className='musicPrevButton' onClick={stopMusicHandler} />
                </div>
            </div>
        </div>
    );
}