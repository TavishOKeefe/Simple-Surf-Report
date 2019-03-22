class Report {
  constructor(){
  }

  searchAPIforReport(){
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://www.ndbc.noaa.gov/data/realtime2/46029.spec`;
      request.onload = function () {
        if (this.status === 200){
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  };
}

export { Report };