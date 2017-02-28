this["JST"] = this["JST"] || {};

this["JST"]["addProjects.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<button class="btn btn-success add-task-go">\n\t<i class="plus"></i>\n\tAdd TODO List\n</button>';

}
return __p
};

this["JST"]["project.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape, __j = Array.prototype.join;
function print() { __p += __j.call(arguments, '') }
with (obj) {
__p += '<!-- project -->\n<!-- <article class="col-lg-offset-2 col-lg-8 project"> -->\n\t<header class="col-lg-12">\n\t\t<i class="col-lg-1 fa fa-list-alt fa-lg"></i>\n\t\t<!-- Complete the test task for Ruby Garage -->\n\t\t<span class="col-lg-9 project-header" ';
 if (!title) { ;
__p += ' style="display: none" ';
 } ;
__p += '>' +
((__t = ( title )) == null ? '' : __t) +
'</span>\n\t\t<input class="col-lg-9 project-header" type="text" placeholder="Project name..." autofocus  ';
 if (title) { ;
__p += ' style="display: none" ';
 } ;
__p += '>\n\t\t<div class="col-lg-2 project-tools" ';
 if (!title) { ;
__p += ' style="display: none" ';
 } ;
__p += '>\n\t\t\t<i class="col-lg-4 fa fa-pencil edit"></i>\n\t\t\t<i class="col-lg-4">|</i>\n\t\t\t<i class="col-lg-4 fa fa-trash remove"></i>\n\t\t</div>\n\t\t<div class="col-lg-2 project-tools" ';
 if (title) { ;
__p += ' style="display: none" ';
 } ;
__p += '>\n\t\t\t<i class="col-lg-6 fa fa-check btn yes"></i>\n\t\t\t<i class="col-lg-6 fa fa-times btn no"></i>\n\t\t</div>\n\t</header>\n\t<div class="col-lg-12 input-group add-task">\n\t\t<i class="fa fa-plus input-group-addon"></i>\n\t\t<input type="text" name="task-describe" class="form-control" placeholder="Start typing here to create a task...">\n\t\t<div class="input-group-btn">\n\t\t\t<button class="btn btn-success add-task-go">Add Task</button>\n\t\t</div>\n\t</div>\n\t\n\t<div class="task-list clearfix"></div>\n<!-- </article> -->';

}
return __p
};

this["JST"]["task.html"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '<!-- task -->\n<div class="col-lg-1 checkbox-block">\n\t<input type="checkbox" class="statusTask" ' +
((__t = ( (done ? 'checked="checked"' : '') )) == null ? '' : __t) +
'>\n</div>\n<div class="col-lg-9 task-text">\n\t<span class="h4">' +
((__t = ( title )) == null ? '' : __t) +
'</span>\n\t<textarea type="text" class="form-control editTitle" name="edit-task" style="display: none;"></textarea>\n</div>\n<div class="col-lg-2 btns-wrap">\n\t<div class="standart-tools">\n\t\t<i class="fa fa-arrows move"></i>|\n\t\t<i class="fa fa-pencil edit"></i>|\n\t\t<i class="fa fa-trash remove"></i>\n\t</div>\n\t<div class="edit-tools" style="display: none;">\n\t\t<i class="fa fa-check btn yes"></i>\n\t\t<i class="fa fa-times btn no"></i>\n\t</div>\n</div>';

}
return __p
};