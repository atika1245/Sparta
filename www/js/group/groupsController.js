define(["app","js/group/groupView", "js/groupModel"], function(app, GroupView, Group) {

	var group = null;
	var bindings = [{
		element: '.group-edit-link',
		event: 'click',
		handler: runEditMode
	}];

	function init(query){
		var groups = JSON.parse(localStorage.getItem("f7Groups"));
		if (query && query.id) {
			group = new Group(_.find(groups, { id: query.id }));
		}
		GroupView.render({
			model: group,
			bindings: bindings
		});
	}

	function runEditMode() {
		app.router.load('groupEdit', {id: group.id });
	}

	return {
		init: init
	};
});