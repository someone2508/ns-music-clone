import MusicCard from "./MusicCard";

export default function MusicContainer({musicList}) {
    return (
        <div>
            <div className="playlistContainerHeaderDiv">
                <h2 className='cardsContainerHeading'>{musicList.title}</h2>
            </div>
            <div className="musicList-container">
                {musicList.data && musicList.data.map((eMusic, idx) =>
                    <MusicCard key={idx} {...eMusic} />
                )}
            </div>
        </div>
    );
}