import React, { Component } from 'react';
import { auth, googleProvider } from '../../Firebase/Firebase';

export default class Login extends Component {

  constructor() {
    super();
  }

  doLogin(e) {
    e.preventDefault();
    console.log("AQUI");

    // auth.signInWithRedirect(googleProvider)
    //   .catch(error => {
    //     console.log("Error: ", error);
    //     localStorage.removeItem("firebasexGH")
    //   });

    //   localStorage.setItem("firebasexGH", "1");
  }

  render() {
    return(
      <div>
        <button onClick={this.doLogin.bind(this)}>Teste</button>
      </div>
    );
  }
}