import ChallengeActions from './ChallengeActions';
import { Link } from 'react-router';
import React from 'react';

const ChallengeMeta = props => {
  const challenge = props.challenge;
  return (
    <div className="challenge-meta">
      <Link to={`@${challenge.author.username}`}>
        <img src={challenge.author.image} alt={challenge.author.username} />
      </Link>

      <div className="info">
        <Link to={`@${challenge.author.username}`} className="author">
          {challenge.author.username}
        </Link>
        <span className="date">
          {new Date(challenge.createdAt).toDateString()}
        </span>
      </div>

      <ChallengeActions canModify={props.canModify} challenge={challenge} />
    </div>
  );
};

export default ChallengeMeta;
