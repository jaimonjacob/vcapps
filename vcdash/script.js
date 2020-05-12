var lrs

try {
  lrs = new TinCan.LRS({
    endpoint: 'https://watershedlrs.com/api/organizations/10981/lrs/',
    username: 'bde27ce0f7b36e',
    password: '2bb3f290d84811',
    allowFail: false,
  })
} catch (ex) {
  console.log('Failed to setup LRS object: ', ex)
  // TODO: do something with error, can't communicate with LRS
}

lrs.queryStatements({
  params: {
    verb: new TinCan.Verb({
      id: 'http://adlnet.gov/expapi/verbs/completed',
    }),
    since: '2020-05-10T08:34:16Z',
    
  },
  callback: function (err, sr) {
    if (err !== null) {
      console.log('Failed to query statements: ' + err)
      // TODO: do something with error, didn't get statements
      return
    }

    if (sr.more !== null) {
      // TODO: additional page(s) of statements should be fetched
    }

    var statements = sr.statements
    console.log(statements)
    var refinedStatements = statements.filter(function (el) {
      return el.actor.name
    })
    console.log("refinedStatements before");
    console.log(refinedStatements)
   
   var refinedData=[];
   refinedStatements.forEach(function (statement) {
       
         refinedData.push([statement.actor.name, statement.target.name, statement.result.score.raw]);
      
      })
    console.log("summativeData after");  
    console.log(refinedData);
    
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
    console.log("sortedArray");
    console.log(sortedArray);
    

    var xValues = sortedArray.map(function(x){
    return x[0];
    })

    var yValues = sortedArray.map(function(x){
      return x[2];
    })
    console.log(xValues);
    console.log(yValues);


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
                max: 50,
                min: 10,
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
  },
})
