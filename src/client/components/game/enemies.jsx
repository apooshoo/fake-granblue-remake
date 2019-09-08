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
    console.log('lane coords:', randomLaneCoords)
    let {top, left, height, ...others} = randomLaneCoords;
    let enemy = {
        active: true,
        top: top,
        left: left,
        height: height
    }
    console.log('generating enemy:', enemy);

    this.setState({enemies: [...this.state.enemies].concat(enemy)})
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

  render() {
    let generateEnemies;
    if(this.state.enemies.length > 0){
        generateEnemies = [...this.state.enemies].map((enemy, index) => {
            let {top, left, height} = enemy;
            return (
                <div
                    key={index}
                    style={{
                        position: 'absolute',
                        top: top,
                        left: left,
                        height: height,
                        width: 100,
                        backgroundColor:'green'
                    }}
                />
            );
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