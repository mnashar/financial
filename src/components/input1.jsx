import React from 'react';
import Chart from './chart';
import Plans from './plans';
import Input2 from './input2';




class Input1 extends React.Component{

  constructor(props){
    super(props);
    this.handleOptionChange = this.handleOptionChange.bind(this);

    let plans = new Plans();
    this.state={
      plans :plans.plans
    };
   

  }
  
  handleOptionChange(e) {
  
    let id = e.target.value;
    let plans = new Plans();

      this.setState({ 
        planId: id ,
        plan: plans.getPlan(id)
      }

      , function () {
        console.log(this.state);
      });
   
  }

  


  render() {
    
    let radiosSequence = [];
    
    for (let i = 1; i <= 10; i++) {
      radiosSequence.push(i);
    }

    let classname = "div_show";
   
    return (
      <div className="container">

        <div className={classname}>
            <h1>Please Select A Risk Level For Your Investment Portfolio</h1>
            
            <h2>1 is the lowest risk and 10 is the highest risk</h2>

          <div className="radio-buttons-title-container">
            <label> Low Risk</label>
            <label> High Risk</label>
          </div>
          

            <form className="radio-buttons-container">



                {Object.keys(this.state.plans).map((plan,idx)=> {
                  return (
                    <div className="radio-div" key={idx}>
                      
                      <label>
                        <input type="radio" 
                        name="plans"
                          value={plan}
                          onChange={this.handleOptionChange}
                        />
                        {plan}
            </label>
                    </div>
                  );
                })}


              </form>

          <Chart 
            planId={this.state.planId} 
            plan={this.state.plan}
          />


        </div>

        <Input2 
          planId={this.state.planId}
          plan={this.state.plan}  
          />


 
      </div>
    );
  }
}

export default Input1;

