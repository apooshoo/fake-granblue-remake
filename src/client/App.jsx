import React from 'react';
import { hot } from 'react-hot-loader';

import Counter from './components/counter/counter';
import Form from './components/form/form';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      allCharacters: null
    };
  }


  componentDidMount(){
    var request = new XMLHttpRequest();
    var appThis = this;
    console.log('appthis:', appThis)

    request.addEventListener("load", function(){
      console.log("DONE");
      const responseData = JSON.parse( this.responseText );
      console.log( 'resdata: all characters:', responseData );
      appThis.setState({allCharacters: responseData});
    });

    request.open("GET", '/characters');
    request.send();
    // this.setState({requested:true});
  }

  componentDidUpdate(){
    console.log("State after update:", this.state);
  }

  render() {

    return (
      <div>
        Welcome.




      </div>
    );
  }
}

export default hot(module)(App);
        // <Form />

 // <Counter message={this.state.message} />