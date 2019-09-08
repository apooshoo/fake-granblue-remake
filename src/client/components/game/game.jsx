import React from 'react';

import styles from './style.scss';
import Enemies from './game';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
        enemies: []
    }
  }

  mainMode(){
    this.props.mainMode();
  }

  generateEnemy(coords){
    console.log("target coords", coords)
    let {top, left, ...others} = coords;
    let enemy = {
        top: top,
        left: left
    }
    console.log('generating enemy:', enemy)

    this.setState({enemies: [...this.state.enemies].concat(enemy)})
  }

  componentDidMount(){
    let lanesArr = document.querySelectorAll('.lane')
    // let y = x[0].getBoundingClientRect()
    // console.log(y)
    let coordsArr = [];
    [...lanesArr].map(lane => {
        let coords = lane.getBoundingClientRect();
        coordsArr.push(coords)
    })
    // .getBoundingClientRect();
    console.log(coordsArr)
    this.generateEnemy(coordsArr[0])
  }

  componentDidUpdate(){
    console.log('game state:', this.state.enemies)
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


    let generateEnemies;
    console.log('step1')
    if(this.state.enemies.length > 0){
        console.log('step2')
        generateEnemies = [...this.state.enemies].map((enemy, index) => {
            // return <Enemy key={index} enemy={enemy[index]}/>
             return <p key={index} enemy={enemy[index]}>enemyhere</p>
        });
    } else {
        console.log('no enemies')
    }


    return(
        <React.Fragment>
            <button onClick={()=>{this.mainMode()}}>back to main</button>
            <p>GAME MODE</p>
            <div className={styles.lanesContainer}>
                {generateLanes}
            </div>
            <div>
                {generateEnemies}
            </div>



        </React.Fragment>
    );

  }

}

export default Game;