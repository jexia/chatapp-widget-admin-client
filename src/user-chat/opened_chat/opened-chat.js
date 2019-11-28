import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import CreateName from "./create-name/CreateName";
import ChatMessages from "./chat-messages/ChatMessages";
import {
  addUserToDataset,
  createToken,
  createUserName,
  generateSessionID,
  requestAdminLogin, saveUserName
} from "../../store/actionCreators/actions";

class OpenedChat extends React.Component {
  
  createUserName = (name) => {
    const { createUserName } = this.props;
    createUserName(name);
  };
  
  render() {
    const {
      handleOpenChat,
      background,
      border,
      logoSrc,
      arrow,
      openCount,
      increaseOpenCount,
      user_name,
      createToken,
      requestAdminLogin,
      user_data,
      addUserToDataset,
      session_id,
      generateSessionID,
      saveUserName,
    } = this.props;
    
    return (
      <Chat border={border}>
        <ChatHeader background={background} onClick={handleOpenChat}>
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
        </ChatHeader>
        <ChatContent>
          {
            openCount === 1 ?
              <CreateName
                createUserName={this.createUserName}
                createToken={createToken}
                requestAdminLogin={requestAdminLogin}
                increaseOpenCount={increaseOpenCount}
                addUserToDataset={addUserToDataset}
                generateSessionID={generateSessionID}
                session_id={session_id}
                saveUserName={saveUserName}
              /> : openCount === 2
              ?
                <ChatMessages
                  user_name={user_name}
                  user_data={user_data}
                  session_id={session_id}
                />
              :
                null
          }
        </ChatContent>
      </Chat>
    )
  }
}

const mapStateToProps = (state) => ({
  user_name: state.userData.user_name,
  user_data: state.userData,
  session_id: state.userData.session_id,
});

const mapDispatchToProps = (dispatch) => ({
  createUserName: (user_name) => dispatch(createUserName(user_name)),
  generateSessionID: (session_id) => dispatch(generateSessionID(session_id)),
  createToken: (email, password) => dispatch(createToken(email, password)),
  requestAdminLogin: (email, password) => dispatch(requestAdminLogin(email,password)),
  addUserToDataset: (user, session_id) => dispatch(addUserToDataset(user, session_id)),
  saveUserName: (user_name) => dispatch(saveUserName(user_name)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OpenedChat);

const Chat = styled.div`
  margin-right: 5%;
  width: 20vw;
  height: 45vh;
  background-color: #ffff;
  border: 1px solid ${(props) => props.border};
  border-radius: 13px 13px 0 0;
`;

const ChatHeader = styled.div`
  position: relative;
  // bottom: 4vh;
  right: 0.05vw;
  width: 20.10vw;
  height: 4vh;
  background-color: ${props => props.background};
  border-radius: 10px 10px 0 0;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  margin-right: 5%;
`;

const ChatContent = styled.div`
  display: flex;
`;