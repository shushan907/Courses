import { instance } from '../main.js';
import { database } from './firebase.js';

export function firebaseSettings() {

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
    
    
    const deleteCourse = (id) => {
        courses.child(id).remove();
    };

    const add = (data, val, side) => {
        const selectCourse = document.querySelector('.selectCourse');
        const h5 = selectCourse.querySelector('h5');
        const p = selectCourse.querySelector('p');
        const img = selectCourse.querySelector('img');
        const one = selectCourse.querySelector('.one');
        const two = selectCourse.querySelector('.two');
        const button = selectCourse.querySelector('button');
        

        selectCourse.style.display = 'block';
        h5.innerHTML = data[1].course_name;
        p.innerHTML = data[1].course_description;
        img.src = data[1].course_logo;
        one.innerHTML = data[1].course_price;
        two.innerHTML = `<i class='far fa-calendar-alt' style='font-size:24px'></i> ${data[1].course_duration}`;
        button.innerHTML = val;
        button.style = `${side}: 10px`;
        console.log(data)
    };

    document.getElementById('addCourse').addEventListener('click', () => {
        if(byId('courseName') && byId('coursePrice') && 
        byId('courseLogo') && byId('courseDescription') && byId('courseDuration')) {
           addCourse();  
        }
    });
    
    (function() {
        const courseList = document.querySelector('.coursesList');
        courses.orderByKey().on('value', data => {
            courseList.innerHTML = '';
            Object.entries(data.val()).map((data) => {

    //-------------------Create Elements-----------------------------------------------
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

    //-------------------Change created elements innerHTML-------------------------------
                h5.innerHTML = data[1].course_name;
                p.innerHTML = data[1].course_description;
                img.src = data[1].course_logo;
                span.innerHTML = data[1].course_price;
                span2.innerHTML = `<i class='far fa-calendar-alt' style='font-size:24px'></i> ${data[1].course_duration}`;
                button.innerHTML = 'Delete';
                buttonAdd.innerHTML = `Add`;
                buttonEdit.innerHTML = 'Edit';

    //-------------------Append Childs---------------------------------------------------
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
                
    // ------------------------buttons click event-----------------------------------------
                button.addEventListener('click', () => {
                    deleteCourse(data[0]);
                })

                buttonAdd.addEventListener('click', () => {
                    add(data, 'Add', 'left');
                    document.querySelector('.selectCourse button').addEventListener('click', () => {
                        instance.select('chosen_courses');
                        const checkout = document.querySelector('.checkout');
                        //checkout.innerHTML = '';
                        const span1 = document.createElement('span');
                        const span2 = document.createElement('span');
                        const span3 = document.createElement('span');
                        checkout.appendChild(span1);
                        checkout.appendChild(span2);
                        checkout.appendChild(span3);
                        span1.innerHTML = data[1].course_name;
                        span2.innerHTML = `<input type="number" value='1' min='0' max='5'>`;
                        span3.innerHTML = `${parseInt(data[1].course_price) * 1000 * span2.querySelector('input').value} AMD`;
                    });

                    instance.select('selected_courses');
                })

                buttonEdit.addEventListener('click', () => {
                    add(data, 'Edit', 'right');
                })
            })
        })
    })();
}