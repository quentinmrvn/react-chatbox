import React, { Component, } from "react";

class Form extends Component {
  state = {
    message: "",
    length: this.props.length,
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.createMessage();
  };
  handleChange = (event) => {
    const message = event.target.value;
    const length = this.props.length - message.length;
    this.setState({ message, length });
  };
  handleKeyUp = (event) => {
    if (event.key === "Enter") {
      this.createMessage();
    }
  };
  createMessage = () => {
    const { addMessage, pseudo, length } = this.props;
    const message = {
      message: this.state.message,
      pseudo: pseudo,
    };
    addMessage(message);
    this.setState({ message: "", length });
  };
  render() {
    return (
      <div>
        <form className='form' onSubmit={this.handleSubmit}>
          <textarea
            value={this.state.message}
            onChange={this.handleChange}
            onKeyUp={this.handleKeyUp}
            maxLength={this.props.length}
            required
          />
          <div className='info'>{this.state.length}</div>
          <button type='submit'>Send</button>
        </form>
      </div>
    );
  }
}

export default Form;
