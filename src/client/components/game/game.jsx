import React from 'react';

import styles from './style.scss';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
        lane1: {}
    }
  }

  mainMode(){
    this.props.mainMode();
  }


  render() {
    let generateLane = [...this.props.partyList].map((char, index) => {
        if(char === null){
            return (
                <div key={index}>
                    <p>Empty Lane Here at Index {index}</p>
                </div>
            )
        } else {
            return (
                <div key={index}>
                    <p>{char.name}'s lane here at Index {index}</p>
                </div>
            )
        };
    });

    return(
        <React.Fragment>
            <button onClick={()=>{this.mainMode()}}>back to main</button>
            <p>GAME MODE</p>
            <div>
                {generateLane}
            </div>

        </React.Fragment>
    );

  }

}

export default Game;