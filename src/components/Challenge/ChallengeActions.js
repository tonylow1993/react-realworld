import { Link } from 'react-router';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import { DELETE_CHALLENGE } from '../../constants/actionTypes';

const mapDispatchToProps = dispatch => ({
  onClickDelete: payload =>
    dispatch({ type: DELETE_CHALLENGE, payload })
});

const ChallengeActions = props => {
  const challenge = props.challenge;
  const del = () => {
    props.onClickDelete(agent.Challenges.del(challenge.slug))
  };
  if (props.canModify) {
    return (
      <span>

        <Link
          to={`/editor/${challenge.slug}`}
          className="btn btn-outline-secondary btn-sm">
          <i className="ion-edit"></i> Edit Challenge
        </Link>

        <button className="btn btn-outline-danger btn-sm" onClick={del}>
          <i className="ion-trash-a"></i> Delete Challenge
        </button>

      </span>
    );
  }

  return (
    <span>
    </span>
  );
};

export default connect(() => ({}), mapDispatchToProps)(ChallengeActions);
