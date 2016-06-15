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
      // console.log(that.state);
    }, function (errorObject) {
      console.log("The read failed: " + errorObject.code);
    });

  },
  render: function() {
    var url = "http://www.cinnamonroller.com#/results/"+this.props.params.rollId;
    var rolls = this.state.roll_result;
    var diceType = this.state.roll_specification;

    if(rolls){
      var rollList = rolls.map(function(roll, index){
        return <li style={content} key={ index }>Rolled a {diceType} and got a {roll}.</li>;
      })
    }

    return (
      <div style={results_wrapper}>
        <h2>Results</h2>
        <div style={left_column}>
          <div>
            <h3>Character Name:</h3>
            <span style={content}> {this.state.character}</span>
          </div>
          <div>
            <h3>Player Name:</h3>
            <span style={content}> {this.state.player}</span>
          </div>
          <div>
            <h3>Comments:</h3>
            <span style={content}> {this.state.comments}</span>
          </div>
        </div>
        <div style={right_column}>
          <h3>Roll Results:</h3>
          <ul style={list_wrapper}>{rollList}</ul>
        </div>
        <div style={full_column}>
          <h2>Share Your Roll</h2>
          <input style={share_url} placeholder={url} />
          <input type="submit" style={copy_button} value="COPY" />
        </div>
      </div>
    );
  }
});

var content =  {
  color: '#666',
  fontSize: '16px'
}

var results_wrapper = {
  width: '100%',
  padding: '0 0 0 3em'
}

var full_column = {
  width: '100%'
}

var left_column = {
  width: '40%',
  display: 'inline-block',
  verticalAlign: 'top',
  padding: '0 2em'
}

var right_column = {
  width: '40%',
  display: 'inline-block',
  verticalAlign: 'top',
  padding: '0 2em'
};

var share_url = {
  width: '85%',
  height: '50px',
  padding: '.5em 1em',
  fontSize: '13px',
  fontWeight: '200',
  color: '#7f898e',
  lineHeight: '32px',
  borderRadius: '3px',
  borderWidth: '0',
  WebkitAppearance: 'none',
  margin: '0 0 4em 2em'
}

var copy_button = {
  margin: '0 0 0 -8em',
  WebkitAppearance: 'none',
  padding: '1.5em 3em 1.5em',
  fontWeight: '500',
  fontSize: '.75em',
  background: '#43464B',
  color: '#A4A5A6',
  borderWidth: '0',
  borderTopRightRadius: '3px',
  borderBottomRightRadius: '3px'
}

var list_wrapper = {
  listStyleType: 'none',
  margin: '0 0 0 -2.5em'
}
module.exports = RollResult;
