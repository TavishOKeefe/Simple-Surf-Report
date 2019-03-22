import { Report } from './report.js';
import $ from 'jquery';
import './styles.css';

$(document).ready(function() {
  $('#submitReportInfo').click(function(event) {
    event.preventDefault();
    $('.name1').text('');

    let newReport = new Report();
    let promise = newReport.searchAPIforReport();

    promise.then(function (response) {
      let result = 0;
      let body = response.split('2019');
      let data = body[1].split(' ');
      var filtered = data.filter(function(value, index, arr){
        if( value != ''){
          return value;
        }
      });
      if (filtered[10] === 'E'){
        result += 5;
      } else if (filtered[10] === 'NE' || filtered[10] === 'SE'){
        result += 4;
      } else if (filtered[10] === 'S'){
        result += 3;
      } else {
        result +=1; 
      };
      let swellPeriod = parseFloat(filtered[6]);
      let swellHeight = parseFloat(filtered[5]);
      if (swellPeriod >= 16){
        result +=5;
      } else if (swellPeriod >= 12 && swellPeriod <= 15){
        result +=4;
      } else if (swellPeriod >= 10 && swellPeriod < 12){
        result +=3;
      } else if (swellPeriod < 10){
        result +=1;
      };
      let waveSize = (swellPeriod * swellHeight);
      if (waveSize > 30){
        result +=5;
      } else if (waveSize <= 30 && waveSize >= 25){
        result +=4;
      } else if (waveSize < 25 && waveSize >= 20){// instructions left wave size between 24-25 undefined. Made correction.
        result +=3;
      } else if (waveSize <=19 && waveSize >= 10){
        result +=2;
      } else if (waveSize < 10){ // instructions left wave size between 10-11 undefined. Made correction.
        result +=1;
      }
      
      let currentScore = (result/3);
        
      filtered.forEach(function(day){
        $('.name1').append('|' + ' ' + '<strong>' + day + '</strong>' + ' ' + '|');
      });
        
      $('.score').append('<strong>' + currentScore + '</strong>');
    });
  });
});