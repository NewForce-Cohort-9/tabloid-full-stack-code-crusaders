import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, Button } from 'reactstrap';
import { AvatarImageSelector } from './AvatarImageSelector.js';


export const AvatarImageSelectorModal = ({ isOpen, toggle, onSelect }) => {
  return (
    <Modal isOpen={isOpen} toggle={toggle}>
      <ModalHeader toggle={toggle}>Select an image for your profile:</ModalHeader>
      <ModalBody>
        <AvatarImageSelector onSelect={onSelect} />
      </ModalBody>
    </Modal>
  );
};