var tincan = new  TinCan({
		recordStores: [{
		endpoint: 'https://watershedlrs.com/api/organizations/10981/lrs/',
		username: 'bde27ce0f7b36e',
		password: '2bb3f290d84811',
		allowFail:false
		}]
	});
  var MultiArray = []
 	tincan.getStatements({

	  'params' : {
		'verb' : {
			'id' : 'http://adlnet.gov/expapi/verbs/completed'
		 }
	  }, // <-- don't forget this comma, seriously, it will drive you nuts.
	  'callback': function (err, result) {
		      
      //console.log(result); 
      var statements = result.statements
      //console.log(statements)   
      var statementsData = [];
      statements.forEach(function (statement) {          
         statementsData.push([statement.actor.name, statement.result.score.raw]);           
      });

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

    //console.log(summativeData);

    var xValues = summativeData.map(function(x){
    return x[0];
    })

    var yValues = summativeData.map(function(x){
      return x[1];
    })
    //console.log(xValues);
    //console.log(yValues);

    var myChart = document.getElementById("myChart").getContext("2d");
  var barChart = new Chart(myChart, {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        label: "score",
        data: yValues,
        backgroundColor: "#483698",
        borderWidth: 1,
        borderColor: "#00338D",
        hoverBorderWidth: 2,
        hoverBorderColor: "#6D2077"
      }]
    },
    options: {
      title:{
        display: true,
        text: "score dashboard", 
        fontColor:  '#E5E2E8',      
        fontSize: 25
      },
      legend: {
        position: "right",
        labels: {

                fontColor: 'white'
            }
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
                suggestedMin: 5,
                suggestedMax: 50,
                fontColor: '#E5E2E8'
            }
        }],

    xAxes: [{
            ticks: {
                fontColor: '#E5E2E8',
            }
        }]



    }
    }


  })

    
    
    
    }
	})

