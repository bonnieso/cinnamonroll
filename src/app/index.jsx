import React from 'react';
import ReactDOM from 'react-dom';
import RollList from './rollList.jsx';

var RollApp = React.createClass({
  getInitialState: function() {
    return {items: [], text: ''};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var rollArray = [];

    var numberOfRolls = this.state.text.split('d')[0];
    var numberOfSides = this.state.text.split('d')[1];

    for(var i = 0; i < numberOfRolls; i++){
      rollArray.push(getRandomInclusive(1, numberOfSides));
    }
    // var rolled = this.state.items.concat([{text: this.state.text, id: Math.random() }]);
    // var nextText = '';
    this.setState({items: rollArray});
  },
  render: function() {
    return (
      <div>
        <h3>Cinnamon Roll</h3>
        <RollList items={this.state.items}/>
        <form onSubmit={this.handleSubmit}>
          <input onChange={this.onChange} value={this.state.text} />
          <button>Roll</button>
        </form>
      </div>
    );
  }
});

function getRandomInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

ReactDOM.render(<RollApp />, document.getElementById('app'));
