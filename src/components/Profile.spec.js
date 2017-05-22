import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';
import { FollowUserButton } from './Profile';

const props = {
    follow: sinon.spy(),
    user: {
        following: false
    }
}

//Testing click event
describe('<Profile />', () => {
    it('should call follow/unfollow if user click the follow button', () => {
        const followUserButton = shallow(<FollowUserButton {...props } />);
        followUserButton.find('button').simulate('click', {
                preventDefault: () => {}
        });
        expect(props.follow).to.have.property('callCount', 1);
    })
});