import React from 'react';
import { hot } from 'react-hot-loader';

import Main from './components/main/main';
import Form from './components/form/form';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      userId: 1
    };
  }






  render() {

    return (
      <div>
        <nav className="navbar navbar-expand-lg sticky-top d-print navbar-dark bg-dark" id="navbar">
                <a className="navbar-brand" href="/items/"><img src="/dollar.png" width="40" height="40" className="mr-3" alt=""/>Fake Granblue Fantasy</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>

        </nav>

        <Main
            userId={this.state.userId}
        />





      </div>
    );
  }
}

export default hot(module)(App);
        // <Form />

 // <Counter message={this.state.message} />