import React, { Component } from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import BlocksMapper from './BlocksMapper';
import BlockButton from './BlockButton';

class BlocksPanel extends Component {
  state = {
    blocks: {},
  };

  componentDidMount() {
    firebase
      .database()
      .ref('/blocks')
      .on('value', snapshot => {
        this.setState(state => ({
          ...state,
          blocks: snapshot.val(),
        }));
      });
  }

  addBlock = () => {
    firebase
      .database()
      .ref('/blocks')
      .push({ value: 'Nouveau block !' })
      .catch(e => this.props.triggerError(e));
  };

  render() {
    const { triggerError } = this.props;
    const { blocks } = this.state;
    return (
      <div style={{ position: 'relative', width: '100%' }}>
        <BlockButton addBlock={this.addBlock} />
        <BlocksMapper triggerError={triggerError} blocks={blocks} />
      </div>
    );
  }
}

BlocksPanel.propTypes = {
  triggerError: PropTypes.func.isRequired,
};

export default BlocksPanel;
