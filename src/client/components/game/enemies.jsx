import React from 'react';

import styles from './style.scss';

class Enemies extends React.Component {
  constructor() {
    super();
    this.state = {
        enemies: []
    }
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
    console.log('step2')
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

  render() {
    console.log('step1')
    let generateEnemies;
    if(this.state.enemies.length > 0 && this.state.enemies != undefined){
        generateEnemies = [...this.state.enemies].map((enemy, index) => {
            // return <Enemy key={index} enemy={enemy[index]}/>
             return <p key={index}>enemyhere</p>
        });
    } else {
        return <p>NO ENEMIES FOUND</p>
    }

    return(
        <React.Fragment>
            {generateEnemies}
        </React.Fragment>

    );

  }
}

export default Enemies;