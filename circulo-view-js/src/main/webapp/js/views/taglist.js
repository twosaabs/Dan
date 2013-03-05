window.TagListView = Backbone.View.extend({

    initialize: function () {
        this.render();
    },

    render: function () {
        var tags = this.model.models;
        var len = tags.length;
        var startPos = (this.options.page - 1) * 8;
        var endPos = Math.min(startPos + 8, len);

        $(this.el).html('<ul class="thumbnails"></ul>');

        for (var i = startPos; i < endPos; i++) {
            $('.thumbnails', this.el).append(new TagListItemView({model: tags[i]}).render().el);
        }

        $(this.el).append(new Paginator({model: this.model, page: this.options.page, entityname: 'tags'}).render().el);

        return this;
    }
});

window.TagListItemView = Backbone.View.extend({

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