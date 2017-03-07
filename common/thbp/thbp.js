/* -----------------------------------
 *
 * Name: index/index.js
 * Author(s): infinityplusone

 * Version:    0.5.0
 * Last Modified: 2017-03-06
 *
 * Notes: 
 *
 */
(function() {

  var ADJECTIVES = [ 'bloodcurdling', 'breathtakingly awful', 'embarrassing', 'horrifying', 'nightmarish', 'terrifying', 'unbearable'];
  var END = '2021-01-20T12:00:00-05:00'; // End of Presidency
  var START = '2017-01-20T12:00:00-05:00'; // Start of Presidency
  var UNITS = [ 'year', 'month', 'day', 'hour', 'minute', 'second' ];


  Handlebars.registerHelper('pluralize', function(val, str) {
    return str + (val !== "1" ? 's' : '');
  });

  var THBP = {
    adj: ADJECTIVES[Math.floor(Math.random()*ADJECTIVES.length)],
    clock: null,
    templates: {},
    totalLength: moment(END).diff(moment(START), 'seconds', true),
    urlPath: location.pathname.replace(/\/index\.php/, '').replace(/[^A-Za-z\-]+/gim, ' ').replace(/(^\s*|\s$)/, ''),

    $body: null,

    init: function() {
      THBP.$body = $('body');

      if(THBP.urlPath.length>0) {
        THBP.adj = THBP.urlPath;
      }

      // add templates
      $('[data-template-id]').each(function(i, tmpl) {
        THBP.templates[tmpl.getAttribute('data-template-id')] = Handlebars.compile(tmpl.innerHTML);
      });
    
      THBP.$body
        .on('submit', 'form', function(e) {
          this.action = '/' + this.elements[0].value.replace(/\W+/gim, '/');
        })
        .on('click', '.counter', function() {
          THBP.$body.toggleClass('paused');
          if(THBP.clock) {
            clearInterval(THBP.clock);
            THBP.clock = null;
          }
          else {
            THBP.clock = setInterval(THBP.countUp, 1000);
          }
        });

      $(window).on('resize', function() {
        THBP.$body.removeClass('landscape portrait');
        if(window.innerHeight<769 || window.innerWidth<769) {
          if(window.innerWidth>window.innerHeight) {
            THBP.$body.addClass('landscape');
          }
          else {
            THBP.$body.addClass('portrait');
          }
        }
      }).resize();

      // start the clock
      THBP.clock = setInterval(THBP.countUp, 1000);
    }, // init

    countUp: function() {
      var now = moment();
      var from = moment(START);
      var percent = now.diff(from, 'seconds', true)/THBP.totalLength * 100;
      var counter = {};

      UNITS.forEach(function(k, i) {
        var diff = Math.floor(now.diff(from, k, true));
        counter[k] = false;
        if(i>1 || diff>1) {
          counter[k] = diff.toString();
          from = from.add(diff, k);
        }
      });

      THBP.$body.find('.counter').replaceWith(THBP.templates.counter({
        counter: counter
      }));
      THBP.$body.find('.percent').replaceWith(THBP.templates.percent({
        percent: percent.toFixed(1),
        adj: THBP.adj
      }));
      if(THBP.$body.find('.descriptor').width() > (window.innerWidth - 20)) {
        THBP.$body.find('.descriptor').addClass('long');
      }
    } // countUp

  }; // THBP

  $(document).ready(THBP.init);

})();