import React from 'react';

var RollResult = React.createClass({
  getInitialState: function() {
    return {};
  },
  componentWillMount: function() {
    this.firebaseRef = new Firebase("https://cinnamon-roll.firebaseio.com/");

    var rollId = this.props.params.rollId;
    var that = this;

    this.firebaseRef.child(rollId).on("value", function(snapshot) {
      var rollInfo = snapshot.val();
      that.setState({
        roll_result: rollInfo.roll_result,
        roll_specification: rollInfo.roll_specification,
        character: rollInfo.character,
        player: rollInfo.player,
        comments: rollInfo.comments
      });
      console.log(that.state);
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });

  },
  render: function() {
    return (
      <div>
        <h2>Results</h2>
        <div>
          <span>Character Name:</span>
          <span> {this.state.character}</span>
        </div>
        <div>
          <span>Player Name:</span>
          <span> {this.state.player}</span>
        </div>
        <div>
          <span>Comments:</span>
          <span> {this.state.comments}</span>
        </div>
        <div>
          <span>Roll Results:</span>
          <span> {this.state.roll_result}</span>
        </div>
      </div>
    );
  }
});

module.exports = RollResult;
