// PizzaBoard.js
import React from 'react';
import PizzaCard from './PizzaCard';
import { connect } from 'react-redux';
import '../App.css';

class PizzaBoard extends React.Component {
  renderPizzaCardsForColumn(stage) {
    const { orderStages } = this.props;

    if (!orderStages || typeof orderStages !== 'object') {
      return null; // Handle the case where orderStages is undefined or not an object
    }

    const pizzaCards = Object.entries(orderStages)
      .filter(([_, { stage: currentStage }]) => currentStage === stage)
      .map(([orderId, { stage, timestamp }]) => (
        <PizzaCard key={orderId} orderId={orderId} stage={stage} timestamp={timestamp} />
      ));

    return (
      <div key={stage} className='pizza-column'>
        <h4>{stage}</h4>
        {pizzaCards}
      </div>
    );
  }

  render() {
    return (
      <div className='pizza-board'>
        <h2>Pizza Stages Section</h2>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 1 }}>
            {this.renderPizzaCardsForColumn('Order Placed')}
          </div>
          <div style={{ flex: 1 }}>
            {this.renderPizzaCardsForColumn('Order In Making')}
          </div>
          <div style={{ flex: 1 }}>
            {this.renderPizzaCardsForColumn('Order Ready')}
          </div>
          <div style={{ flex: 1 }}>
            {this.renderPizzaCardsForColumn('Order Picked')}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  orderStages: state.orderStages,
});

export default connect(mapStateToProps)(PizzaBoard);
