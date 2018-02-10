


/*(function(){
	if(window.myBookmarklet !== undefined) {
		myBookmarklet();
	}
	else {
		document.body.appendChild(document.createElement('script')).src='http://127.0.0.1:8000/static/js/bookmarklet.js?r='+Math.floor(Math.random()*99999999999999999999);
	}
})(); */

/*(function(){
	//jQuert version to load
	var jquery_version = '2.1.4';
	//base URL for website
	var site_url = 'http://127.0.0.1:8000/'; //which url goes here?
	//base URL for static files
	var static_url = site_url + 'static/'; //google what does this do...

	function bookmarklet (#) {
		//code
	};

	//Main jQuery loader script - Check if jQuery is loaded
	if(typeof window.jQuery != 'undefined') {
		bookmarklet();
		} 
	else {
		// Check for conflicts
		var conflict = typeof window.$ != 'undefined';
		// Create the script and point to Google API
		var script = document.createElement('script');
		script.setAttribute('src',
			'http://ajax.googleapis.com/ajax/libs/jquery/' +
			jquery_version + '/jquery.min.js');
			// Add the script to the 'head' for processing
		document.getElementsByTagName('head')[0].appendChild(script);
		// Create a way to wait until script loading
		var attempts = 15;
		(function(){
			// Check again if jQuery is undefined
			if(typeof window.jQuery == 'undefined') {
				if(--attempts > 0) {
				// Calls himself in a few milliseconds
				window.setTimeout(arguments.callee, 250)
				} else {
				// Too much attempts to load, send error
					alert('An error ocurred while loading jQuery')
				}
			} else {
				bookmarklet();
			}
		})();
	}
})()*/
//=====================================================

(function(win, doc, $) {

  'use strict';

  // Don't run script if jQuery isn't loaded
  if (typeof win.jQuery === 'undefined') {
    return;
  }

  var data, fillForm, FormData, len, _rand;

  // Randomize function
  _rand = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  // Load FakerJS library
  $.getScript('//cdnjs.cloudflare.com/ajax/libs/Faker/0.7.2/MinFaker.js')
    .done(function() {
      fillForm();
    })
    .fail(function() {
      win.console.error('ERROR: FakerJS not loaded!');
    });




  /*==========  CREATE DATA OBJECT  ==========*/

  FormData = function(faker) {

    this.faker     = faker;
    this.randomWord = faker.Internet.domainWord();

    this.EntityDetails = this.randomWord + ' Company';
    this.DOI = '01/01/2018';
    this.address1  = faker.Address.streetAddress();
    this.officecontact = _rand(10000000,99999999);
    this.username  = this.randomWord;
    this.username  += _rand(100,99999);
    this.FID = _rand(1000000,9999999);
    this.emailaddress = this.username + '@mailinator.com';
    this.password  = 'Atest1234';
  };


  FormData.prototype.randomizeSelect = function(el) {
    var $el = $(el);

    len  = $el.find('option').length - 1;

    $el.children('option')
      .prop('selected', false)
      .eq( _rand( 1,len + 1 ) )
      .prop('selected', true);
  };


  /*==========  FILL IN THE FORM  ==========*/

  fillForm = function() {
    data = new FormData(win.Faker);

    $('#uniqueEntityNumber').val(data.EntityDetails);
    $('#entityName').val(data.EntityDetails);
    $('#registrationDate').val(data.DOI);
    $('#address1').val(data.address1);
    $('#officeContactNumber').val(data.officecontact);

    $('#fullName').val(data.username);
    $('#cpaIdentityNumber').val(data.FID);
    $('#email').val(data.emailaddress);
    $('#confirmEmail').val(data.emailaddress);
    $('#corppassId').val(data.username);


    $('#password').val(data.password);
    $('#confirmPassword').val(data.password);

    // Randomize all select boxes
    $('select').each(function() {
      data.randomizeSelect(this);
    });

  };

}(window, window.document, window.jQuery));

};