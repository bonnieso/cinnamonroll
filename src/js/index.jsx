import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import RollResult from './rollResult.jsx';

var RollApp = React.createClass({
  getInitialState: function() {
    return {roll_id: '', roll_result: [], roll_specification: '', character: '', player: '', comments: ''};
  },
  componentWillMount: function() {
    this.firebaseRef = new Firebase("https://cinnamon-roll.firebaseio.com/");
  },
  onRollChange: function(e) {
    this.setState({roll_specification: e.target.value});
  },
  onPlayerChange: function(e) {
    this.setState({player: e.target.value});
  },
  onCharacterChange: function(e) {
    this.setState({character: e.target.value});
  },
  onCommentsChange: function(e) {
    this.setState({comments: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();

    var rollArray = [];
    var rollId = guid();

    var numberOfRolls = this.state.roll_specification.split('d')[0];
    var numberOfSides = this.state.roll_specification.split('d')[1];

    for(var i = 0; i < numberOfRolls; i++){
      rollArray.push(getRandomInclusive(1, numberOfSides));
    }

    this.setState({roll_result: rollArray, roll_id: rollId});

    this.firebaseRef.child(rollId).set({
      roll_specification: this.state.roll_specification, roll_result: rollArray, character: this.state.character, player: this.state.player, comments: this.state.comments
    });

    hashHistory.push('/results/'+rollId);

  },
  render: function() {
    return (
      <div style={body_wrapper}>
        <div style={left_column}>
         <img src="./images/cinnamon-roll-graphic.png" />
        </div>
        <div style={right_column}>
          <form onSubmit={this.handleSubmit}>
            <input type="text" onChange={this.onRollChange} value={this.state.roll_specification} placeholder="Ex: 2d6" />
            <input onChange={this.onCharacterChange} value={this.state.character} placeholder="Character Name"/>
            <input onChange={this.onPlayerChange} value={this.state.player} placeholder="Player Name"/>
            <input onChange={this.onCommentsChange} value={this.state.comments} placeholder="Comments"/>
            <button>ROLL</button>
          </form>
        </div>
      </div>
    );
  }
});

function getRandomInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

var body_wrapper = {
  width: '100%',
  height: '100%'
}

var right_column = {
  width: '50%',
  display: 'inline-block',
  'verticalAlign': 'top',
  height: '100%'
};

var left_column = {
  width: '50%',
  background: '#2F3238',
  display: 'inline-block',
  height: '100%',
  'textAlign': 'center'
};

ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={RollApp}/>
    {/* add the routes here */}
    <Route path="/results/:rollId" component={RollResult}/>
  </Router>
), document.getElementById('app'));
