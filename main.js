import { firebaseSettings }from './javaScript/firebase.js' 
firebaseSettings();
document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.sidenav');
    var instances = M.Sidenav.init(elems);
});