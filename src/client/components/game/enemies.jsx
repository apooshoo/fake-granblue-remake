import React from 'react';

import styles from './style.scss';

class Enemies extends React.Component {
  constructor() {
    super();

  }


  render() {
    if (this.props.enemy != undefined){
        console.log('enemy received:', this.props.enemy)
        return(
            <p>Enemy here</p>
        )
    }


  }
}

export default Enemies;