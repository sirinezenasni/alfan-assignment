import React from 'react';

import './YoutubeChannel.scss';

const YoutubeChannel = (props) => {
  const {
    imageUrl,
    title,
    subscriberCount,
    videoCount,
    viewCount,
  } = props;

  return (
    <div className="youtube-channel">
      <div className="youtube-channel__image">
        <img src={imageUrl} alt={title} />
      </div>
      <div className="youtube-channel__data-container">
        <div className="youtube-channel__title">Hi {title},</div>
        <div className="youtube-channel__stats">
          <div>{subscriberCount} Followers</div>
          <div>{videoCount} Videos</div>
          <div>{viewCount} Views</div>
        </div>
      </div>
    </div>
  );
};

export default YoutubeChannel;
