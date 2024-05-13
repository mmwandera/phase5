import './moduleDetails.css';

export default function ModuleDetails({ id, title, media, notes }) {
  return (
    <div className="module-details">
      {/* Check if the id is 1 */}
      {id === 1 && (
        <div>
          {/* Module title */}
          <h2>{title}</h2>
          {/* Check if the media is a video link */}
          {media.includes('http') ? (
            <div className="media">
              <iframe
                width="100%"
                height="315"
                src={media}
                title="Embedded Video"
                frameBorder="0"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            /* If not a video link, assume it's an image */
            <div className="media">
              <img src={media} alt="Module Media" />
            </div>
          )}
          <div className="notes">
            <p>{notes}</p>
          </div>
        </div>
      )}
    </div>
  );
}
