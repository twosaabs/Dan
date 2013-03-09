circulo.AppRouter = Backbone.Router.extend({
	routes: {
		""                    : "listNote" ,
        "users/list"          : "listUser",
        "users/page/:page"    : "listUser",
        "users/add"           : "addUser",
        "users/:id"           : "userDetails",
        "tags/list"           : "listTag",
        "tags/page/:page"     : "listTag",
        "tags/add"            : "addTag",
        "tags/:id"            : "tagDetails",
        "notes/list"           : "listNote",
        "notes/page/:page"     : "listNote",
        "notes/add"            : "addNote",
        "notes/:id"            : "noteDetails",
	},

    initialize: function () {
        this.headerView = new HeaderView();
        this.navigationView = new NavigationView();
        $('.navigation').html(this.navigationView.el);
        $('.header').html(this.headerView.el);
        //return this;
    },
    
	listUser: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var userList = new circulo.UserCollection();
        userList.fetch({success: function(){
            $("#content-app").html(new UserListView({model: userList, page: p}).el);
        }});
        this.headerView.selectMenuItem('add-menu-user');
    },

    userDetails: function (id) {
        var user = new circulo.User({id: id});
        user.fetch({success: function(){
            $("#content-app").html(new UserView({model: user}).el);
        }});
        this.headerView.selectMenuItem();
    },

    addUser: function() {
        var user = new circulo.User();
        $('#content-app').html(new UserView({model: user}).el);
        this.headerView.selectMenuItem('add-menu-user');
    },

    listTag: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var tagList = new circulo.TagCollection();    
        tagList.comparator = function(tag){
            return tag.get("name");
        };    
        tagList.fetch({success: function(){            
            $("#content-app").html(new TagListView({model: tagList, page: p}).el);
        }});
        this.navigationView.selectMenuItem('tags');
        this.headerView.selectMenuItem('home');
    },

    tagDetails: function (id) {
        var tag = new circulo.Tag({id: id});
        tag.fetch({success: function(){
            $("#content-app").html(new TagView({model: tag}).el);
        }});
        this.headerView.selectMenuItem();
    },

    addTag: function() {
        var tag = new circulo.Tag();
        $('#content-app').html(new TagView({model: tag}).el);
        this.headerView.selectMenuItem('add-menu-tag');
    },

    listNote: function(page) {
        var p = page ? parseInt(page, 10) : 1;
        var noteList = new circulo.NoteCollection();

        //var navigationView = new NavigationView();
        noteList.fetch({success: function(){        
            $("#content-app").html(new NoteListView({model: noteList, page: p}).el);
        }}); 
        this.navigationView.selectMenuItem('notes');                          
        this.headerView.selectMenuItem('home');       
    },

    noteDetails: function (id) {
        var note = new circulo.Note({id: id});
        note.fetch({success: function(){
            $("#content-app").html(new NoteView({model: note}).el);
        }});
        this.headerView.selectMenuItem();
    },

    addNote: function() {
        var note = new circulo.Note();
        //$("#navigation").html(null);
        this.navigationView.hideNavigation();
        $('#content-app').html(new NoteView({model: note}).el);
        this.headerView.selectMenuItem('add-menu-note');
    }
});

circulo.AppRouter.instance = function (){
    return new circulo.AppRouter();
};