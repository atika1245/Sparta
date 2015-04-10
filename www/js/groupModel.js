define(['app'],function(app) {

    function Group(values) {
		values = values || {};
		this.id = values['id'] || app.utils.generateGUID();
		this.picId = values['picId'] || app.utils.getRandomInt(1,10);
		this.createdOn = values['createdOn'] || new Date();

		this.groupName = values['groupName'] || '';
		this.isFavorite = values['isFavorite'] || false;
    }

	Group.prototype.setValues = function(inputValues) {
		for (var i = 0, len = inputValues.length; i < len; i++) {
			var item = inputValues[i];
			if (item.type === 'checkbox') {
				this[item.id] = item.checked;
			}
			else {
				this[item.id] = item.value;
			}
		}
	};

	Group.prototype.validate = function() {
		var result = true;
		if (_.isEmpty(this.groupName)) {
			result = false;
		}
		return result;
	};

    return Group;
});