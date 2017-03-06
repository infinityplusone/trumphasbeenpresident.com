/* -----------------------------------
 *
 * Name: index/index.js
 * Author(s): infinityplusone

 * Version:    0.1.4
 * Last Modified: 2017-03-06
 *
 * Notes: 
 *
 */
(function() {
  var start = '2017-01-20T12:00:00-05:00';
  var end = '2021-01-20T12:00:00-05:00';
  var totalLength = moment(end).diff(moment(start), 'seconds', true);
  var urlPath = location.pathname
                          .replace(/\/index\.php/, '')
                          .replace(/[^\/]+\//, '')
                          .replace(/[^A-Za-z0-9\-]+/gim, ' ')
                          .replace(/(^\s*|\s$)/, '');

  var adjectives = [
    'bloodcurdling',
    'breathtakingly awful',
    'embarrassing',
    'horrifying',
    'nightmarish',
    'terrifying',
    'unbearable'
  ];
  var time = {
    year: 0,
    month: 0,
    day: 0,
    hour: 0,
    minute: 0,
    second: 0
  };
  var units = Object.keys(time);
  var counter = document.getElementById('counter');

  // Handlebars stuff
  var tmpl = Handlebars.compile(document.getElementById('template-counter').innerHTML);

  Handlebars.registerHelper('pluralize', function(val, str) {
    return str + (val !== "1" ? 's' : '');
  });

  var adj = urlPath.length>0 ? urlPath : adjectives[Math.floor(Math.random()*adjectives.length)];

  function countUp() {
    var now = moment();
    var from = moment(start);
    var percent = now.diff(from, 'seconds', true)/totalLength * 100;

    units.forEach(function(k, i) {
      var diff = Math.floor(now.diff(from, k, true));
      time[k] = false;
      if(i>1 || diff>1) {
        time[k] = diff.toString();
        from = from.add(diff, k);
      }
    });
    counter.innerHTML = tmpl({
      counter: time,
      percent: percent.toFixed(1),
      adj: adj
    });
  } // countUp

  var clock = setInterval(countUp, 1000);

  document.body.onclick = function() {
    if(clock) {
      clearInterval(clock);
      clock = null;
      // console.log('stopping!');
    }
    else {
      clock = setInterval(countUp, 1000);
      // console.log('starting!');
    }
    
  };

})();