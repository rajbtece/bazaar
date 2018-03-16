import React from 'react';
import { connect } from 'react-redux';
import { View, Dimensions, Image } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import _ from 'lodash';

import { Link, Text } from 'app/components';

export default class MapCallout extends React.Component {
  navigateToNode() {
    this.props.navigateToNode(this.props.node);
  }

  render() {
    const { node } = this.props;

    let modalProps = {
      isVisible: true,
      onBackButtonPress: this.props.onClose,
      onBackdropPress: this.props.onClose,
      backdropOpacity: 0,
    };

    return (
      <Modal {...modalProps}>
        <View style={styles.modal}>
          <View style={styles.modalHeader}>
            <Icon style={styles.modalHeaderIcon} name="map-marker" />
          </View>
          <View style={styles.modalContent}>
            <Text style={styles.node.title}>{node.name}</Text>
            <Text style={styles.node.address}>{node.address}, {node.zip}, {node.city}</Text>
            <Text style={styles.node.info}>Welcome to visit our node {node.name}</Text>
          </View>
          <View style={styles.modalFooter}>
            <Link title="Visit node" onPress={this.navigateToNode.bind(this)}/>
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = {
  modal: {
    elevation: 4,
    margin: 5,
    backgroundColor: '#fff',
  },
  modalHeader: {
    backgroundColor: '#fef2e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalHeaderIcon: {
    fontSize: 80,
    color: '#efcec4',
    padding: 30,
  },
  modalContent: {
    padding: 15
  },
  node: {
    title: {
      fontFamily: 'montserrat-medium',
      fontSize: 20,
    },
    address: {
      marginVertical: 5,
    },
    info: {
      marginVertical: 15,
    },
  },
  modalFooter: {
    borderTopColor: '#f0f0f0',
    borderTopWidth: 2,
    padding: 15,
  }
};
