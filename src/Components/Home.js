import { useState, useEffect } from "react";
import MusicCard from "./MusicCard";
import MusicContainer from "./MusicContainer";
import MusicPlayer from "./MusicPlayer";
import {useMusic} from '../Provider/MusicProvider';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [musicList, setMusicList] = useState([
    { title: "Trending Songs", data: [], type: "song", action: "trendSong" },
    { title: "New Release", data: [], type: "song", sort: { "release": 1 }, action: "newRelease" },
    { title: "Let's Party", data: [], type: "song", mood: "happy", action: "happy" },
    { title: "Top Romantic", data: [], type: "song", mood: "romantic", action: "romantic" },
    { title: "Heal Your Hearts", data: [], type: "song", mood: "sad", action: "sad" }
  ]);

  const {musicPlayer} = useMusic();

  function setMusicData({type, payload}) {
    let updatedMusicList = musicList.map((eMusic) => {
      if(eMusic.action === type)
        eMusic.data = payload;
      return eMusic;
    })

    setMusicList(updatedMusicList);
  }

  const fetchMusic = async () => {
    try {
      setIsLoading(true);

      // make an api call
      musicList.map((eMusic) => {
          if (eMusic.mood) {
            fetch(`https://academics.newtonschool.co/api/v1/music/${eMusic.type}?filter={"mood":"${eMusic.mood}"}`, {
              headers: {
                'projectId': '3adcv0i849w8'
              }
            })
            .then((response) => response.json())
            .then((result) => {
              setMusicData({ type: eMusic.action, payload: result.data })
            })
            .catch((err) => console.warn(err))
          }
          else if (eMusic.sort) {
            fetch(`https://academics.newtonschool.co/api/v1/music/${eMusic.type}?sort={"release":1}`, {
              headers: {
                'projectId': '3adcv0i849w8'
              }
            })
            .then((response) => response.json())
            .then((result) => {
              setMusicData({ type: eMusic.action, payload: result.data })
            })
            .catch((err) => console.warn(err))
          }
          else {
            fetch(`https://academics.newtonschool.co/api/v1/music/${eMusic.type}`, {
              headers: {
                'projectId': '3adcv0i849w8'
              }
            })
            .then((response) => response.json())
            .then((result) => {
              setMusicData({ type: eMusic.action, payload: result.data })
            })
            .catch((err) => console.warn(err))
          }
      });

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMusic();
  }, []);

  return (
    <div className="pages">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        musicList && 
        <section>
          {/* {musicList.map((eMusic, idx) => <MusicCard key={idx} {...eMusic} />)} */}
          {musicList.map(eMusicType => <MusicContainer musicList={eMusicType} /> )}

          { musicPlayer === "active" && <MusicPlayer />}
        </section>
      )}
    </div>
  );
}
