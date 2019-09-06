import React from 'react';
// import PropTypes from 'prop-types';
import styles from './style.scss';
import Spritesheet from 'react-responsive-spritesheet';
//modes: main, showAll
class Main extends React.Component {
  constructor() {
    super();
    this.state = {
        allCharacters: null,
        usersCharacters: [],
        partyList: [null,null,null],
        setSlot: null,
        mainState: 'main',
        requested: false
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

    let temp = this.state.usersCharacters.filter(char => char.id === randomChar.id)
    if (temp.length > 0){
        console.log('have already')
    } else {
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
        .then(response => console.log(response))
        .then(this.setState({usersCharacters: [...this.state.usersCharacters].concat(randomChar)}))
    };


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

  //on selecting character to put into slot
  //character is from usersCharacters
  setActive(character){
    console.log('setting active');
    console.log('slot to save to:', this.state.setSlot)
    console.log('prev character slot', character.slot);
    //^^^if character.slot != null it means it already is in party

    let userId = this.props.userId;
    let mainThis = this;
    let usersCharacters = [...this.state.usersCharacters];

    //check if target is empty
    let existingInSlot = usersCharacters.filter(char => {
        return char.slot === this.state.setSlot;
    });

    //check index in state of your character
    let stateCharIndex = usersCharacters.findIndex(char => {
        return char.id === character.id;
    });

    //--------------------------------------------------------AJAX REQ TO CHANGE SLOT TO NULL DONE
    let partyList = [...this.state.partyList];
    if (character.slot != null){
        //if character is already in party,find its old position and delete it
        partyList[character.slot-1] = null;
        //make sure the usersCharacters is also updated!
        usersCharacters[stateCharIndex].slot = null;
        //now we may proceed!
        console.log('deleting this characters old position');
        fetch('/characters/editSlot', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            charId: character.id,
            slot: null,
          })
        }).then(response => response.json())
        .then(response => console.log("edited to:", response))
        .then(this.setState({partyList: partyList, usersCharacters: usersCharacters}))
        .then(this.setActive(character));

        // this.setState({partyList: partyList, usersCharacters: usersCharacters});
        // this.setActive(character);
    }


    //--------------------------------------------------------AJAX REQ TO CHANGE SLOT TO NULL DONE
    if (existingInSlot.length > 0){
        //there is someone already here! Clear their stats before proceeding!
        let existingId = existingInSlot[0].id;
        let existingIndex = usersCharacters.findIndex(char => {
            return char.id === existingId;
        });
        usersCharacters[existingIndex].slot = null;
        //now we've cleared the slot of the prev occupant, we may proceed!
        console.log('deleting someone else in this slot, restarting')

        fetch('/characters/editSlot', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            charId: existingId,
            slot: null,
          })
        }).then(response => response.json())
        .then(response => console.log("edited to:", response))
        .then(this.setState({usersCharacters: usersCharacters}))
        .then(this.setActive(character));

        // this.setState({usersCharacters: usersCharacters});

        // this.setActive(character);
    };

    //--------------------------------------------------------AJAX REQ TO CHANGE SLOT TO SLOT
    //either nobody was here, or there was and you have cleared it. Now save your character in!
    //you will need to add you character to the party list, and also edit the usersCharacters state and DB.
    //Let's test the states without DB for now.
    console.log('adding to slot now!')
    // let stateCharId = usersCharacters.findIndex(char => {
    //     return char.id === character.id;
    // });
    usersCharacters[stateCharIndex].slot = this.state.setSlot;
    //prepared to save state usersCharacters
    partyList[this.state.setSlot-1] = usersCharacters[stateCharIndex];
    //prepared to save party list

    fetch('/characters/editSlot', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        charId: character.id,
        slot: this.state.setSlot,
      })
    }).then(response => response.json())
    .then(response => console.log("edited to:", response))
    .then(this.setState({
        usersCharacters: usersCharacters,
        partyList: partyList
    }))
    .then(this.mainMode());

    // this.setState({
    //     usersCharacters: usersCharacters,
    //     partyList: partyList
    // });
    // //now redirect back! dont worry about resetting setSlot, mainMode() will do it for you.
    // this.mainMode();
  }

  //on click on party thumbnail, saves slot being clicked on
  showAllMode(index){
    console.log('changing to showall mode');
    let slot = index + 1;
    this.setState({mainState: 'showAll', setSlot: slot});
  }

  mainMode(){
    console.log('changing to main mode');
    this.setState({mainState: 'main', setSlot: null});
  }

  render() {
    let usersCharacters = this.state.usersCharacters;
    let charactersList;
    if (usersCharacters != null){
        charactersList = usersCharacters.map((character, index) => {
            return(
                <div key={index} className={styles.listItem}>
                    <h4>Name: {character.name}</h4>
                    <button onClick={()=>{this.setActive(character)}}>Set Active</button>
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
    }

    let partyList = [...this.state.partyList].map((char, index) => {
        if(char === null){
            return <div key={index} onClick={()=>this.showAllMode(index)}><p>Empty</p></div>
        } else {
            return <div key={index} onClick={()=>this.showAllMode(index)}><p>{char.name}</p></div>
        }
    });





//MAIN RETURN
    if (this.state.mainState === 'main'){
        return (
            <div>
                <button onClick={()=>{this.draw()}}>big draw button</button>

                <p>PARTY</p>
                <div>
                    {partyList}
                </div>


                <div>

                </div>
            </div>
        );
    } else if (this.state.mainState === 'showAll'){
        return (
            <React.Fragment>
                <button onClick={()=>{this.mainMode()}}>back to main</button>
                <p>SELECT CHAR TO INSERT</p>
                <div>
                    {charactersList}
                </div>
            </React.Fragment>
            )
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