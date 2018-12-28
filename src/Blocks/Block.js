import React, { Component } from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';

const styledBlock = {
  width: 80,
  height: 80,
  border: '1px solid black',
  display: 'inline-block',
  cursor: 'pointer',
};

class Block extends Component {
  removeBlock = () => {
    const { blockKey } = this.props;
    firebase
      .database()
      .ref('/blocks/' + blockKey)
      .remove()
      .catch(e => {
        this.props.triggerError(e);
      });
  };

  render() {
    const { block } = this.props;
    return (
      <div style={styledBlock} onClick={this.removeBlock}>
        {block.value}
      </div>
    );
  }
}

Block.propTypes = {
  triggerError: PropTypes.func.isRequired,
  block: PropTypes.object.isRequired,
  blockKey: PropTypes.string.isRequired,
};

export default Block;
