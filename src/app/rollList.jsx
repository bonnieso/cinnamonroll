import React from 'react';

var RollList = React.createClass({
  render: function() {
    // var createItem = function(item, index) {
    //   return <li key = {index+1} >Dice {index+1} Result: {item}</li>;
    // };
    return (
      <div>Rolled!</div>
    //   <ul>{this.props.items.map(createItem)}</ul>
    );
  }
});

module.exports = RollList;
