window.Note = window.Model.extend({
	urlRoot: "rest/notes",

	initialize: function(){
		this.validators = {};

	    this.validators.subject = function (value) {
	        return value.length > 0 ? {isValid: true} : {isValid: false, message: "You must enter a subject for the tag"};
	    };
	},

	defaults: {
		id: null,
		subject: "",
		content: "",
		createdOn: "1979-11-17",
		modifiedOn: "1979-11-17"
	}
});

window.NoteCollection = Backbone.Collection.extend({
	model: Note,
	url: "rest/notes"
});