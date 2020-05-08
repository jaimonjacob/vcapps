
var xhr = new XMLHttpRequest();
xhr.addEventListener('load', function () {
  if (this.status == 200) {
    var response = JSON.parse(this.responseText);
    var statements = response.statements;
    console.log(statements)
    var statementsData = [];
    statements.forEach(function (statement) {
           
      if (statement.verb.id !== "http://adlnet.gov/expapi/verbs/voided") {
        var valueOne = statement.actor.name;
        delete valueOne.mbox;
        delete valueOne.objectType;

        var valueThree = statement.verb.display["en-US"];
        var valuTwo = statement.result.score.scaled;
        statementsData.push([valueOne, valuTwo, valueThree]);
      
      }
    });

    console.log(statementsData)


    var sum = {}, summativeData;

    for (var i = 0, c; c = statementsData[i]; ++i) {
      if (undefined === sum[c[0]]) {
        sum[c[0]] = c;
      }
      else {
        sum[c[0]][1] += c[1];
      }
    }
    summativeData = Object.keys(sum).map(function (val) { return sum[val] });

    console.log(summativeData);

    var xValues = summativeData.map(function(x){
    return x[0];
    })

    var yValues = summativeData.map(function(x){
      return x[1];
    })
    console.log(xValues);
    console.log(yValues);
   //Chart Code Here
/* 
   var data = [
    {
      x: summativeData.map(function(x){
        return x[1]
        }),

      y: summativeData.map(function(x){
        return x[0]
        }),
      type: 'bar',
      orientation: 'h'
    }
  ];
  
  Plotly.newPlot('myDiv', data);

     */

  var myChart = document.getElementById("myChart").getContext("2d");
  var barChart = new Chart(myChart, {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        label: "score",
        data: yValues,
        backgroundColor: "#0091DA",
        borderWidth: 1,
        borderColor: "#00338D",
        hoverBorderWidth: 2,
        hoverBorderColor: "#6D2077"
      }]
    },
    options: {
      title:{
        display: true,
        text: "The score dashboard",
        fontSize: 25
      },
      legend: {
        position: "right"
      },
      layout: {
        padding: 20
      },
      tooltips: {
        enabled: true
      },
      scales: {
        yAxes: [{
            ticks: {
                suggestedMin: 10,
                suggestedMax: 50
            }
        }]
    }
    }


  })

   //Chart code above 
  }
});
xhr.open('GET', 'https://watershedlrs.com/api/organizations/10981/lrs/statements');
xhr.setRequestHeader("x-experience-api-version", "1.0.3");
xhr.setRequestHeader("authorization", "Basic YmRlMjdjZTBmN2IzNmU6MmJiM2YyOTBkODQ4MTE=");
xhr.send(); 
