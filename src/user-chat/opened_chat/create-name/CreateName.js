import React from "react";
import styled from "styled-components";
import * as color from "../../../consts/color";
import { SendMessage } from '../../../consts/images';
import ModalError from "./ModalError";
import uuid from "uuid/v4";

const session_id = uuid();

class CreateName extends React.Component {
  
  state = {
    email: "",
    name: "",
    isError: false,
  };
  
  componentDidMount() {
    this.props.generateSessionID(session_id);
  }
  
  handleInput = ( { target: { value, name } } ) => {
    this.setState({
      [name]: value,
    })
  };
  
  saveName = () => {
    const { email } = this.state;
    const {
      increaseOpenCount,
      createToken,
      requestAdminLogin,
      saveUserName,
    } = this.props;
    
    increaseOpenCount();
    let user = {
      email: email.replace(/ /g, "").concat("@jexia.io"),
      password: email.replace(/ /g, ""),
      name: email,
    };
    requestAdminLogin(user);
    saveUserName(user.name);

    setTimeout(() => {
      createToken(user);
    },1000);
  };
  
  closeModal = () => {
    this.setState({
      isError: false
    });
  };
  
  createUser = () => {
    if(!this.state.email) {
      this.setState({isError: true});
    } else {
      this.saveName();
    }
  };
  
  render() {
    const { email, isError } = this.state;
    return (
      <CreateNameWrapper>
        { isError && <ModalError error={"Please enter name"} closeModal={this.closeModal}/> }
        <Title color={color.archiveColor}>Enter your name to chat</Title>
        <InputWrapper>
          <Input
            type="text"
            name="email"
            placeholder="John Dear"
            value={email}
            onChange={this.handleInput}
            input={color.black}
          />
          <Img
            src={SendMessage}
            alt="continue"
            onClick={this.createUser}
          />
        </InputWrapper>
      </CreateNameWrapper>
    )
  }
}


export default CreateName;

const Img = styled.img`
  width: 22px;
  height: 22px;
  position: absolute;
  left: 90%;
  top: 25%;
  cursor: pointer;
`;

const CreateNameWrapper = styled.div`
  position: relative;
  top: 12vh;
  left: 0.5vw;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
`;

const Title = styled.div`
  color: ${props => props.color};
  font-size: 0.9em;
  margin-bottom: 4%;
`;

const InputWrapper = styled.div`
  position: relative;
  border: 1px solid #a2a2a2;
  width: 18.2vw;
  padding: 2%;
  height: 3vh;
`;

const Input = styled.input`
  border: none;
  outline: none;
  height: 3vh;
  width: 17vw;
  padding-left: 2%;
  font-size: 1.1em;
  color: ${props => props.input};
`;