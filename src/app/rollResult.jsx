import React from 'react';

var RollResult = React.createClass({
  componentWillMount: function() {
    this.firebaseRef = new Firebase("https://cinnamon-roll.firebaseio.com/");

    var rollId = this.props.params.rollId;

    this.firebaseRef.child(rollId).on("value", function(snapshot) {
      console.log(snapshot.val());
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });

  },
  render: function() {
    return (
      <div>
      <h2>Results Page</h2>
      <p>{this.props.params.rollId}</p>
      </div>
    );
  }
});

module.exports = RollResult;
