import React, { Component } from 'react';
import goHorse from '../../Content/img/xgh.jpg';

export default class Header extends Component {
  render() {
    return(
      <header className="header">
        <div className="header__logo">
          <img alt="Zema" src={goHorse} />
        </div>

        <div className="header__name">
          <h1>eXtreme Go Horse</h1>
        </div>

        <ul className="header__menu">
          <li>Ranking</li>
        </ul>
      </header>
    );
  }
}