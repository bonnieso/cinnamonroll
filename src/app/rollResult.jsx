import React from 'react';

var RollResult = React.createClass({
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
