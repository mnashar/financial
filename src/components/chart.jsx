import React from 'react';
import { Pie } from 'react-chartjs-2';
import Plans from './plans';


class Chart extends React.Component{
  constructor(props){
    super(props);
    this.state = {};
  }
  
  
  render() {    
    let plans = new Plans();
    let titles = plans.titles;
    let labels = titles.map(el => el+" %");

    const pieData = {

      labels: labels,
      datasets: [
        {
          label: 'Rainfall',
          backgroundColor: [
            '#B21F00',
            '#C9DE00',
           // '#2FDE00',
           '#ffc0cb',
            '#00A6B4',
            '#6800B4'
          ],
          hoverBackgroundColor: [
            '#501800',
            '#4B5000',
           // '#175000',
           '#e75480',
            '#003350',
            '#35014F'
          ],
          data: this.props.plan          
        }
      ]
    };
    
    if (!this.props.planId)
    return <div>
      <h2 className="gray-title">Here you can see a chart showing your risk.</h2>
    </div>
    else

    return <div>
    
      <Pie
        data={pieData}
        options={{
          title: {
            display: true,
            text: '',
            fontSize: 20
          },
          legend: {
            display: true,
            position: 'right'
          }
        }}
      />
    </div>
  }
}

export default Chart;

