import React from "react";
import styled from "styled-components";

export default function ModalError( { error, closeModal } ) {
  return (
    <ModalWrapper>
      <Message>
        <div>{ error }</div>
        <div onClick={closeModal}>X</div>
      </Message>
    </ModalWrapper>
  )
}

const ModalWrapper = styled.div`
  position: absolute;
  bottom: 320%;
  left: -3%;
  height: 36px;
  width: 15vw;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: #ec2222;
`;

const Message = styled.div`
  font-family: monospace;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 15vw;
  font-size: 16px;
`;