import {
  CHALLENGE_FAVORITED,
  CHALLENGE_UNFAVORITED,
  SET_PAGE,
  APPLY_TAG_FILTER,
  HOME_PAGE_LOADED,
  HOME_PAGE_UNLOADED,
  CHANGE_TAB,
  PROFILE_PAGE_LOADED,
  PROFILE_PAGE_UNLOADED,
  PROFILE_FAVORITES_PAGE_LOADED,
  PROFILE_FAVORITES_PAGE_UNLOADED
} from '../constants/actionTypes';

export default (state = {}, action) => {
  switch (action.type) {
    case CHALLENGE_FAVORITED:
    case CHALLENGE_UNFAVORITED:
      return {
        ...state,
        challenges: state.challenges.map(challenge => {
          if (challenge.slug === action.payload.challenge.slug) {
            return {
              ...challenge,
              favorited: action.payload.challenge.favorited,
              favoritesCount: action.payload.challenge.favoritesCount
            };
          }
          return challenge;
        })
      };
    case SET_PAGE:
      return {
        ...state,
        challenges: action.payload.challenges,
        challengesCount: action.payload.challengesCount,
        currentPage: action.page
      };
    case APPLY_TAG_FILTER:
      return {
        ...state,
        pager: action.pager,
        challenges: action.payload.challenges,
        challengesCount: action.payload.challengesCount,
        tab: null,
        tag: action.tag,
        currentPage: 0
      };
    case HOME_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager,
        tags: action.payload[0].tags,
        challenges: action.payload[1].challenges,
        challengesCount: action.payload[1].challengesCount,
        currentPage: 0,
        tab: action.tab
      };
    case HOME_PAGE_UNLOADED:
      return {};
    case CHANGE_TAB:
      return {
        ...state,
        pager: action.pager,
        challenges: action.payload.challenges,
        challengesCount: action.payload.challengesCount,
        tab: action.tab,
        currentPage: 0,
        tag: null
      };
    case PROFILE_PAGE_LOADED:
    case PROFILE_FAVORITES_PAGE_LOADED:
      return {
        ...state,
        pager: action.pager,
        challenges: action.payload[1].challenges,
        challengesCount: action.payload[1].challengesCount,
        currentPage: 0
      };
    case PROFILE_PAGE_UNLOADED:
    case PROFILE_FAVORITES_PAGE_UNLOADED:
      return {};
    default:
      return state;
  }
};
