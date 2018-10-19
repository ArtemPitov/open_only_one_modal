/**
 * Bootstrap 4 Modal.js | FIX Open only one modal 
 * @author ArtemPitov <artempitov@gmail.com>
 * @site https://pitov.pro
 */
var modals = [];

$(document)
	.on('show.bs.modal', '.modal', function() 
	{
		modals.push(this) 

		if (modals.length > 1) {
			var $modal   = $(modals.shift()),
				duration = bootstrap.Util.getTransitionDurationFromElement($modal)	
					
			$modal
				.removeClass('show')
				.attr('aria-hidden', true)
				.one(bootstrap.Util.TRANSITION_END, function () {
					$(this).css('display', 'none')
				})
				.emulateTransitionEnd(duration)		

          	var config = $modal.data('bs.modal')

			if (!!config) {
				config._isShown = false
			}

			$modal.data('bs.modal', config)		

			$('.modal-backdrop')
				.removeClass('show')
				.one(bootstrap.Util.TRANSITION_END, function () {
					$(this).remove()
				})
				.emulateTransitionEnd(duration)
		}
	})
	.on('hide.bs.modal', '.modal', function() {
		if (modals.length == 1 && modals.indexOf(this) != -1) {
			modals = []
		}
	})