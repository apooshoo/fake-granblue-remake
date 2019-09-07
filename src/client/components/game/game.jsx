import React from 'react';

import styles from './style.scss';

class Game extends React.Component {
  constructor() {
    super();

  }

  mainMode(){
    this.props.mainMode();
  }


  render() {
    return(
        <React.Fragment>
            <button onClick={()=>{this.mainMode()}}>back to main</button>
            <p>GAME MODE</p>
        </React.Fragment>
    );

  }

}

export default Game;