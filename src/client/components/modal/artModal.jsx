import React from 'react';

import styles from './style.scss';

class ArtModal extends React.Component {
  constructor() {
    super();

  }

  hideArtModal(){
    this.props.hideArtModal();
  }

  render() {
    let modalStatus = this.props.showArtModal;
    if(modalStatus === false){
        return null;
    } else if (this.props.displayCharacter != null){
        return (
          <div className={styles.modal} onClick={()=>{this.hideArtModal()}}>
            <div>
                <img className={styles.drawArt} src={this.props.displayCharacter.art}/>
            </div>
          </div>
        );
    }


  }
}

export default ArtModal;