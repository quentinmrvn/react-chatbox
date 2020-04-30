import React, { Component, createRef } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./App.css";
import "./animations.css";
import Form from "./components/Form";
import Message from "./components/Message";

import base from "./firebase";

class App extends Component {
  state = {
    messages: {},
    pseudo: this.props.match.params.pseudo,
  };

  messageRef = createRef();

  componentDidMount() {
    base.syncState("/", { context: this, state: "messages" });
  }
  componentDidUpdate() {
    const ref = this.messageRef.current;
    ref.scrollTop = ref.scrollHeight;
  }
  addMessage = (message) => {
    const messages = { ...this.state.messages };
    messages[`message-${Date.now()}`] = message;
    Object.keys(messages)
      .slice(0, -10)
      .forEach((key) => {
        messages[key] = null;
      });
    this.setState({ messages });
  };
  isUser = (pseudo) => pseudo === this.state.pseudo;
  render() {
    const messages = Object.keys(this.state.messages).map((key) => (
      <CSSTransition
        key={key}
        classNames="fade"
        timeout={200}
      >
        <Message 
          isUser={this.isUser}
          message={this.state.messages[key].message}
          pseudo={this.state.messages[key].pseudo}
      />
      </CSSTransition>
      
    ));
    return (
      <div className='box'>
        <div>
          <div className='messages' ref={this.messageRef}>
            <TransitionGroup className='message'>{messages}</TransitionGroup>
          </div>
        </div>
        <Form
          length={140}
          pseudo={this.state.pseudo}
          addMessage={this.addMessage}
        />
      </div>
    );
  }
}

export default App;
