fetch('https://watershedlrs.com/api/organizations/10981/lrs/statements', {
  method: 'get',
  headers: {
    "Content-Type": "application/json",
    'Authorization': 'Basic YmRlMjdjZTBmN2IzNmU6MmJiM2YyOTBkODQ4MTE=',
    'X-Experience-API-Version': '1.0.3'
  },
})
.then(function(response){
  return response.json();
})
.then(function(data){
//console.log(data);
var statements = data.statements;
var validStatements = statements.filter(function (el) {
      return el.verb.id ==="http://adlnet.gov/expapi/verbs/completed" && el.result.score.raw !==0;
    })
 var refinedStatements = validStatements.filter(function (el) {
      return el.actor.name
    })
    //console.log("refinedStatements before");
    //console.log(refinedStatements);
    var refinedData=[];
   refinedStatements.forEach(function (statement) {
       
         refinedData.push([statement.actor.name, statement.object.name, statement.result.score.raw]);
      
      })
    //console.log("summativeData after");  
    //console.log(refinedData);
    var sum = {}, summativeData;
    for (var i = 0, c; c = refinedData[i]; ++i) {
      if (undefined === sum[c[0]]) {
        sum[c[0]] = c;
      }
      else {
        sum[c[0]][2] += c[2];
      }
    }
    summativeData = Object.keys(sum).map(function (val) { return sum[val] });

    var sortedArray = summativeData.sort(function(a, b) {
    return b[2] - a[2];
    });

    //console.log("sortedArray");
    //console.log(sortedArray);
  
    var xValues = sortedArray.map(function(x){
    return x[0];
    })

    var yValues = sortedArray.map(function(x){
      return x[2];
    })
    //console.log(xValues);
    //console.log(yValues);
     var myChart = document.getElementById('myChart').getContext('2d')
    var barChart = new Chart(myChart, {
      type: 'bar',
      data: {
        labels: xValues,
        datasets: [
          {
            label: 'score',
            data: yValues,
            backgroundColor: '#483698',
            borderWidth: 1,
            borderColor: '#00338D',
            hoverBorderWidth: 2,
            hoverBorderColor: '#6D2077',
          },
        ],
      },
      options: {
       /*  title: {
          display: false,
          text: 'score dashboard',
          fontColor: '#E5E2E8',
          fontSize: 25,
        }, */
        legend: {
          position: 'right',
          labels: {
            fontColor: 'white',
          },
        },
        layout: {
          padding: 20,
        },
        tooltips: {
          enabled: true,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                steps: 5,
                stepValue: 10, 
                max: 50,       
                min: 0,
                fontColor: '#E5E2E8',
              },
            },
          ],

          xAxes: [
            {
              ticks: {                
                fontColor: '#E5E2E8',
              },
            },
          ],
        },
      },
  })


}).catch(function(err){
//console.log(err);
})
