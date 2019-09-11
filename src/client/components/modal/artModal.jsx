import React from 'react';

import styles from './style.scss';

class ArtModal extends React.Component {
  constructor() {
    super();
    this.state = {
        hideModal: false
    }

  }

  hideArtModal(){
    this.props.hideArtModal();
  }

  render() {
    let char = this.props.displayCharacter;
    let modalStatus = this.props.showArtModal;
    if(modalStatus === false){
        return <div/>
    } else if (this.props.displayCharacter != null){
        return (
          <div className={styles.modal} onClick={()=>{this.hideArtModal()}}>
                <div className={styles.wrapper}>
                    <img className={styles.drawArt} src={this.props.displayCharacter.art}/>
                    <div className={styles.details}>
                        <p className={styles.name}>{char.name}</p>
                        <p className={styles.subtitle}>{char.subtitle}</p>
                        <p className={styles.description}>{char.description}</p>
                    </div>
                </div>
          </div>
        );
    }


  }
}

export default ArtModal;