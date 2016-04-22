import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, hashHistory } from 'react-router';
import RollList from './rollList.jsx';
import RollResult from './rollResult.jsx';

var RollApp = React.createClass({
  getInitialState: function() {
    return {roll_id: '', roll_result: [], roll_specification: '', character: '', player: '', comments: ''};
  },
  componentWillMount: function() {
    this.firebaseRef = new Firebase("https://cinnamon-roll.firebaseio.com/");
    // this.firebaseRef.on("child_added", function(dataSnapshot) {
      // console.log("test"+this);
      // this.items.push(dataSnapshot.val());
      // this.setState({
        // items: this.items
      // });
    // }.bind(this));
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

    // var rolled = this.state.items.concat([{text: this.state.text, id: Math.random() }]);
    // var nextText = '';
    this.firebaseRef.child(rollId).set({
      roll_id: rollId, roll_result: rollArray, character: this.state.character, player: this.state.player, comments: this.state.comments
    });

    hashHistory.push('/results/'+rollId);

  },
  render: function() {
    return (
      <div>
        <h3>Cinnamon Roll</h3>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onRollChange} value={this.state.roll_specification} placeholder="ex: 2d6" />
          <input onChange={this.onCharacterChange} value={this.state.character} placeholder="Character Name"/>
          <input onChange={this.onPlayerChange} value={this.state.player} placeholder="Player Name"/>
          <input onChange={this.onCommentsChange} value={this.state.comments} placeholder="Comments"/>
          <button>Roll</button>
        </form>
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

// ReactDOM.render(<RollApp />, document.getElementById('app'));
ReactDOM.render((
  <Router history={hashHistory}>
    <Route path="/" component={RollApp}/>
    {/* add the routes here */}
    <Route path="/results" component={RollResult}/>
    <Route path="/results/:rollId" component={RollResult}/>
  </Router>
), document.getElementById('app'));
