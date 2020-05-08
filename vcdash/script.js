
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


    var vBarConfig = {
      "type": "hbar",
      "legend": {
        "marker": {
          "cursor": "hand"
        },
        "item": {
          "cursor": "hand"
        },
        "border-color": "none",
        "align": "center",
        "vertical-align": "bottom",
        "max-items": 4,
        "overflow": "page",
        "page-on": {
          "background-color": "black",
          "border-width": 1,
          "border-color": "black"
        },
        "page-off": {
          "background-color": "#0091DA",
          "border-width": 1,
          "border-color": "white"
        },
        "page-status": {
          "font-color": "white",
          "font-size": 11,
          "font-family": "Georgia",
          "background-color": "#0091DA"
        },
        "toggle-action": "none"
      },
      "plotarea": {
        "margin": "dynamic",
        "border-top": "1px solid grey",
        "border-right": "1px solid grey"
      },
      "scale-x": {
        "auto-fit": true,
        "line-width": 1,
        "items-overlap": true,
        "item": {
          "angle": 0,
          "wrap-text": true
        }
      },
      "scale-y": {
        "ref-line": {
          "visible": true,
          "line-style": "solid",
          "items-overlap": true
        },
        "guide": {
          "line-style": "solid"
        }
      },
      "plot": {
        
        "animation": {
          "effect": "ANIMATION_SLIDE_BOTTOM",
          "speed": "2000"
        }
      },

      "series": [{
        "values": summativeData
      }]
    };

    zingchart.render({
      id: 'chartOne',
      data: vBarConfig,
      height: '100%',
      width: '100%'
    })
  }
});
xhr.open('GET', 'https://watershedlrs.com/api/organizations/10981/lrs/statements');
xhr.setRequestHeader("x-experience-api-version", "1.0.3");
xhr.setRequestHeader("authorization", "Basic YmRlMjdjZTBmN2IzNmU6MmJiM2YyOTBkODQ4MTE=");
xhr.send(); 
