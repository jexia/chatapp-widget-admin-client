import React from "react";
import styled from "styled-components";

const ClosedChat = (props) => {
  const { background, handleOpenChat, logoSrc, arrow} = props;
  return (
    <FloatingDiv background={background} onClick={handleOpenChat}>
      <LeftSide>
        <img
          width="32"
          height="32"
          src={logoSrc}
          alt="message"
        />
        <Title>Chat with us</Title>
      </LeftSide>
      <Arrow
        src={arrow}
        alt="arrow"
        onClick={handleOpenChat}
      />
    </FloatingDiv>
  )
};

export default ClosedChat;

const FloatingDiv = styled.div`
  margin-right: 5%;
  width: 20vw;
  height: 4vh;
  background-color: ${props => props.background};
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 10px 10px 0 0;
`;

const LeftSide = styled.div`
  flex: 0 0 50%;
  margin: 0 0 0 3%;
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  margin-left: 6%;
`;

const Arrow = styled.img`
  width: 32px;
  height: 32px;
  margin-right: 6%;
  transform: rotate(180deg);
`;