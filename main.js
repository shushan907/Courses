import { firebaseSettings } from './javaScript/courses.js';

export var instance;
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
    var el = document.querySelector('.tabs')
    instance = M.Tabs.init(el);
});

firebaseSettings();