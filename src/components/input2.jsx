import React from 'react';
import Plans from './plans';



class Input2 extends React.Component{

  constructor(props){
    super(props);
    this.state={};
    this.handleButtonClicked = this.handleButtonClicked.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.getRecommendations = this.getRecommendations.bind(this);
    this.roundItUp = this.roundItUp.bind(this);
    this.calculateDifference = this.calculateDifference.bind(this);
  }

  roundItUp(num) {
    let precision = 2;
    precision = Math.pow(10, precision)
    return Math.ceil(num * precision) / precision

  }

  calculateDifference(i, j, diff, res){
    let lbl = ["Bonds", "Large Cap", "Mid Cap", "Foreign", "Small Cap"];
    let start = "Transfer $", mid = " from ", end = " to ";
    let iAbs = diff[i]; // it's always positive
    let jAbs = Math.abs(diff[j])

    let min = this.roundItUp(Math.min(iAbs, jAbs));

    if (iAbs > jAbs) {
      diff[i] -= min;
      diff[j] = 0;
    } else {
      diff[j] += min;
      diff[i] = 0;
    }

    if (min !== 0) {
      let temp = start + min + mid + lbl[j] + end + lbl[i];
      res.push(temp);
    }
  }

  getRecommendations(difference){
    let res=[];
    
    let diff=[];
    
    difference.forEach(el=>diff.push(this.roundItUp(el/1)));
    for(let i=0;i<diff.length;i++)
    {
      if(diff[i]>0){
        for(let j=0;j<diff.length;j++){
          if(diff[j]<0){
            this.calculateDifference(i,j,diff,res);
          }
        }
        console.log("res = "+res); 
      }
    }
    return res.join(", ");

  }


  handleChange(e) {
    
    let name = e.target.name;
    this.setState({ [name] : e.target.value}
         , function () {
           console.log(this.state);
           
      }
      );
   
  }

  


  handleButtonClicked(e) {
    e.preventDefault();
  
    let userData=[
      this.state.user_Bonds,
      this.state.user_Large_Cap,
      this.state.user_Mid_Cap,
      this.state.user_Foreign,
      this.state.user_Small_Cap
    ];

    let plans = new Plans();
    let selectedPlan = plans.getPlan(this.props.planId) || ["", "", "", "", ""];
    //let selectedPlanId = this.props.planId;

 
    let total=0;
    userData.forEach(el=>total+=el/1  );

    let newAmount=new Array(5).fill(0);
    let difference=[];
    console.log("selectedPlan = " + selectedPlan);
    for (let i = 0; i < 5; i++) {
      newAmount[i] = this.roundItUp((total / 100) * selectedPlan[i]);
      let diff = this.roundItUp(newAmount[i] - userData[i]);
      difference.push(diff<=0 ? diff : "+"+diff);
    }

    
    this.setState({ 
      difference: difference,
      newAmount:newAmount
    }
      , function () {
        console.log(this.state);

      }
    );
    
  }

  render() {

    let plans=new Plans();
    let titles=plans.titles;
    let titlesConcat=titles.map(el=>el.split(" ").join("_"));
    let selectedPlan = this.props.plan || ["", "", "", "", ""];
    let selectedPlanId = this.props.planId;
    let difference = 
    this.state.difference !=null ? 
    this.state.difference : 
    ["", "", "", "", ""];

    let newAmount=
      this.state.newAmount != null ?
        this.state.newAmount :
        ["", "", "", "", ""];

   
    let radiosSequence = [];
    
    for (let i = 1; i <= 10; i++) {
      radiosSequence.push(i);
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col-12">

            <form className="plan-details-container">


              <h1>Personalized Portfolio</h1>
              <h2>Risk Level {selectedPlanId}</h2>

              

              <div className="plan_details_row">
                 {titles.map((el,idx) => {
                  return <label key={idx} className="plan_title_label"> {el}	</label>
                  })}
                
              </div>
              <div className="plan_details_row">
                {selectedPlan.map((el,idx) => {
                 return  <label key={idx} className="plan_title_label">{el}%	</label>

                })}
                
              </div>		

                <h3>Please Enter Your Current Portfolio</h3>
              
              <button className="button"
                onClick={this.handleButtonClicked} >Rebalance</button>

              <div className="plan_container">
                <div className="plan_details">
                  <div className="plan_details_row">
                    <label className="plan_title_label3">Current Amount</label>
                    <label className="plan_title_label2">Difference</label>
                    <label className="plan_title_label2">New Amount</label>
                    <label className="plan_title_label2">Recomended Transfer</label>
                  </div>


                  {titles.map((title,idx)=>{
                   return <div key={idx} className="plan_details_row">
                      <label className="plan_details_label">{title+" $"}:</label>
                      <input type="text" className="plan_details_text"
                        name={"user_"+titlesConcat[idx]} onChange={this.handleChange} />
                      <input type="text" className="plan_details_text"
                        name={"difference_"+titlesConcat[idx]}
                        value={difference[idx]}
                        disabled />
                      <input type="text" className="plan_details_text"
                        name={"new_" + titlesConcat[idx]}
                        value={newAmount[idx]}
                        disabled />
                    </div>
                  })} 
  


                </div>  {/* end of plan_details */}


                <div className="recommendations">
                  <label className="plan_title_label">Recommendations</label>
                  <br /><br />
                    <label className="plan_title_label4 align_left">
                    {this.getRecommendations(difference)}</label>

                  
                </div>
              </div>


            </form>

          </div>
        </div>
        


        <br /><br /><br /><br /><br />
 
      </div>
    );
  }
}

export default Input2;
