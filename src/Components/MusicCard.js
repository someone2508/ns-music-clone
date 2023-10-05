import React from "react";
import style from "./MusicCard.module.css";
import { useMusic } from "../Provider/MusicProvider";

export default function MusicCard(props) {
  const { musicDispatch } = useMusic();
  // console.log("ADnhmm here!")
  // console.log(props);
  let { title, thumbnail, artist } = props;
  title = title.substring(0, 20) + "...";
  const artistList = artist.map((item) => item.name).join(" & ");


  return (
    <section
      className={style.musicCard}
      onClick={() => musicDispatch({type: "setMusicId", payload: props._id})}
    >
      <img
        src={thumbnail}
        alt={title}
        height="210"
        width="200"
        className={style.bannerImg}
      />
      <div>{title}</div>
      <div className={style.artist} title={artistList}>
        {artistList}
      </div>
    </section>
  );
}
