window.NoteListView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        var notes = this.model.models;        
        var len = notes.length;
        var startPos = (this.options.page - 1) * 8;
        var endPos = Math.min(startPos + 8, len);

        $(this.el).html('<ul class="thumbnails"></ul>');

        for (var i = startPos; i < endPos; i++) {
            $('.thumbnails', this.el).append(new NoteListItemView({model: notes[i]}).render().el);
        }

        $(this.el).append(new Paginator({model: this.model, page: this.options.page, entityname: 'notes'}).render().el);

        return this;
    }
});

window.NoteListItemView = Backbone.View.extend({

    tagName: "li",

    className: "span3",

    initialize: function () {
        this.model.bind("change", this.render, this);
        this.model.bind("destroy", this.close, this);
    },

    render: function () {
        $(this.el).html(this.template(this.model.toJSON()));
        return this;
    }

});