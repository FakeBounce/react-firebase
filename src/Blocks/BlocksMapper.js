import React, { Component } from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import Block from './Block';

class BlocksMapper extends Component {
  removeBlock = key => {
    firebase
      .database()
      .ref('/blocks/' + key)
      .remove()
      .catch(e => {
        this.props.triggerError(e);
      });
  };

  render() {
    const { blocks, triggerError } = this.props;
    return Object.keys(blocks).map(blockKey => {
      return (
        <Block
          key={blockKey}
          triggerError={triggerError}
          block={blocks[blockKey]}
          blockKey={blockKey}
        />
      );
    });
  }
}

BlocksMapper.propTypes = {
  triggerError: PropTypes.func.isRequired,
  blocks: PropTypes.object.isRequired,
};

export default BlocksMapper;
