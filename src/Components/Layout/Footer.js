import React, { Component } from 'react';

export default class Footer extends Component {
  render() {
    return(
      <footer className="footer">
        Desenvolvido com &nbsp;<span style={{color: '#f00', fontSize: 1.5 + 'rem'}}>&hearts;</span>&nbsp; e muito xGH por  &lt;DevTeam /&gt;
      </footer>
    );
  }
}