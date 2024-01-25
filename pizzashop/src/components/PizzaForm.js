import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { setPizzaOptions, incrementOrderCount, setOrderStage, cancelOrder, moveToNextStage, moveToPickedStage } from '../actions';
import '../App.css';

class PizzaForm extends React.Component {
    handleInputChange = (event) => {
      const { name, value } = event.target;
      this.props.setPizzaOptions({ [name]: value });
    };
    handleSubmit = (event) => {
        event.preventDefault();
        const { orderCount, incrementOrderCount, setOrderStage } = this.props;
        if (orderCount >= 10) {
            return; // Do not proceed with placing the order
          }
        this.props.incrementOrderCount();

        setOrderStage(orderCount + 1, 'Order Placed');
      };
      handleCancel = () => {
        const { orderCount, orderStages, cancelOrder } = this.props;
        const currentStageObject = orderStages[orderCount];
    
        if (currentStageObject && currentStageObject.stage !== 'Order Ready') {
          // Allow cancel only if the order is not in the 'OrderReady' stage
          cancelOrder(orderCount);
        }
      };
      handleMoveToNext = () => {
        const { orderCount, moveToNextStage } = this.props;
        moveToNextStage(orderCount);
      };
    
      handleMoveToPicked = () => {
        const { orderCount, moveToPickedStage } = this.props;
        moveToPickedStage(orderCount);
      };

      componentDidUpdate(prevProps) {
        const { orderStages, orderCount, setOrderStage } = this.props;
    
        // Check if the stage has been the same for more than 3 minutes
        if (orderStages[orderCount] && prevProps.orderStages[orderCount]) {
            const currentTime = Date.now();
            const prevTimestamp = prevProps.orderStages[orderCount].timestamp;
            const currentStage = orderStages[orderCount].stage;
      
            if (currentTime - prevTimestamp > 3 * 60 * 1000) {
              // Highlight the order stage with red
              setOrderStage(orderCount, `${currentStage} (Delayed)`, currentTime);
            }
          }
        }

    render() {
        const { orderCount, orderStages } = this.props;
        const currentStageObject = orderStages[orderCount] || { stage: 'Order Placed', timestamp: 0 };
        const currentStage = currentStageObject.stage;


        return (
            <div className='container'>
                
          <form onSubmit={this.handleSubmit}>
            <label className='form-label'>
              Pizza Type:
              <select name="type" className='select-input' onChange={this.handleInputChange}>
                <option value="veg">Veg</option>
                <option value="non-veg">Non-Veg</option>
              </select>
            </label>
            <br />
            <label className='form-label'>
              Size:
              <select name="size" className='select-input' onChange={this.handleInputChange}>
                <option value="large">Large</option>
                <option value="medium">Medium</option>
                <option value="small">Small</option>
              </select>
            </label>
            <br />
            <label className='form-label'>
              Base:
              <select name="base" className='select-input' onChange={this.handleInputChange}>
                <option value="thin">Thin</option>
                <option value="thick">Thick</option>
              </select>
            </label>
            <div>
            <button type="submit" className='submit-button'>Place Order</button>
            </div>
          </form>
          {orderCount >= 10 && <p className='error-message'>Not taking any more orders for now</p>}
          </div>
        );
      }
    }
    const mapStateToProps = (state) => ({
        orderCount: state.orderCount,
        orderStages: state.orderStages,
      });
    const mapDispatchToProps = {
        setPizzaOptions,
        incrementOrderCount,
        setOrderStage,
        cancelOrder,
        moveToNextStage,
        moveToPickedStage,
      };
    

      export default connect(mapStateToProps, mapDispatchToProps)(PizzaForm);
