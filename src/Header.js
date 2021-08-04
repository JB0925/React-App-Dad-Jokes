import React, { Component } from 'react';
import './Header.css';

const emoji = require("emoji-dictionary");

class Header extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        this.props.clickButton()
    }

    render() {
        return (
            <div className="parent">
              <h1>Dad <span className="handwriting">Jokes</span></h1>
              <div className="laugh">{emoji.getUnicode("laughing")}</div>
              <button className="new-joke" onClick={this.handleClick}>New Joke</button>
            </div>
        )
    }
}
export default Header;