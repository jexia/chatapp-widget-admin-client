import React from "react";
import { connect } from "react-redux";
import * as color from "../consts/color";
import * as styled from "./styles/style-user-chat";
import { ChatLogo, Arrow } from "../consts/images";
import ClosedChat from "./closed-chat/closed-chat";
import { dataModule, rmt } from "../store/jexiaConnector";
import OpenedChat from "./opened_chat/opened-chat";
import { deleteUser } from "../store/actionCreators/actions";

const user_channel = rmt.channel("users");

class User_Chat extends React.Component {
  
  state = {
    isOpen: false,
    openCount: 1,
  };
  
  componentDidMount() {
    localStorage.removeItem('token');
  }
  
  handleOpenChat = () => {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  };
  
  increaseOpenCount = () => {
    this.setState({
      openCount: 2,
    })
  };
  
  deleteUser = () => {
    const { deleteUser, user_id } = this.props;
    user_channel.publish({"command": "delete users"});
    deleteUser(user_id);
  };
  
  render() {
    const { isOpen, openCount } = this.state;
    return (
      <styled.UserChatWrapper>
        {
          !isOpen
            ?
            <ClosedChat
              background={color.mainColor}
              handleOpenChat={this.handleOpenChat}
              logoSrc={ChatLogo}
              arrow={Arrow}
            />
            :
            <OpenedChat
              background={color.mainColor}
              border={color.mainColor}
              logoSrc={ChatLogo}
              arrow={Arrow}
              openCount={openCount}
              handleOpenChat={this.handleOpenChat}
              increaseOpenCount={this.increaseOpenCount}
            />
        }
      </styled.UserChatWrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  user_id: state.userData.user_id,
});

const mapDispatchToProps = (dispatch) => ({
  deleteUser: (password) => dispatch(deleteUser(password))
});

export default connect(mapStateToProps, mapDispatchToProps)(User_Chat);