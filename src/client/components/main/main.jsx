import React from 'react';
// import PropTypes from 'prop-types';
import styles from './style.scss';
import Spritesheet from 'react-responsive-spritesheet';

class Main extends React.Component {
  constructor() {
    super();
    this.state = {
        myCharacters: null
    };
  }

  draw(){
    let allCharacters = this.props.allCharacters;
    let randomIndex = Math.floor(Math.random()*allCharacters.length);
    let randomChar = allCharacters[randomIndex];
  }

  render() {
    let allCharacters = this.props.allCharacters;

    if(allCharacters === null){
        return <p>LOADING...</p>
    } else {
        let characterslist = allCharacters.map((character, index) => {
            return(
                <div key={index}>
                    <h4>Name: {character.name}</h4>
                    <span>Art:</span>
                    <img className={styles.art} src={character.art}/>
                    <span>Sprite:</span>
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


        return (
            <div>
                <button onClick={()=>{this.draw()}}>big draw button</button>
                <div>
                    {characterslist}
                </div>
            </div>
        );
    }


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