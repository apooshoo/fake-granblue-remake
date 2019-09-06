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