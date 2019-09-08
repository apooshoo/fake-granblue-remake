import React from 'react';

import styles from './style.scss';

class Enemies extends React.Component {
  constructor() {
    super();
    this.state = {
        enemies: [],
        laneCoords: []
    }
  }

  generateEnemy(){
    let randomLaneIndex = Math.floor(Math.random()*this.state.laneCoords.length)
    let randomLaneCoords = this.state.laneCoords[randomLaneIndex]
    console.log('targeting lane:', randomLaneIndex+1);
    let {top, left, ...others} = randomLaneCoords;
    let enemy = {
        active: true,
        top: top,
        left: left
    }
    console.log('generating enemy:', enemy);

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
    // console.log(coordsArr)
    this.setState({laneCoords: coordsArr});

  }

  componentDidUpdate(){
    console.log("state in enemies:", this.state);
  }

  render() {
    let generateEnemies;
    if(this.state.enemies.length > 0){
        generateEnemies = [...this.state.enemies].map((enemy, index) => {
            // return <Enemy key={index} enemy={enemy[index]}/>
             return <p key={index}>enemyhere</p>
        });
    } else {
        console.log('no enemies found')
    }



    return(
        <React.Fragment>
            <button onClick={()=>{this.generateEnemy()}}>GENERATE ENEMIES BTN</button>
            <React.Fragment>
                {generateEnemies}
            </React.Fragment>
        </React.Fragment>

    );

  }
}

export default Enemies;