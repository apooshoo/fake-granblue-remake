import React from 'react';

import styles from './style.scss';

class Enemies extends React.Component {
  constructor() {
    super();
    this.state = {
        enemiesTransform: [],
        enemies: [],
        laneCoords: []
    }
  }

  generateEnemy(){
    let randomLaneIndex = Math.floor(Math.random()*this.state.laneCoords.length)
    let randomLaneCoords = this.state.laneCoords[randomLaneIndex]
    console.log('targeting lane:', randomLaneIndex+1);
    console.log('lane coords:', randomLaneCoords)
    let {top, left, height, ...others} = randomLaneCoords;
    let enemyTransform = {
        x: 1000,
        duration: 10
    }
    let enemy = <div
                    style={{
                        position: 'absolute',
                        top: top,
                        left: left,
                        height: height,
                        width: 100,
                        backgroundColor:'green',
                        transform: `translateX(${enemyTransform.x}px)`,
                        transition: `transform ${enemyTransform.duration}s`,
                    }}
                />



    console.log('generating enemy:', enemy);
    this.setState({
        enemies: [...this.state.enemies].concat(enemy),
        enemiesTransform: [...this.state.enemiesTransform.concat(enemyTransform)]
    })


  }

  componentDidMount(){
    let lanesArr = document.querySelectorAll('.lane')
    let coordsArr = [];
    [...lanesArr].map(lane => {
        let coords = lane.getBoundingClientRect();
        coordsArr.push(coords)
    })
    this.setState({laneCoords: coordsArr});

  }

  componentDidUpdate(){
    console.log("state in enemies:", this.state);
  }

   // .attackingEnemy{
                //     transition: all 10s linear;
                //     transform: translateX(1000px);
                // }

  render() {
    let generateEnemies;
    let enemiesToGenerate = [...this.state.enemies]
    if(enemiesToGenerate.length > 0){
        generateEnemies = enemiesToGenerate.map(enemy => {
            return enemy

        });
    } else {
        console.log('no enemies found')
    }



    return(
        <React.Fragment>
            onKeyDown={(event)=>{this.uniKeyCode(event)}}
            <button onClick={()=>{this.generateEnemy()}}>GENERATE ENEMIES BTN</button>
            <React.Fragment>
                {generateEnemies}
            </React.Fragment>
        </React.Fragment>

    );

  }
}

export default Enemies;