import React, { Component } from 'react';
import { Header, Footer } from './Layout';
import { ToastContainer, Flip } from 'react-toastify';

import '../Content/css/custom.css';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />

        <main className="main">
          {this.props.children}
        </main>

        <Footer />

        <ToastContainer autoClose={ 4000 } hideProgressBar={ true } position="top-center" transition={ Flip } />
      </div>
    );
  }
}

export default App;
