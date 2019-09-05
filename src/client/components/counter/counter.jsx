import React from 'react';

import PropTypes from 'prop-types';

import styles from './style.scss';

import Spritesheet from 'react-responsive-spritesheet';

class Counter extends React.Component {
  constructor() {
    super();
    this.state = {
      banana: 'sneakers',
    };
  }

  sprite(options){
    var that = {};
    that.context = options.context;
    that.width = options.width;
    that.height = options.height;
    that.image = options.image;
    return that
  }

  render() {
    var image = new Image();
    image.src = "3020001000_sprite_01_a.png";
    return (
    <div>
      <Spritesheet
        className={styles.sprite}
        style={{width:100, height:100}}
        image={`/herja/herja-spritesheet.png`}
        widthFrame={260}
        heightFrame={260}
        steps={6}
        fps={12}
        startAt={1}
        endAt={6}
        loop={true}
      />
      <Spritesheet
        className={styles.sprite}
        style={{width:100, height:100}}
        image={`/herja/herja-reverse-spritesheet.png`}
        widthFrame={260}
        heightFrame={260}
        steps={6}
        fps={12}
        startAt={6}
        endAt={-1}
        direction={'rewind'}
        loop={true}
      />
      <Spritesheet
        className={styles.sprite}
        style={{width:100, height:100}}
        image={`/lamretta/lamretta-spritesheet.png`}
        widthFrame={260}
        heightFrame={260}
        steps={6}
        fps={12}
        startAt={1}
        endAt={6}
        loop={true}
      />
      <Spritesheet
        className={styles.sprite}
        style={{width:100, height:100}}
        image={`/seofon/seofon-spritesheet.png`}
        widthFrame={260}
        heightFrame={260}
        steps={6}
        fps={12}
        startAt={1}
        endAt={6}
        loop={true}
      />

      <p className={styles.desc}>
        {this.props.message} : {this.state.banana}
      </p>
    </div>
    );
  }
}

Counter.propTypes = {
  message: PropTypes.string.isRequired,
};

export default Counter
        // <img src="3020001000_sprite_01_a.png" style={{border: '1px solid black'}}/>