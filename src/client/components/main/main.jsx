import React from 'react';
// import PropTypes from 'prop-types';
import styles from './style.scss';
import Spritesheet from 'react-responsive-spritesheet';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
        allCharacters: null,
        usersCharacters: [],
        update: false
    };
  }

  addCharacter(character){
    let allCharacters = this.state.characters;
    console.log('character to add:', character);
  }

  draw(){
    let userId = this.props.userId;
    let allCharacters = [...this.state.allCharacters];

    let randomIndex = Math.floor(Math.random()*allCharacters.length);
    let randomChar = allCharacters[randomIndex];

    let temp = [...this.state.usersCharacters].filter(character => { character.id === randomChar.id });
    console.log('temp', temp)
    if (temp.length === 0){
        console.log('ALREADY HAVE THIS CHAR');
    } else {
        this.setState({usersCharacters: this.state.usersCharacters.concat(randomChar)})

        fetch('/characters/new', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            charId: randomChar.id,
            userId: userId,
          })
        }).then(response => response.json())
        .then(response => console.log(response));
    }





  }



  componentDidMount(){
    let userId = this.props.userId;
    let mainThis = this;

    var requestAll = new XMLHttpRequest();
    requestAll.addEventListener("load", function(){
      let responseData = JSON.parse( this.responseText );
      console.log( 'resdata:', responseData );
      mainThis.setState({allCharacters: responseData});
    });
    requestAll.open("GET", `/characters`);
    requestAll.send();


    var request = new XMLHttpRequest();
    // var mainThis = this;
    request.addEventListener("load", function(){
      let responseData = JSON.parse( this.responseText );
      console.log( 'resdata::', responseData );
      if (responseData === null){
        mainThis.setState({usersCharacters: []});
      } else {
        mainThis.setState({usersCharacters: responseData});
      }
    });

    request.open("GET", `/characters/${userId}`);
    request.send();
    // this.setState({requested:true});
  }



  componentDidUpdate(){
    console.log("State after update:", this.state);
  }



  render() {
    let allCharacters = this.state.allCharacters;
    let charactersList;
    if (allCharacters != null){
        charactersList = allCharacters.map((character, index) => {
            return(
                <div key={index} className={styles.listItem}>
                    <h4>Name: {character.name}</h4>
                    <p>Sprite:</p>
                    <Spritesheet
                        className={styles.sprite}
                        style={{width:100, height:100}}
                        image={character.spritesheet}
                        widthFrame={260}
                        heightFrame={260}
                        steps={6}
                        fps={12}
                        startAt={1}
                        endAt={6}
                        loop={true}
                      />
                </div>
            )
        });
    } else {
        return <p>LOADING</p>
    }

    return (
        <div>
            <button onClick={()=>{this.draw()}}>big draw button</button>

            <p>PARTY</p>
            <div>

            </div>


            <div>
                {charactersList}
            </div>
        </div>
    );



  }
  //end render
}

// Counter.propTypes = {
//   message: PropTypes.string.isRequired,
// };

export default Main
        // <img src="3020001000_sprite_01_a.png" style={{border: '1px solid black'}}/>
      //   <Spritesheet
      //   className={styles.sprite}
      //   style={{width:100, height:100}}
      //   image={`/herja/herja-spritesheet.png`}
      //   widthFrame={260}
      //   heightFrame={260}
      //   steps={6}
      //   fps={12}
      //   startAt={1}
      //   endAt={6}
      //   loop={true}
      // />
      // <Spritesheet
      //   className={styles.sprite}
      //   style={{width:100, height:100}}
      //   image={`/herja/herja-reverse-spritesheet.png`}
      //   widthFrame={260}
      //   heightFrame={260}
      //   steps={6}
      //   fps={12}
      //   startAt={6}
      //   endAt={-1}
      //   direction={'rewind'}
      //   loop={true}
      // />
      // <Spritesheet
      //   className={styles.sprite}
      //   style={{width:100, height:100}}
      //   image={`/lamretta/lamretta-spritesheet.png`}
      //   widthFrame={260}
      //   heightFrame={260}
      //   steps={6}
      //   fps={12}
      //   startAt={1}
      //   endAt={6}
      //   loop={true}
      // />
      // <Spritesheet
      //   className={styles.sprite}
      //   style={{width:100, height:100}}
      //   image={`/seofon/seofon-spritesheet.png`}
      //   widthFrame={260}
      //   heightFrame={260}
      //   steps={6}
      //   fps={12}
      //   startAt={1}
      //   endAt={6}
      //   loop={true}
      // />