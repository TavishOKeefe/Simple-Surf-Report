import { Report } from './report.js';
import $ from 'jquery';

$(document).ready(function() {
  $('#submitReportInfo').click(function(event) {
    event.preventDefault();
    $('.name1').text('');
    let query = $('#word').val();

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
        
        
        
        
        
        $('.name1').append('<ul><li>' + '<strong>' + filtered + '</strong>' + '</li><ul>');
    });
  });
});