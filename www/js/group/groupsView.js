define(['js/groupModel', 'hbs!js/group/group'], function(Group, viewTemplate) {
	var $ = Dom7;

	function render(params) {
		$('.group-page').html(viewTemplate({ model: params.model }));
		bindEvents(params.bindings);
	}

	function bindEvents(bindings) {
		for (var i in bindings) {
			$(bindings[i].element).on(bindings[i].event, bindings[i].handler);
		}
	}

	return {
		render: render
	}
});