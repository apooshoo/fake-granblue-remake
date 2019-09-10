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
            const attack = keyframes`
                0%  {background-position-x: 0px}
                100%{background-position-x: -600px;}
            `;
            const Character = styled.div`
                position: absolute;
                width: 100px;
                height: 100px;
                top: ${laneCoords.top}px;
                left: ${laneCoords.right-200}px;
                background: url('${char.spritesheet}') right center;
                background-size: cover;
            `;
        let character = <Character>

                        </Character>
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
                        // onLoopComplete={()}

                        />
                </Enemy>
    console.log('generating enemy:', enemy);
    this.setState({
        enemies: [...this.state.enemies].concat(enemy),
        enemiesTransform: [...this.state.enemiesTransform.concat(enemyTransform)]
    })

  }

  characterAttack(charIndex){
    console.log('making char attack!');
    // console.log('index of char to animate', charIndex);
    // console.log('char:', [...this.state.charactersToGenerate][charIndex])
    console.log(this.props.partyList)
    let characterStats = [...this.props.partyList][charIndex];
    // console.log(characterStats)
    let laneCoords = this.state.laneCoords[charIndex];
    // console.log(laneCoords)

    const attack = keyframes`
        0%  {background-position-x: 0px}
        100%{background-position-x: -600px;}
    `;
    const Character = styled.div`
        position: absolute;
        width: 100px;
        height: 100px;
        top: ${laneCoords.top}px;
        left: ${laneCoords.right-200}px;
        background: url('${characterStats.spritesheet}') right center;
        animation: ${attack} .5s steps(6);
        background-size: cover;
    `;


    let character = <Character/>
    // console.log(character)

    //insert
    let wrapper = document.getElementById('characters').children
    // console.log("wrapper", wrapper)

    let oldChild = wrapper[charIndex];
    // console.log(oldChild)

    // oldChild = character
    // console.log(wrapper)

    let temp = [...this.state.charactersToGenerate]
    // temp.splice(charIndex, 1)
    temp[charIndex] = null;
    // console.log(temp)
    this.setState({
        charactersToGenerate: temp
    });
    // temp.splice(charIndex, 0 , character)
    temp[charIndex] = character
    // console.log(temp)
    this.setState({
        charactersToGenerate: temp
    });
        // console.log(this.state.charactersToGenerate)


    // let simulateClick = () => {
    //     console.log('simulating click')
    //     let click = new MouseEvent('click', {
    //         bubbles:true,
    //         cancelable:false,
    //         view:window
    //     });
    //     let clicking = !attackingChar.dispatchEvent(click);
    // }
    // simulateClick()
  }

  uniKeyCode(event) {
    event.stopImmediatePropagation();
    let enemies = Array.from(document.getElementById('enemies').children)
    // console.log(enemies[0].getBoundingClientRect())
    let range = {
        upper: null,
        lower: null
    }

    var key = event.keyCode;
    if (key === 81){
        console.log('pressed q');
        this.characterAttack(0);
        range = {
                upper: 95,
                lower: 0
            };
    } else if (key === 87){
        console.log('pressed w');
        this.characterAttack(1);
        range = {
                upper: 210,
                lower: 96
            };
    } else if (key === 69){
        console.log('pressed e');
        this.characterAttack(2);
        range = {
                upper: 350,
                lower: 211
            };
    } else {
        return
    };

    let upper = range.upper;
    let lower = range.lower;

    let filteredEnemiesByY;
    let sortedEnemiesByX;
    if(enemies != undefined){
        filteredEnemiesByY = enemies.filter(enemy => {
            return (enemy.getBoundingClientRect().y >= lower && enemy.getBoundingClientRect().y < upper);
        });

        if(filteredEnemiesByY != undefined){
            sortedEnemiesByX = filteredEnemiesByY.sort((a,b) => {
                return b.getBoundingClientRect().x - a.getBoundingClientRect().x
            });
        };

        let hitboxStart = [...this.state.laneCoords][0].right-300;
        let hitboxEnd = [...this.state.laneCoords][0].right-200;
        // console.log(hitboxStart)

        let attackTarget = sortedEnemiesByX[0];
        let attackTargetPositionX = attackTarget.getBoundingClientRect().x;
        if(attackTargetPositionX >= hitboxStart && attackTargetPositionX < hitboxEnd){
            console.log('bullseye!!')
            attackTarget.style = 'display: none'
            // console.log(attackTarget)
        } else {
            console.log('miss!')
        };

    } else {
        return;
    }
    // console.log("filteredEnemiesByY", filteredEnemiesByY)
    // sortedEnemiesByX.map(enemy=> {console.log(enemy.getBoundingClientRect())})
    //compare vs X, left's 300 is 100 self-width offset and 200 character offset
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
    // console.log("styleArr", styleArr)

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
    // console.log("lanesArr", lanesArr)
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
            <div id="characters">
                {generateCharacters}
            </div>



        </React.Fragment>
    );

  }

}

export default Game;