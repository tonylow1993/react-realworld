import ChallengePreview from './ChallengePreview';
import ListPagination from './ListPagination';
import React from 'react';

const ChallengeList = props => {
  if (!props.challenges) {
    return (
      <div className="challenge-preview">Loading...</div>
    );
  }

  if (props.challenges.length === 0) {
    return (
      <div className="challenge-preview">
        No challenges are here... yet.
      </div>
    );
  }

  return (
    <div>
      {
        props.challenges.map(challenge => {
          return (
            <ChallengePreview challenge={challenge} key={challenge.slug} />
          );
        })
      }

      <ListPagination
        pager={props.pager}
        challengesCount={props.challengesCount}
        currentPage={props.currentPage} />
    </div>
  );
};

export default ChallengeList;
