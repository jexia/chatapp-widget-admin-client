import React from "react";
import styled from "styled-components";

class MessagesListComponent extends React.Component {
  
  render() {
    const {
      data: { message, user, messageDate },
      data,
      background,
      element
    } = this.props;
    return (
      <React.Fragment>
        {
          user !== "admin"
            ?
              <MessagesListRight>
                <MessageContentRight>
                  { message }
                </MessageContentRight>
                <UserInfo>
                  <MeBlockRight background={ background }>ME</MeBlockRight>
                  <MessageTime>{ messageDate }</MessageTime>
                </UserInfo>
              </MessagesListRight>
            :
              <MessagesListLeft>
                <UserInfoLeft>
                  <MeBlockLeft background={ background }>A</MeBlockLeft>
                  <MessageTime>{ messageDate }</MessageTime>
                </UserInfoLeft>
                <MessageContentLeft>
                  { message }
                </MessageContentLeft>
              </MessagesListLeft>
        }
      </React.Fragment>
    )
  }
}

export default MessagesListComponent;


const MessagesListRight = styled.div`
  display: flex;
  flex-direction: row;
  margin: 2% 4% 1% 0;
`;

const MessagesListLeft = styled(MessagesListRight)`
  align-self: end;
`;

const MessageContentRight = styled.div`
  display: flex;
  
  padding: 2% 4% 2% 4%;
  color: grey;
  word-wrap: break-word;
  word-break: break-all;
  overflow-wrap: break-word;
  border: 1px solid grey;
  border-radius: 10px;
  
  width: 13vw;
  min-height: 4vh;
  margin-right: 3%;
`;

const MessageContentLeft = styled(MessageContentRight)`
  margin-left: 3%;
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const UserInfoLeft = styled(UserInfo)`
  margin-left: 3%;
`;

const MeBlockRight = styled.div`
  width: 40px;
  height: 40px;
  background-color: ${props => props.background};
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 20px;
  color: #fff;
  font-size: 0.9em;
`;

const MeBlockLeft = styled(MeBlockRight)`
  margin-left: 3%;
  width: 43px;
`;

const MessageTime = styled.div`
  font-size: 0.9em;
  color: grey;
`;