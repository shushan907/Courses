export function firebaseSettings() {
    var firebaseConfig = {
        apiKey: "AIzaSyDEmoq5dItu2tTMFoxYGrlKIY1ast9mEsU",
        authDomain: "staff-39706.firebaseapp.com",
        databaseURL: "https://staff-39706.firebaseio.com",
        projectId: "staff-39706",
        storageBucket: "staff-39706.appspot.com",
        messagingSenderId: "891907238564",
        appId: "1:891907238564:web:c6493e7e43cbbdbb9f9431",
        measurementId: "G-ZB4V6RQJP0"
      };
    
    firebase.initializeApp(firebaseConfig);
    const database = firebase.database();
    
    const byId = (id) => document.getElementById(id).value

    const courses =  database.ref('/courses');
    
    const addCourse = () => {
        const autoId = courses.push().key;
        courses.child(autoId).set({
            course_name: byId('courseName'),
            course_price: `${byId('coursePrice')} AMD`,
            course_logo: byId('courseLogo'),
            course_description: byId('courseDescription'),
            course_duration: byId('courseDuration')
        });

        document.getElementById('courseName').value = '';
        document.getElementById('coursePrice').value = '';
        document.getElementById('courseLogo').value = '';
        document.getElementById('courseDescription').value = '';
        document.getElementById('courseDuration').value = '';
    };
    
    document.getElementById('addCourse').addEventListener('click', addCourse);
    
    const deleteCourse= (id) => {
        courses.child(id).remove();
    };
    
    (function() {
        const courseList = document.querySelector('.coursesList');
        courses.orderByKey().on('value', data => {
            courseList.innerHTML = '';
            Object.entries(data.val()).map((data) => {
    
                const div = document.createElement('div');
                div.classList.add("col", "l4",  "m6", "s12");
                const divContent = document.createElement('div');
                divContent.classList.add("col-content");
                const h5 = document.createElement('h5');
                const p = document.createElement('p');
                const img = document.createElement('img');
                const button = document.createElement('button');
                const buttonAdd = document.createElement('button');
                const buttonEdit = document.createElement('button');
                const span = document.createElement('span');
                const span2 = document.createElement('span');
                h5.innerHTML = data[1].course_name;
                p.innerHTML = data[1].course_description;
                img.src = data[1].course_logo;
                span.innerHTML = data[1].course_price;
                span2.innerHTML = `<i class='far fa-calendar-alt' style='font-size:24px'></i> ${data[1].course_duration}`;
                button.innerHTML = 'Delete';
                buttonAdd.innerHTML = 'Add';
                buttonEdit.innerHTML = 'Edit';
                divContent.appendChild(img);
                divContent.appendChild(h5);
                divContent.appendChild(p);
                divContent.appendChild(span);
                divContent.appendChild(span2);
                divContent.appendChild(buttonAdd);
                divContent.appendChild(button);
                divContent.appendChild(buttonEdit);
                div.appendChild(divContent)
                courseList.appendChild(div);
    
                button.addEventListener('click', () => {
                    deleteCourse(data[0])
                })

                buttonAdd.addEventListener('click', () => {
                    location.href = '#/selected_courses'
                })

                buttonEdit.addEventListener('click', () => {
                    
                })
            })
        })
    })()
}