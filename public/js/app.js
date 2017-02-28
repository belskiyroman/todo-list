$(function() {

    var TaskModel = Backbone.Model.extend({

        idAttribute: '_id',

        defaults: function() {
            return {
                title: '',
                priority: '',
                done: false
            };
        },

        validate: function(attr) {
            var message = 'Все поля обязательны для заполнения';
            if (!attr.title.length) return message;
        },

        toggle: function() {
            this.save({
                done: !this.get('done')
            });
        }

    });

    var TaskView = Backbone.View.extend({

        tagName: 'article',

        className: 'row-field clearfix task',

        template: JST['task.html'],

        events: {
            'click .yes': 'setTitle',
            'click .no': 'clearChange',
            'click .edit': 'editTask',
            'click .remove': 'removeTask',
            'click .statusTask': 'changeStatus',
            'keyup .editTitle': 'applyChange'
        },

        initialize: function () {
            this.listenTo(this.model, 'change', this.render);
            this.render();
        },

        render: function () {
            var isDone = this.model.get('done');
            var attrVal = this.model.get('_id');
            this.$el.attr('id', attrVal);
            this.$el.toggleClass('done', isDone);
            this.$el.html(this.template(this.model.toJSON()));
            return this;
        },

        editTask: function () {
            this.$('.task-text [name="edit-task"]').val( this.model.get('title') );
            this._toggleModeEdit();
            this.$('.task-text [name="edit-task"]').focus();
        },

        setTitle: function () {
            var newTitle = this.$('.editTitle').val();
            var oldTitle = this.model.get('title');
            
            if (newTitle === oldTitle) {
                this.clearChange();
            }

            this.model.set('title', newTitle);
            this.model.save();
        },

        applyChange: function (e) {
            if (e.keyCode === 13 && e.target.value.length) {
                this.setTitle();
            }
        },

        clearChange: function () {
            this.$('.editTitle').val('');
            this._toggleModeEdit();
        },

        removeTask: function() {
            this.remove();
            this.model.destroy();
            return this;
        },

        changeStatus: function() {
            this.model.toggle();
            return this;
        },

        _toggleModeEdit: function () {
            this.$('.task-text').children().toggle();
            this.$('.btns-wrap').children().toggle();
        },

    });

    var TaskCollection = Backbone.Collection.extend({

        model: TaskModel,

        initialize: function (models, options) {
            this.url = options.url;
            this.fetch();
        }
        
    });



    var ProjectModel =  Backbone.Model.extend({

        idAttribute: '_id',
        
        defaults: function () {
            return {
                title: ''
            };
        }

    });
    
    var ProjectView =  Backbone.View.extend({

        tasks: TaskCollection,

        tasksView: TaskView,

        tagName: 'section',

        className: 'col-lg-offset-2 col-lg-8 project',

        template: JST['project.html'],

        events: {
            'keyup [name="task-describe"]': 'addTask',
            'click .add-task-go': 'addTask',
            'click header .yes': 'setTitle',
            'click header .no': 'cancel',
            'click header .edit': 'edit',
            'click header .remove': 'close',
            'keyup input.project-header': 'setTitle',
            'keyup  input.project-header': 'cancel'
        },

        initialize: function () {
            this.render();
            this.tasks = new this.tasks([], {
                url: this.model.url() + '/tasks'
            });
            this.listenTo(this.tasks, 'add', this.renderTaskList);
            this.listenTo(this.model, 'change:title', this.changeTitle);
        },

        render: function () {
            var _self = this;
            this.$el.html(this.template(this.model.toJSON()));
            this.$('.task-list').sortable({
                handle: ".move",
                update: function (event) {
                    var data = $(this).sortable('toArray');

                    _.each(data, function (id, priority) {
                        var model = _self.tasks.get(id);
                        model.save({'priority': priority}, {wait: true});
                    });
                }
            });
            return this;
        },

        renderTaskList: function (model) {
            var task = new this.tasksView({
                model: model
            });
            this.$('.task-list').append(task.$el);
            return this;
        },

        addTask: function (e) {
            var KEY_CODE_OF_ENTER = 13;
            
            if (e.type === 'keyup' && e.keyCode !== KEY_CODE_OF_ENTER) return;

            var $input = this.$('.add-task input');
            var title = $input.val();
            
            if (!title.length) return;
            
            $input.val('');

            this.tasks.create({
                title: title,
                priority: this.tasks.models.length
            }, {wait: true});
        },

        close: function () {
            this.remove();
            this.model.destroy();
        },

        edit: function () {
            this.$('.project-header').show().focus();
            this.$('span.project-header').hide();
            this.$('.project-tools').toggle();
        },

        changeTitle: function  (model) {
            this.$('input.project-header').hide();
            this.$('span.project-header').html( model.get('title') ).show();
            this.$('.project-tools').toggle();
        },

        cancel: function  (e) {
            var eventMatch = (e.keyCode === 27 || e.type === 'click');
            var title = this.model.get('title');
            if (eventMatch && title.length) {
                this.changeTitle(this.model);
                this._clearInputProject();
            }
        },

        setTitle: function  (e) {
            var eventMatch = (e.keyCode === 13 || e.type === 'click');
            var title = this.$('input.project-header')[0].value;
            if (eventMatch && title.length) {
                this.model.save('title', title);
                this._clearInputProject();
            }
        },

        _clearInputProject: function () {
            this.$('header input').val('');
        }

    });

    var ProjectCollection = Backbone.Collection.extend({
        
        url: '/projects',

        model: ProjectModel,

        initialize: function () {
            this.fetch();
        }

    });

    var ProjectViewCollection = Backbone.View.extend({

        el: '.content',

        view: ProjectView,

        initialize: function (options) {
            this.collection = options.collection;
            this.listenTo(this.collection, 'add', this.render);
        },

        render: function (model) {
            var project = new this.view({model: model});
            this.$el.append(project.$el);
        },

        newProject: function () {
            this.collection.create({}, {wait: true});
        }

    });


    var projects = new ProjectCollection();
    var projectsList = new ProjectViewCollection({collection: projects});


    var AddPrejectsButton = Backbone.View.extend({

        el: '#add-project',

        template: JST['addProjects.html'],

        events: {
            'click .add-task-go': 'addTask'
        },

        initialize: function (options) {
            this.render();
            this.options = options;
        },

        render: function () {
            this.$el.html(this.template());
        },

        addTask: function () {
            this.options.handler();
        }

    });

    new AddPrejectsButton({handler: projectsList.newProject.bind(projectsList)});


});


