import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BlockButton extends Component {
  render() {
    const { addBlock } = this.props;
    return (
      <button
        style={{ display: 'block', margin: 'auto' }}
        onClick={addBlock}
      >
        Add a block
      </button>
    );
  }
}

BlockButton.propTypes = {
  addBlock: PropTypes.func.isRequired,
};

export default BlockButton;
