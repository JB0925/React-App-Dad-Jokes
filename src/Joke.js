import React, { Component } from 'react';
import './Joke.css';

const emoji = require("emoji-dictionary")

class Joke extends Component {
    constructor(props) {
        super(props)
        this.handleUpVote = this.handleUpVote.bind(this);
        this.handleDownVote = this.handleDownVote.bind(this);
        this.renderEmoji = this.renderEmoji.bind(this);
        this.renderBorder = this.renderBorder.bind(this);
    }

    handleUpVote() {
        this.props.upVote(this.props.joke)
    }

    handleDownVote() {
        this.props.downVote(this.props.joke)
    }

    renderEmoji() {
        let val = this.props.value;
        if (val <= 2) return emoji.getUnicode("frowning");
        if (val > 2 && val < 7) return emoji.getUnicode("smirk");
        if (val >= 7 && val <= 10) return emoji.getUnicode("grinning");
        return emoji.getUnicode("laughing");
    }

    renderBorder() {
        let val = this.props.value;
        if (val <= 2) return "red";
        if (val > 2 && val < 7) return "darkgoldenrod"
        if (val >= 7 && val <= 10) return "blue"
        return "green"
    }

    render() {
        console.log(this.props.value)
        return (
            <div className="Joke">
                <div className="Joke-vote">
                    <i className="fas fa-arrow-up" onClick={this.handleUpVote}></i>
                    <div className="Joke-circle" style={{border: `2px solid ${this.renderBorder()}`}}>{this.props.value}</div>
                    <i className="fas fa-arrow-down" onClick={this.handleDownVote}></i>
                </div>
                {this.props.joke}
                <div className="emoji">{this.renderEmoji()}</div>
            </div>
        )
    }
}
export default Joke;