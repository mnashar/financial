class Plans{
    constructor(){
        this.plans=
        {
      1: [80, 20, 0, 0, 0],
      2: [70, 15, 15, 0, 0],
      3: [60, 15, 15, 10, 0],
      4: [50, 20, 20, 10, 0],
      5: [40, 20, 20, 20, 0],
      6: [35, 25, 5, 30, 5],
      7: [20, 25, 25, 25, 5],
      8: [10, 20, 40, 20, 10],
      9: [5, 15, 40, 25, 15],
      10: [0, 5, 25, 30, 40]
    };

        this.titles = 
        [
            "Bonds",
              "Large Cap", 
              "Mid Cap", 
              "Foreign", 
              "Small Cap"
            ];
}

    getPlan(id){
        return this.plans[id];
    
    }
}

export default Plans;