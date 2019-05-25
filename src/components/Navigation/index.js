import React from 'react';
import { Link } from 'react-router-dom';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';
import './navigation.scss'
import logo from '../../img/google-translate-500x260.png'

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <NavigationAuth authUser={authUser} />
      ) : (
        <NavigationNonAuth />
      )
    }
  </AuthUserContext.Consumer>
);

const NavigationAuth = ({ authUser }) => (
    <div className="header">
		<img src={logo} alt="" className="logo"/>
		<input className="menu-btn" type="checkbox" id="menu-btn"/>
		<label className="menu-icon" htmlFor="menu-btn">
			<span class="navicon"></span></label>
      <ul className="menu">
        <li>
          <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
          <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
          <li>
              <Link to={ROUTES.FLASHCARDS}>Flashcards</Link>
          </li>
        {authUser.roles.includes(ROLES.ADMIN) && (
          <li>
            <Link to={ROUTES.ADMIN}>Admin</Link>
          </li>
        )}
        <li>
          <SignOutButton />
        </li>
      </ul>
	</div>

);

const NavigationNonAuth = () => (
    <div className="header">
		<img src={logo} alt="" className="logo"/>
		<input className="menu-btn" type="checkbox" id="menu-btn"/>
		<label className="menu-icon" htmlFor="menu-btn">
            <span class="navicon"></span></label>
      <ul className="menu">
        <li>
          <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
          <Link to={ROUTES.SIGN_IN}>Sign In</Link>
        </li>
      </ul>
	</div>
);

export default Navigation;
