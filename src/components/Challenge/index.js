import ChallengeMeta from './ChallengeMeta';
import CommentContainer from './CommentContainer';
import React from 'react';
import agent from '../../agent';
import { connect } from 'react-redux';
import marked from 'marked';
import { CHALLENGE_PAGE_LOADED, CHALLENGE_PAGE_UNLOADED } from '../../constants/actionTypes';

const mapStateToProps = state => ({
  ...state.challenge,
  currentUser: state.common.currentUser
});

const mapDispatchToProps = dispatch => ({
  onLoad: payload =>
    dispatch({ type: CHALLENGE_PAGE_LOADED, payload }),
  onUnload: () =>
    dispatch({ type: CHALLENGE_PAGE_UNLOADED })
});

class Challenge extends React.Component {
  componentWillMount() {
    this.props.onLoad(Promise.all([
      agent.Challenges.get(this.props.params.id),
      agent.Comments.forChallenge(this.props.params.id)
    ]));
  }

  componentWillUnmount() {
    this.props.onUnload();
  }

  render() {
    if (!this.props.challenge) {
      return null;
    }

    const markup = { __html: marked(this.props.challenge.body, { sanitize: true }) };
    const canModify = this.props.currentUser &&
      this.props.currentUser.username === this.props.challenge.author.username;
    return (
      <div className="challenge-page">

        <div className="banner">
          <div className="container">

            <h1>{this.props.challenge.title}</h1>
            <ChallengeMeta
              challenge={this.props.challenge}
              canModify={canModify} />

          </div>
        </div>

        <div className="container page">

          <div className="row challenge-content">
            <div className="col-xs-12">

              <div dangerouslySetInnerHTML={markup}></div>

              <ul className="tag-list">
                {
                  this.props.challenge.tagList.map(tag => {
                    return (
                      <li
                        className="tag-default tag-pill tag-outline"
                        key={tag}>
                        {tag}
                      </li>
                    );
                  })
                }
              </ul>

            </div>
          </div>

          <hr />

          <div className="challenge-actions">
          </div>

          <div className="row">
            <CommentContainer
              comments={this.props.comments || []}
              errors={this.props.commentErrors}
              slug={this.props.params.id}
              currentUser={this.props.currentUser} />
          </div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Challenge);
