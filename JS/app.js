'use strict'
var productArray = [];
var count = 0;
// CONSTRUCTOR
function Product(names, src) {
  this.names = names;
  this.src = 'img/' + src;
  this.timesClicked = 0;
  this.timesDisplayed = 0;
  this.percentClick = 0;
  productArray.push(this);
}
// METHOD FOR CALCULATING PERCENTAGE
Product.prototype.percent = function () {
  this.percentClick = (+((this.timesClicked / this.timesDisplayed).toFixed(2)) * 100);
};
function generateRandom() {
  return +(Math.floor((Math.random() * productArray.length)));
};
// ALL PRODUCT ARRAY
var allProducts = [new Product('bag', 'bag.jpg'), new Product('banana', 'banana.jpg'), new Product('boots', 'boots.jpg'), new Product('chair', 'chair.jpg'), new Product('cthulhu', 'cthulhu.jpg'), new Product('dragon', 'dragon.jpg'), new Product('pen', 'pen.jpg'), new Product('scissors', 'scissors.jpg'), new Product('shark', 'shark.jpg'), new Product('sweep', 'sweep.jpg'), new Product('unicorn', 'unicorn.jpg'), new Product('usb', 'usb.gif'), new Product('waterCan', 'water-can.jpg'), new Product('wineGlass', 'wine-glass.jpg')];
// TO AVIOD REPEATING PICTURES
var rand1, rand2, rand3;
function random() {
  var img1 = document.getElementById('firstImage');
  rand1 = generateRandom();
  img1.src = allProducts[rand1].src;
  allProducts[rand1].timesDisplayed++;
  var img2 = document.getElementById('secondImage');
  rand2 = generateRandom();
  while (rand1 === rand2 ) {
    rand2 = generateRandom();
  }
  img2.src = allProducts[rand2].src;
  allProducts[rand2].timesDisplayed++;
  var img3 = document.getElementById('thirdImage');
  rand3 = generateRandom();
  while( rand1 === rand3 || rand2 === rand3) {
    rand3 = generateRandom();
  }
  img3.src = allProducts[rand3].src;
  allProducts[rand3].timesDisplayed++;
}
random();
// EVENT HANDLER FOR IMAGE
function handleImage(image) {
  image.timesClicked += 1;
  count += 1;
  image.percent();
  checkButton();
  dataSets1();
  dataSets2();
  dataSets3();
  random();
}
// EVENT LISTENERS FOR IMAGE
firstImage.addEventListener('click', function(){
  handleImage(allProducts[rand1]);
});
secondImage.addEventListener('click', function() {
  handleImage(allProducts[rand2]);
});
thirdImage.addEventListener('click', function() {
  handleImage(allProducts[rand3]);
});
// BUTTON FUNCTION
var hidden;
function checkButton() {
  if (count < 15) {
    results.removeAttribute(hidden);
  } else {
    results.style.display = 'block';
  }
}
// EVENT LISTENER FOR BUTTON
function handleButton() {
  chart1();
  chart2();
}
var button = document.getElementById('results')
// HANDLER FOR BUTTON
button.addEventListener('click', handleButton);
// MAKE DATA ARRAY FOR PERCENT CHART
var percentChart  = [];
function dataSets1() {
  for (var i = 0; i < allProducts.length; i++){
    percentChart[i] =  productArray[i].percentClick;
  }
}
// MAKE PERCENT CHART
var sectionTable = document.getElementById('sectionTable');
function chart1() {
  var nameChart1 = document.getElementById('nameChart1');
  nameChart1.textContent = 'Percent That Item Was Clicked vs Displayed';
  var title1 = document.getElementById("title1");
  var canvasOne = document.getElementById("canvasOne");
  var throwawayNode = title1.removeChild(canvasOne);
  var canvasOne = document.createElement('canvas');
  canvasOne.id = 'canvasOne';
  canvasOne.setAttribute('width', '400');
  canvasOne.setAttribute('height', '400');
  title1.appendChild(canvasOne);
  var data = {
    labels: ['Bag', 'Banana', 'Boots', 'Chair', 'Cthulhu', 'Dragon', 'Pen', 'Scissors', 'Shark', 'Sweep', 'Unicorn', 'USB', 'Water Can', 'Wine Glass'],
    datasets: [
      {
        label: 'Percent of Times Clicked vs Times Displayed',
        fillColor: '#E6E6FA',
        strokeColor: '#E6E6FA',
        highlightFill: "#FFE4B5",
        highlightStroke: "#FFE4B5",
        scaleFontColor: "#DCDCDC",
        data: percentChart
      }
    ]
  };
  var ctx = document.getElementById('canvasOne').getContext('2d');
  var myBarChart = new Chart(ctx).Bar(data);
  document.getElementById('legendOne').innerHTML = myBarChart.generateLegend();
}
// MAKE DATA ARRAY FOR DISPLAYED / CLICKED ITEMS
var displayedChart  = [];
function dataSets2() {
  for (var i = 0; i < allProducts.length; i++){
    displayedChart[i] =  productArray[i].timesDisplayed;
  }
};
var clickedChart  = [];
function dataSets3() {
  for (var i = 0; i < allProducts.length; i++){
    clickedChart[i] =  productArray[i].timesClicked;
  }
};
// MAKE PERCENT CHART
function chart2() {
  var nameChart2 = document.getElementById('nameChart2');
  nameChart2.textContent = 'Times Products Were Clicked vs Displayed';
  var title2 = document.getElementById("title2");
  var canvasTwo = document.getElementById("canvasTwo");
  var throwawayNode = title2.removeChild(canvasTwo);
  var canvasTwo = document.createElement('canvas');
  canvasTwo.id = 'canvasTwo';
  canvasTwo.setAttribute('width', '400');
  canvasTwo.setAttribute('height', '400');
  title2.appendChild(canvasTwo);
  var data = {
    labels: ['Bag', 'Banana', 'Boots', 'Chair', 'Cthulhu', 'Dragon', 'Pen', 'Scissors', 'Shark', 'Sweep', 'Unicorn', 'USB', 'Water Can', 'Wine Glass'],
    datasets: [
      {
        label: 'Times Clicked',
        fillColor: "#E6E6FA",
        strokeColor: "#E6E6FA",
        highlightFill: "rgba(151,187,205,0.75)",
        highlightStroke: "rgba(151,187,205,1)",
        scaleFontColor: "#DCDCDC",
        data: clickedChart
      },
      {
        label: 'Times Displayed',
        fillColor: "#FFE4B5",
        strokeColor: "#FFE4B5",
        highlightFill: "rgba(220,220,220,0.75)",
        highlightStroke: "rgba(220,220,220,1)",
        scaleFontColor: "#DCDCDC",
        data: displayedChart
      }
    ]
  };
  var ctx = document.getElementById('canvasTwo').getContext('2d');
  var myBarChart2 = new Chart(ctx).Bar(data);
  document.getElementById('legendTwo').innerHTML = myBarChart2.generateLegend();
}
