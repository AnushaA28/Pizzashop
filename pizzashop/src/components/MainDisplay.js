import React from 'react';
import { connect } from 'react-redux';
import { moveToNextStage, cancelOrder } from '../actions';
import '../MainDisplay.css';

class MainDisplay extends React.Component {
    handleMoveToNext = (orderId) => {
        this.props.moveToNextStage(orderId);
      };
      handleCancelOrder = (orderId) => {
        this.props.cancelOrder(orderId);
      };

  renderPizzaInProgress() {
    
    const { orderStages } = this.props;
    const currentTime = Date.now();

      // Convert orderStages object into an array for sorting
      const ordersArray = Object.entries(orderStages).map(([orderId, { stage, timestamp }]) => {
        const timeSpent = timestamp ? Math.floor((currentTime - timestamp) / 1000) : 0; // in seconds
        return {
          orderId,
          stage,
          timeSpent,
        };
      });

       // Sort the orders based on the time spent in each stage in descending order
    const sortedOrders = ordersArray.sort((a, b) => b.timeSpent - a.timeSpent);


    return (
        <table style={{ width: '100%', borderCollapse: 'collapse', borderColor: 'black' }}>
          <thead>
            <tr>
              <th>Order Id</th>
              <th>Stage</th>
              <th>Total Time Spent</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
          {sortedOrders.map(({ orderId, stage, timeSpent }) => {
            const minutes = Math.floor(timeSpent / 60);
            const seconds = timeSpent % 60;
            const totalTimeSpent = `${minutes} minutes ${seconds} seconds`;

              return (
                <tr key={orderId}>
                  <td>{orderId}</td>
                  <td>{stage}</td>
                  <td>{totalTimeSpent}</td>
                  <td>
                  {(stage === 'Order Placed' || stage === 'Order In Making') && (
                    <button type="button" className='button-cancel' onClick={() => this.handleCancelOrder(orderId)}>
                      Cancel
                    </button> 
                  )}
                  
                </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      );
    }
  
    render() {
      const { orderCount } = this.props;
  
      return (
        <div>
          {orderCount > 0 ? (
            <div>
              <h2>Main Section</h2>
              {this.renderPizzaInProgress()}
            </div>
          ) : (
            <p>No pizzas in progress</p>
          )}
          <p>Total Pizzas Delivered Today: {orderCount}</p>
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
    cancelOrder,
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(MainDisplay);