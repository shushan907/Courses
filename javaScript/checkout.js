import { database } from './firebase.js';

const checkout = database.ref(`/checkout`);

const totalButton = () => {
    const checkoutList = document.querySelector('.checkout');
    if(checkoutList.innerHTML) {
        document.getElementById('total').style.display = 'inline';
    } else document.getElementById('total').style.display = 'none';
};

export const addCheckout = (data) => {
    const autoId = checkout.push().key;
    checkout.child(autoId).set({
        course_price: parseInt(data[1].course_price)*1000,
        course_name: data[1].course_name,
        course_totalPrice: parseInt(data[1].course_price)*1000,
        course_count: 1
    })
};

let total; 

(function () {
    checkout.orderByKey().on('value', checkoutdData => {
        const checkoutList = document.querySelector('.checkout');
        checkoutList.innerHTML = '';
        total = 0;
        Object.entries(checkoutdData.val()).map((checkoutdData) => {

            total += parseInt(checkoutdData[1].course_totalPrice);

            const span1 = document.createElement('span');
            const span2 = document.createElement('span');
            const span3 = document.createElement('span');

            checkoutList.appendChild(span1);
            checkoutList.appendChild(span2);
            checkoutList.appendChild(span3);
            
            span1.innerHTML = checkoutdData[1].course_name;
            span2.innerHTML = `<input type="number" value=${checkoutdData[1].course_count} min='0' max='5'>`;
            span3.innerHTML = `${parseInt(checkoutdData[1].course_totalPrice)} AMD`;
            span2.querySelector('input').addEventListener('change', () => {
                setTimeout(() => totalButton(), 0);
                checkout.child(checkoutdData[0]).update({course_count: span2.querySelector('input').value});
                checkout.child(checkoutdData[0]).update({course_totalPrice: `${checkoutdData[1].course_price * span2.querySelector('input').value} AMD`});
                if (span2.querySelector('input').value == 0) {
                    checkout.child(checkoutdData[0]).remove();
                }
            })
        })
    })
})();

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => totalButton(), 2000)
});

document.querySelector('#total').addEventListener('click', () => {
    const checkoutList = document.querySelector('.checkout');
    document.querySelector('.pay').innerHTML = checkoutList.innerHTML;
    document.querySelector('.payList').style.display = 'block';
    document.querySelector('.payList').style.height = '100%'; 
    document.querySelector('.total_price').innerText =` ${total} AMD`;
})

document.querySelector('.x').addEventListener('click', () => {
    document.querySelector('.payList').style.display = 'none';
})