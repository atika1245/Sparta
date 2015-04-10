define(["app", "js/groupModel","js/list/listView"], function(app, Group, ListView) {

	/**
	 * Bindings array. Bind DOM event to some handler function in controller
	 * @type {*[]}
	 */
	var bindings = [{
		element: '.groupModel-add-link',
		event: 'click',
		handler: openAddPopup
	}, {
		element: '.list-panel-all',
		event: 'click',
		handler: showAll
	}, {
		element: '.list-panel-favorites',
		event: 'click',
		handler: showFavorites
	}
	];

	var state = {
		isFavorite: false
	};

    function init() {
		var groups = loadGroups();
		ListView.render({
			bindings: bindings,
			model: groups
		});
	}

	function openAddPopup() {
		app.router.load('groupModelEdit', { 'isFavorite': state.isFavorite });
	}

	function showAll() {
		state.isFavorite = false;
		var groups = loadGroups();
		ListView.reRender({ model: groups, header: "Groups" });
	}

	function showFavorites() {
		state.isFavorite = true;
		var groups = loadGroups({ isFavorite: true });
		ListView.reRender({ model: groups, header: "Favorites" });
	}

	function loadGroups(filter) {
		var f7Groups = localStorage.getItem("f7Groups");
		var groups = /*f7Groups ? JSON.parse(f7Groups) : */tempInitializeStorage();
		if (filter) {
			groups = _.filter(groups, filter);
		}
		groups.sort(groupSort);
		groups = _.groupBy(groups, function(group) { return group.groupName.charAt(0); });
		groups = _.toArray(_.mapValues(groups, function(value, key) { return { 'letter': key, 'list': value }; }));
		return groups;
	}

	function tempInitializeStorage() {
		var groups = [
			new Group({ "groupName": "CU Cuteboy"}),
			new Group({ "groupName": "Triamudom"}),
			new Group({ "groupName": "Room39"}),
			new Group({ "groupName": "Dek noi"}),
			new Group({ "groupName": "This is a book"}),
			new Group({ "groupName": "CP200"}),
			new Group({ "groupName": "Group chat"}),
			new Group({ "groupName": "Dekdekbaboon"}),
			new Group({ "groupName": "55555"}),
			new Group({ "groupName": "CU Cutegirl"})
		];
		localStorage.setItem("f7Groups", JSON.stringify(groups));
		return JSON.parse(localStorage.getItem("f7Groups"));
	}

	function groupSort(a, b) {
		if (a.groupName > b.groupName) {
			return 1;
		}
		if (a.groupName === b.groupName) {
			return 1;
		}
		return -1;
	}

    return {
        init: init
    };
});