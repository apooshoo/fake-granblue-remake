import React from 'react';

import styles from './style.scss';
import Enemies from './enemies';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
    }
  }

  mainMode(){
    this.props.mainMode();
  }

  render() {
    let counter = 0;
    let styleArr= [
        {
            backgroundColor: 'red',
            height: 100,
            margin: 10
        },
        {
            backgroundColor: 'blue',
            height: 100,
            margin: 10
        },
        {
            backgroundColor: 'yellow',
            height: 100,
            margin: 10
        }
    ];
    console.log("styleArr", styleArr)

    let lanesArr = [];
    [...this.props.partyList].map((char, index) => {
        let className = 'lane lane'+(index+1)
        if(char === null){
                lanesArr.push(
                    <div key={index} className={className} style={styleArr[index]}>
                        <p>Empty Lane Here at Index {index}</p>
                    </div>
                )
        } else {
            lanesArr.push(
                <div key={index} className={className} style={styleArr[index]}>
                    <p>{char.name}'s lane here at Index {index}</p>
                </div>
            )

        };

    });
    console.log("lanesArr", lanesArr)
    let generateLanes = lanesArr.map(lane => {
        return lane;
    })





    return(
        <React.Fragment>
            <button onClick={()=>{this.mainMode()}}>back to main</button>
            <p>GAME MODE</p>
            <div className={styles.lanesContainer}>
                {generateLanes}
            </div>
            <React.Fragment>
                <Enemies/>
            </React.Fragment>



        </React.Fragment>
    );

  }

}

export default Game;