import React from 'react';
import Spritesheet from 'react-responsive-spritesheet';

import styles from './style.scss';
import Enemies from './enemies';

class Game extends React.Component {
  constructor() {
    super();
    this.state = {
        charactersToGenerate: [],
        enemiesTransform: [],
        enemies: [],
        laneCoords: []
    }
  }

  mainMode(){
    this.props.mainMode();
  }

  generateCharacterSprites(coordsArr){
    console.log('generating char sprite')
    let generateCharacterSprites = [...this.props.partyList].map((char, index) => {
        let laneCoords = coordsArr[index];
        console.log(`lane coords of ${index+1}`, laneCoords)
        let character = <div>
                            <Spritesheet
                                style={{
                                    position: 'absolute',
                                    width:100,
                                    height:100,
                                    // top:100,
                                    // right:1100
                                    top: laneCoords.top,
                                    left: laneCoords.right-100
                                }}
                                image={char.spritesheet}
                                widthFrame={260}
                                heightFrame={260}
                                steps={6}
                                fps={12}
                                startAt={1}
                                endAt={6}
                                loop={true}
                                />
                            </div>
        console.log("char to generate", character)
        return character
    });
    console.log('generateCharacterSprites:', generateCharacterSprites)
    this.setState({charactersToGenerate: generateCharacterSprites})
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
                        transition: `transform 10s`
                    }}
                />
    console.log('generating enemy:', enemy);
    this.setState({
        enemies: [...this.state.enemies].concat(enemy),
        enemiesTransform: [...this.state.enemiesTransform.concat(enemyTransform)]
    })

  }


  uniKeyCode(event) {
    var key = event.keyCode;
    event.stopImmediatePropagation();
    if (key === 81){
        console.log('pressed q');
    } else if (key === 87){
        console.log('pressed w');
    } else if (key === 69){
        console.log('pressed e');
    }
  }


  componentDidMount(){
    let lanesArr = document.querySelectorAll('.lane')
    let coordsArr = [];
    [...lanesArr].map(lane => {
        let coords = lane.getBoundingClientRect();
        coordsArr.push(coords)
    })

    this.generateCharacterSprites(coordsArr);
    this.setState({laneCoords: coordsArr});

  }

  componentDidUpdate(){
    console.log("state in enemies:", this.state);

  }




  render() {
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

    let returnEnemies;
    let enemiesToGenerate = [...this.state.enemies]
    if(enemiesToGenerate.length > 0){
        returnEnemies = enemiesToGenerate.map(enemy => {
            console.log('returning', enemy)
            return enemy

        });
    } else {
        console.log('no enemies found')
    }


    document.addEventListener('keydown', (event)=>{this.uniKeyCode(event)})


    let generateCharacters;
    if(this.state.charactersToGenerate.length === 3){
        generateCharacters = [...this.state.charactersToGenerate].map((char, index) => {
            return char
        })
    }

    console.log(styles)

    return(
        <React.Fragment>
            <button onClick={()=>{this.mainMode()}}>back to main</button>
            <p>GAME MODE</p>
            <div className={styles.lanesContainer}>
                {generateLanes}

            </div>
            <button onClick={()=>{this.generateEnemy()}}>GENERATE ENEMIES BTN</button>
            <React.Fragment>
                {returnEnemies}
            </React.Fragment>
            <React.Fragment>
                {generateCharacters}
            </React.Fragment>



        </React.Fragment>
    );

  }

}

export default Game;