require.config({
    paths: {
        handlebars: "lib/handlebars",
        text: "lib/text",
        hbs: "lib/hbs"
    },
    shim: {
        handlebars: {
            exports: "Handlebars"
        }
    }
});
define('app', ['js/router', 'js/utils'], function(Router, Utils) {
	Router.init();
	var f7 = new Framework7({
		modalTitle: 'Sparta',
        animateNavBackIcon: true
	});
    var mainView = f7.addView('.view-main', {
        dynamicNavbar: true
    });
      
	var $$ = Dom7;
	
	$$('.logOutButton').on('click', function () {
        f7.actions([[{
			text: 'Log out',
			red: true,
			onClick: function() {
				f7.closePanel();
				f7.loginScreen();
			}
		}], [{
			text: 'Cancel',
			bold: true
		}]]);
    });

	return {
		f7: f7,
		mainView: mainView,
		router: Router,
		utils: Utils
	};
});