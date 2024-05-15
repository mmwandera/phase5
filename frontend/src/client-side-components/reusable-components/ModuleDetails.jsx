import './moduleDetails.css';

export default function ModuleDetails({ id, title, media, notes }) {
  return (
    <div className="module-details">
      <div>
        {/* Module title */}
        <h2>{title}</h2>
        {/* Check if the media is a video link */}
        {media.includes('http') ? (
          <div className="media">
            <iframe
              width="560"
              height="315"
              src={media}
              title="Embedded Video"
              frameBorder="0"
              allowFullScreen
              className="media-content"
            ></iframe>
          </div>
        ) : (
          /* If not a video link, assume it's an image */
          <div className="media">
            <img src={media} alt="Module Media" className="media-content" />
          </div>
        )}
        <div className="notes" dangerouslySetInnerHTML={{ __html: notes }}></div>
      </div>
    </div>
  );
}