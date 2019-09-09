import React from 'react';
import Spritesheet from 'react-responsive-spritesheet';
import styled, {keyframes} from 'styled-components';
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
                                    left: laneCoords.right-200
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
    let {top, left, height, right, ...others} = randomLaneCoords;
    let enemyTransform = {
        x: right,
        duration: 10
    }

    const moveRight = keyframes`
        from {
            transform: translate(${left}px);
        }
        to {
            transform: translate(${right-130}px);
        }
    `;

    const Enemy = styled.div`
        position: absolute;
        top: ${top}px;
        left: ${left}px;
        height: ${height}px;
        width: 100px;
        background-color: green;
        animation: ${moveRight} 5s linear infinite;
    `;

    let enemy = <Enemy>
                    <Spritesheet
                        style={{
                            width:100,
                            height:100,

                        }}
                        image={this.props.partyList[0].spritesheet}
                        widthFrame={260}
                        heightFrame={260}
                        steps={6}
                        fps={12}
                        startAt={1}
                        endAt={6}
                        loop={true}
                        />
                </Enemy>
    console.log('generating enemy:', enemy);
    this.setState({
        enemies: [...this.state.enemies].concat(enemy),
        enemiesTransform: [...this.state.enemiesTransform.concat(enemyTransform)]
    })

  }


  uniKeyCode(event) {
    let enemies = Array.from(document.getElementById('enemies').children)

    // console.log(enemies[0].getBoundingClientRect())
    // console.log(enemies)
    let range = {
        upper: null,
        lower: null
    }
    var key = event.keyCode;
    event.stopImmediatePropagation();

    let defineRange = key =>{
        if (key === 81){
            console.log('pressed q');
            return {
                    upper: 95,
                    lower: 0
                }
        } else if (key === 87){
            console.log('pressed w');
            return {
                    upper: 210,
                    lower: 96
                }
        } else if (key === 69){
            console.log('pressed e');
            return {
                    upper: 350,
                    lower: 211
                }
        } else {
            return
        }
    }

    let upper = defineRange(key).upper;
    let lower = defineRange(key).lower;

    let filteredEnemiesByY = enemies.filter(enemy => {
        return (enemy.getBoundingClientRect().y >= lower && enemy.getBoundingClientRect().y < upper) ;
    })
    console.log("filteredEnemiesByY", filteredEnemiesByY)
    //we want the biggest LEFT first
    let sortedEnemiesByX = filteredEnemiesByY.sort((a,b) => {
        return b.getBoundingClientRect().x - a.getBoundingClientRect().x
    });

    // sortedEnemiesByX.map(enemy=> {console.log(enemy.getBoundingClientRect())})

    //compare vs X, left's 300 is 100 self-width offset and 200 character offset
    let hitboxStart = [...this.state.laneCoords][0].right-300;
    let hitboxEnd = hitboxStart + 100;
    console.log(hitboxStart)
    if(sortedEnemiesByX[0].getBoundingClientRect().x >= hitboxStart){
        console.log('bullseye!!')
    } else {
        console.log('miss!')
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
            // console.log('returning', enemy)
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
            <div id="enemies">
                {returnEnemies}
            </div>
            <React.Fragment>
                {generateCharacters}
            </React.Fragment>



        </React.Fragment>
    );

  }

}

export default Game;