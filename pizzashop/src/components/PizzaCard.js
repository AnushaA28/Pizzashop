import React from 'react';
import { connect } from 'react-redux';
import { moveToNextStage } from '../actions';

class PizzaCard extends React.Component {
  handleMoveToNext = () => {
    const { orderId, moveToNextStage } = this.props;
    moveToNextStage(orderId);
  };

  render() {
    const { orderId, stage, timestamp, orderCount, orderStages } = this.props;
    const currentTime = Date.now();
    const timeSpent = timestamp ? Math.floor((currentTime - timestamp) / 1000) : 0;
       // Check if the order is in the same stage for more than 3 minutes
       const isDelayed = timeSpent > 180;

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60);
        const seconds = timeInSeconds % 60;
        return `${minutes} minutes ${seconds} seconds`;
      };
    const currentStageObject = orderStages[orderId] || { stage: 'Order Placed', timestamp: 0 };
    const currentStage = currentStageObject.stage;

    return (
      <div style={{ border: '1px solid #ddd', padding: '10px', margin: '10px', width: '200px', background: isDelayed ?'red': 'inherit' }}>
        <p>Order {orderId.toString().padStart(3, '0')}</p>
        <p>{formatTime(timeSpent)}</p>
        {currentStage !== 'Order Picked' && (
          <button type="button" onClick={this.handleMoveToNext}>Next</button>
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  orderCount: state.orderCount,
  orderStages: state.orderStages,
});

const mapDispatchToProps = {
  moveToNextStage,
};

export default connect(mapStateToProps, mapDispatchToProps)(PizzaCard);
