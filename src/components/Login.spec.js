import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { Login } from './Login';

//Component unit test
describe('<Login />', () => {
  it('renders email and password field', () => {
    const login = shallow(<Login/>);
    expect(login.find('input[type="email"]')).to.have.length(1);
    expect(login.find('input[type="password"]')).to.have.length(1);
  });
});