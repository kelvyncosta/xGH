import React, { Component } from 'react';
import { browserHistory } from 'react-router';

import AddCoke from './AddCoke';
import PayCoke from './PayCoke';

export default class Admin extends Component {

  componentWillMount() {
    if (localStorage.getItem("xgh@auth")) {
      const local = JSON.parse(localStorage.getItem("xgh@auth"));
      const isAuthenticated = local.isAuthenticated;

      if (!isAuthenticated) 
        browserHistory.push('/login');
    }
    else {
      browserHistory.push('/login');
    }
  }

  render() {
    return(
      <div className="admin">
        <AddCoke />

        <PayCoke />
      </div>
    );
  }
}