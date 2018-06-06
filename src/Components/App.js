import React, { Component } from 'react';
import { Header, Footer } from './Layout';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Header />

        <main className="main">
          {this.props.children}
        </main>

        <Footer />
      </div>
    );
  }
}

export default App;
