import * as React from "react";
import { Modal, Portal } from "react-native-paper";
import PropTypes from "prop-types";

const containerStyle = {
  backgroundColor: "white",
  padding: 20,
  width: "85%",
  alignSelf: "center",
  borderRadius: 5,
  display: "flex",
  justifyContent: "center",
};

const UgbModal = ({ visible, hideModal, children }) => {
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={containerStyle}
      >
        {children}
      </Modal>
    </Portal>
  );
};

UgbModal.propTypes = {
  visible: PropTypes.bool,
  hideModal: PropTypes.func,
  children: PropTypes.node,
};

export default UgbModal;
