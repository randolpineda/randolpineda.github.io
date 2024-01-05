var xmlhttp = new XMLHttpRequest();
var xmlhttp2 = new XMLHttpRequest();
var xmlhttp3 = new XMLHttpRequest();

var emisora =
  [
    {
      radio_name: 'PANAMA',
      id: 'cs1r44kv6a5tv',
      country_code: 'PA'
    },
    {
      radio_name: 'INTERNACIONAL',
      id: 'gyvuv7wgts5tv',
      country_code: 'US'
    },
    {
      radio_name: 'CHILE',
      id: '3yucd2a52yzuv',
      country_code: 'CH'
    }
  ];
//kw5egh0mb

var urlpa = "https://proxy.radiojar.com/api/stations/cs1r44kv6a5tv/stats/live";
var urlin = "https://proxy.radiojar.com/api/stations/gyvuv7wgts5tv/stats/live";
var urlch = "https://proxy.radiojar.com/api/stations/3yucd2a52yzuv/stats/live";
var urlimg = "https://raw.githubusercontent.com/hjnilsson/country-flags/master/png100px/";
var data;
var radio;
xmlhttp.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    data = JSON.parse(this.responseText);
    //console.log("data: ", data);
    getCountries(data, "PANAMA");
  }
};


xmlhttp2.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    data = JSON.parse(this.responseText);
    //console.log("data: ", data);
    getCountries(data, "INTERNACIONAL");
  }
};

xmlhttp3.onreadystatechange = function () {
  if (this.readyState == 4 && this.status == 200) {
    data = JSON.parse(this.responseText);
    //console.log("data: ", data);
    getCountries(data, "CHILE");
  }
};

xmlhttp.open("GET", urlpa, true);
xmlhttp.send();

xmlhttp2.open("GET", urlin, true);
xmlhttp2.send();

//xmlhttp3.open("GET", urlch, true);
//xmlhttp3.send();

function getCountries(data, radio_name) {
  var out = "";
  var i, j, totlist = 0;
  var countries = data.data;
  var pagina = document.getElementById("pagina");
  var divMarco = document.createElement("div");
  divMarco.className = "w3-container w3-row w3-border tabs";
  divMarco.id = radio_name;
  if (radio_name != "PANAMA")
    divMarco.style.display = "none";

  var divRadio = document.createElement("div");
  var headerRadio = document.createElement("header");
  var hHeader = document.createElement("h2");
  var textoHeader = document.createTextNode(radio_name);
  headerRadio.className = "w3-center";

  divRadio.className = "w3-container w3-third w3-white w3-round-large w3-padding";
  //divRadio.style.width = "95%";
  hHeader.appendChild(textoHeader);
  headerRadio.appendChild(hHeader);
  divRadio.appendChild(headerRadio);

  var divGraph = document.createElement("div");
  var graphCountries = document.createElement("canvas");
  graphCountries.style.width = "100%";
  graphCountries.style.maxWidth = "800px";
  graphCountries.id = "myChart" + radio_name;
  //graphCountries.style.boxSizing = "border-box";
  divGraph.appendChild(graphCountries);
  divGraph.className = "w3-container w3-twothird w3-round-large w3-padding";
  //divGraph.style.width ="95%";
  var xValues = [];
  var yValues = [];
  var barColors = []; //['#633517', '#a6001a', '#e06000', '#ee9600', '#ffab00', '#004d33', '#00477e' ];

  var tableCountry = document.createElement("table");
  tableCountry.className = "w3-table-all w3-xlarge";
  var tot = 0;
  for (i = 0; i < countries.length; i++) {
    tot += countries[i].count;
    var theadCountry = document.createElement("thead");
    theadCountry.className = "w3-dark-grey";
    var thCountry = document.createElement("th");
    thCountry.colSpan = "2";
    var textoCountry = document.createTextNode(countries[i].country_name + "(" + countries[i].count + ")");
    var imgCountry = document.createElement("img");
    //"<IMG src=\"" + urlimg + "\"" + countries[i].country_code.toLowerCase() + ".png\" height=\"20px\" >";
    imgCountry.style.height = "20px";
    imgCountry.src = urlimg + (countries[i].country_code != null ? countries[i].country_code.toLowerCase() : countries[i].country_name.substring(0,2).toLowerCase() ) + ".png";
    thCountry.appendChild(imgCountry);
    thCountry.appendChild(textoCountry);
    theadCountry.appendChild(thCountry);
    tableCountry.appendChild(theadCountry);

    var cities = countries[i].cities;
    console.log(cities);
    for (j = 0; j < cities.length; j++) {
      var trCity = document.createElement("tr")
      var tdCity = document.createElement("td");
      var textCity = document.createTextNode(cities[j].city ?? 'Unknow City');
      tdCity.appendChild(textCity);
      trCity.appendChild(tdCity);
      textCity = document.createTextNode(cities[j].count);
      var tdCity = document.createElement("td");
      tdCity.appendChild(textCity);
      trCity.appendChild(tdCity);
      tableCountry.appendChild(trCity);
    }
    divRadio.appendChild(tableCountry);
    xValues.push(countries[i].country_name);
    yValues.push(parseInt(countries[i].count));
    var o = Math.round, r = Math.random , s = 128;
    barColors.push('rgba(' + o(r() * s) + ',' + o(r() * s) + ',' + o(r() * s) + ',' + r().toFixed(1) + ')');

  }
  textoHeader = document.createTextNode(" (" + tot + ")");
  hHeader.appendChild(textoHeader);

  new Chart(graphCountries, {
    type: "bar",
    data: {
      labels: xValues,
      datasets: [{
        label:"oyentes",
        backgroundColor: barColors,
        data: yValues,
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      scales: {
        y: { beginAtZero: true, }
      },
      indexAxis: 'y',//layout:{padding:20},
      legend: { display: true },
      title: {
        display: true,
        text: "PAISES"
      }
    }
  });
  //divCountry.appendChild(divGraph);
  console.log(radio_name)
  divMarco.appendChild(divRadio);
  divMarco.appendChild(divGraph);
  pagina.appendChild(divMarco);
}

function openTab(evt, cityName) {
  var i, x, tablinks;
  x = document.getElementsByClassName("tabs");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < x.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" w3-white", "");
  }
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " w3-white";
}
