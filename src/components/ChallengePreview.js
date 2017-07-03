import React from 'react';
import { Link } from 'react-router';
import agent from '../agent';
import { connect } from 'react-redux';
import { CHALLENGE_FAVORITED, CHALLENGE_UNFAVORITED } from '../constants/actionTypes';

const FAVORITED_CLASS = 'btn btn-sm btn-primary';
const NOT_FAVORITED_CLASS = 'btn btn-sm btn-outline-primary';

const mapDispatchToProps = dispatch => ({
  favorite: slug => dispatch({
    type: CHALLENGE_FAVORITED,
    payload: agent.Challenges.favorite(slug)
  }),
  unfavorite: slug => dispatch({
    type: CHALLENGE_UNFAVORITED,
    payload: agent.Challenges.unfavorite(slug)
  })
});

const ChallengePreview = props => {
  const challenge = props.challenge;
  const favoriteButtonClass = challenge.favorited ?
    FAVORITED_CLASS :
    NOT_FAVORITED_CLASS;

  const handleClick = ev => {
    ev.preventDefault();
    if (challenge.favorited) {
      props.unfavorite(challenge.slug);
    } else {
      props.favorite(challenge.slug);
    }
  };

  return (
    <div className="challenge-preview">
      <div className="challenge-meta">
        <Link to={`@${challenge.author.username}`}>
          <img src={challenge.author.image} alt={challenge.author.username} />
        </Link>

        <div className="info">
          <Link className="author" to={`@${challenge.author.username}`}>
            {challenge.author.username}
          </Link>
          <span className="date">
            {new Date(challenge.createdAt).toDateString()}
          </span>
        </div>

        <div className="pull-xs-right">
          <button className={favoriteButtonClass} onClick={handleClick}>
            <i className="ion-heart"></i> {challenge.favoritesCount}
          </button>
        </div>
      </div>

      <Link to={`challenge/${challenge.slug}`} className="preview-link">
        <h1>{challenge.title}</h1>
        <p>{challenge.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {
            challenge.tagList.map(tag => {
              return (
                <li className="tag-default tag-pill tag-outline" key={tag}>
                  {tag}
                </li>
              )
            })
          }
        </ul>
      </Link>
    </div>
  );
}

export default connect(() => ({}), mapDispatchToProps)(ChallengePreview);
