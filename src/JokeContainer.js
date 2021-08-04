import React, { Component } from 'react';
import './JokeContainer.css'
import Joke from './Joke';
import axios from 'axios';
import Header from './Header';

class JokeContainer extends Component {
    static defaultProps = {
        NUMJOKES: 10
    }
    constructor(props) {
        super(props)
        this.state = {jokes: [{joke: "You are an idiot", numVotes: 0, key: 11}], isLoaded: false}
        this.upVote = this.upVote.bind(this);
        this.downVote = this.downVote.bind(this);
        this.addJoke = this.addJoke.bind(this);
    }

    componentDidMount() {
        let jokeArray = []
        for (let i = 0; i < this.props.NUMJOKES; i++) {
            axios.get('https://icanhazdadjoke.com/', {
            headers: {Accept: "application/json"}
        }).then(res => {
            setTimeout(() => {
                jokeArray.push({joke: res.data.joke, numVotes: 0, key: i})
                this.setState(st => ({jokes: [...jokeArray], isLoaded: true}))
            })
        })
        }
        
    }

    upVote(oldJoke) {
        this.setState(st => ({
            jokes: st.jokes.map(j => {
               if (j.joke === oldJoke) {
                   j.numVotes += .5
               }
               return j
            })
        }))
    }

    downVote(oldJoke) {
        this.setState(st => ({
            jokes: st.jokes.map(j => {
               if (j.joke === oldJoke) {
                   j.numVotes -= .5
               }
               return j
            })
        }))
    }

    addJoke() {
        axios.get('https://icanhazdadjoke.com/', {
            headers: {Accept: "application/json"}
        }).then(res => {
            let oldJokes = this.state.jokes.sort((a,b) => b.numVotes - a.numVotes)
            this.setState(st => ({
                jokes: [...st.jokes.slice(0, -1), {joke: res.data.joke, numVotes: 0}]
            }))
        })
    }
    
    render() {
        let jokes = this.state.jokes.sort((a,b) => b.numVotes - a.numVotes)
        if (!this.state.isLoaded) {
            return <div className="dummy"><i className="fas fa-spinner fa-spin"></i></div>
        }
        return (
            <div className="container">
                    <Header clickButton={this.addJoke}/>
                    <div className="JokeContainer">
                            {jokes.map(j => <Joke joke={j.joke} 
                                                    value={j.numVotes}
                                                    upVote={this.upVote}
                                                    downVote={this.downVote}/>)}
                    </div>
            </div>
            
        )
    }
}

export default JokeContainer;

