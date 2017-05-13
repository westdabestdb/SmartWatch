$('.bandcolor').click(function() {
	$('#band').css('background-color', $(this).data('color'));
});


window.onload = function() {
 var h, m, s;
 getTwelveHrs();
 getTwentyFourHrs();

 function getTwelveHrs() {
  var tag = 'AM';
  checkTime();
  if(h > 12) {
   h -= 12
   tag = 'PM';
  }
  t = setTimeout(function() {
   getTwelveHrs()
  }, 1000);
 }

 function getTwentyFourHrs() {
  checkTime();
  document.getElementById('time').innerHTML = h + ':' + m ;
  var t = setTimeout(function() {
   getTwentyFourHrs()
  }, 1000);
 }

 function checkTime() {
  var today = new Date();
  h = today.getHours();
  m = today.getMinutes();
  s = today.getSeconds();
  if(h < 10)
   h = '0' + h;
  if(m < 10)
   m = '0' + m;
  if(s < 10)
   s = '0' + s;
  return h, m, s;
 }


  navigator.geolocation.getCurrentPosition(function(position) {
  	console.log("got settings");
    loadWeather(position.coords.latitude+','+position.coords.longitude); //load weather using your lat/lng coordinates
  });


}

function displayTwelveHrs() {
 document.getElementById('twentyFourHrs').style.display = 'none';
 document.getElementById('twelveHrs').style.display = '';
}

function displayTwentyFourHrs() {
 document.getElementById('twelveHrs').style.display = 'none';
 document.getElementById('twentyFourHrs').style.display = '';
}

function loadWeather(location, woeid) {
  $.simpleWeather({
    location: location,
    woeid: woeid,
    unit: 'f',
    success: function(weather) {
    	console.log("got weathwe");
    	$('.display').find('.time, #degree, #humidity, #weather, .location, .motto').show();
      	$('#weather').html('<i id="weather" class="icon-'+weather.code+'"></i>');
      	if(weather.temp > 75) {
        	$('.display').css('background-color', '#F7AC57');
      	} else {
        	$('.display').css('background-color', '#0091c2');
      	}
    	$('#degree').text(weather.alt.temp + "°");
    	$('#location').text(weather.city);
    	$('#humidity').html(weather.humidity + "% <span>humidity</span>");
      	
      	$('.spinner').fadeOut();
    },
    error: function(error) {
      $("#weather").html('<p>'+error+'</p>');
    }
  });
}
 
