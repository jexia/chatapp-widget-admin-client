import React from "react";
import { connect } from "react-redux";
import uuid from "uuid/v4";
import styled from "styled-components";
import * as color from "../../../consts/color";
import { SendMessage } from '../../../consts/images';
import { addMessageToList, addUserToDataset, dateS, requestLogin } from "../../../store/actionCreators/actions";
import MessagesListComponent from "../messages-list/MessagesList";
import { rmt, dataModule } from "../../../store/jexiaConnector";
import { filter, pluck } from "rxjs/operators";

const channel = rmt.channel("chat");
const user_channel = rmt.channel("users");

class ChatMessages extends React.Component {

  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    this.state = {
      message_text: "",
      isUserCreated: this.props.isUserCreated,
      highlightInput: false,
    };
  }

  componentDidMount() {
    this.props.requestLogin();
  }

  componentDidUpdate() {
    this.showRef();
  }

  sock = () => {
    let { addMessageToList, session_id, user_id, isUserCreated } = this.props;
    let { message_text } = this.state;
    channel
      .pipe(
        pluck("data"), // pull out only data field
        filter((data) => data.session_id === session_id),
      ).subscribe(data => {
      channel
        .getLog(data => data("data.session_id").isEqualTo(session_id))
        .subscribe (
          (data) => addMessageToList(data),
          error => console.log(error)
        )
    });

    let date = new Date();
    let minutes = date.getMinutes() < 10 ? `0${date.getMinutes()}` : date.getMinutes();
    let resDate = date.getHours() + ":" + minutes;

    if(!message_text) {
      this.setState({
        highlightInput: true,
      });
    } else {
      isUserCreated === false
        ?
        this.addUserInDataSet(resDate, message_text)
        :
        this.props.dateS(resDate, user_id, message_text);

      channel.publish({
        message: this.state.message_text,
        user: this.props.user_name,
        session_id,
        messageDate: resDate,
        unread_msg: "true",
      });

      user_channel.publish({
        session_id: this.props.session_id,
        message: "send",
        newMessage: true,
      });

      this.setState({
        highlightInput: false,
      });
    }
  };

  showRef = () => {
    this.myRef.current.scrollTo(0, this.myRef.current.scrollHeight);
  };

  addUserInDataSet = (date, message) => {
    const {
      session_id,
      addUserToDataset,
      user_name
    } = this.props;

    let userForDataSet = {
      user: user_name,
      session_id: session_id,
      date: date,
      last_msg: message,
    };
    addUserToDataset(userForDataSet);
  };

  handleInputMessage = ( { target: { value, name } } ) => {
    this.setState({
      [name]: value,
    })
  };

  handleSubmit = () => {
    this.sock(); // send message
    this.clearInput(); // after submit message clear the input field
  };

  clearInput = () => {
    this.setState({
      message_text: "",
    })
  };

  onKeyDown = (event) => {
    const { message_text } = this.state;
    if(!message_text) {
      this.setState({
        highlightInput: true,
      });
    } else {
      if (event.key === 'Enter') {
        event.preventDefault();
        event.stopPropagation();
        this.handleSubmit();
        this.setState({
          highlightInput: false,
        });
      }
    }
  };

  render() {
    const { messagesList, highlightInput } = this.props;
    const { message_text } = this.state;
    return (
      <UserMessagesWrapper>
        <MessagesWrapper ref={this.myRef}>
          {
            messagesList !== null
              ?
              messagesList.map((el) => {
                return (
                  <MessagesListComponent
                    key={uuid()}
                    data={el.data}
                    element={el}
                    background={color.mainColor}
                  />
                )
              })
              :
              null
          }
        </MessagesWrapper>
        <InputWrapper>
          <InputMessage
            type="text"
            autoFocus
            name="message_text"
            placeholder="Type your message"
            value={message_text}
            highlightInput={highlightInput}
            onChange={this.handleInputMessage}
            onKeyDown={this.onKeyDown}
          />
          <Img
            width="25"
            height="25"
            src={SendMessage}
            alt="send message"
            onClick={this.handleSubmit}
          />
        </InputWrapper>
      </UserMessagesWrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  user_name: state.userData.user_name,
  messagesList: state.userData.messagesList,
  user_id: state.userData.user_id,
  isUserCreated: state.userData.isUserCreated,
  unreadMessage: state.userData.unreadMessage,
});

const mapDispatchToProps = (dispatch) => ({
  addMessageToList: (messagesList) => dispatch(addMessageToList(messagesList)),
  requestLogin: () => dispatch(requestLogin()),
  dateS: (date, user_id, last_msg) => dispatch(dateS(date, user_id, last_msg)),
  addUserToDataset: (user, session_id, date, last_msg) => dispatch(addUserToDataset(user, session_id, date, last_msg)),
});

export default connect(mapStateToProps,mapDispatchToProps)(ChatMessages);

const Img = styled.img`
  width: 22px;
  height: 22px;
  position: absolute;
  left: 90%;
  bottom: 25%;
  cursor: pointer;
`;

const UserMessagesWrapper = styled.div`
  width: 100%;
  height: 41vh;
  
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
`;

const InputWrapper = styled.div`
  position: relative;
  min-height: 4vh;
  border-top: ${props => props.highlightInput ? "1px solid tomato" : "1px solid gray"};
`;

const InputMessage = styled.input`
  outline: none;
  border: none;
  width: 84%;
  height: 3.3vh;
  margin: 0 0 0 2%;
  padding-left: 2%;
  padding-right: 4%;
  font-size: 1.1em;
  
  &::placeholder {
    color:  ${props => props.highlightInput ? "tomato" : "black"};
  }
`;

const MessagesWrapper = styled.div`
  //border: 1px solid green;
  min-height: 5vh ;
  overflow-y: auto;
  overflow-x: hidden;
  // margin-bottom: 4%;
  
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;
