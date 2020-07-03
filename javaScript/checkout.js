import { database } from './firebase.js';

const checkout = database.ref('/checkout');

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
        course_totalPrice: data[1].course_price,
        course_count: 1
    })
};

(function () {
    checkout.orderByKey().on('value', checkoutdData => {
        const checkoutList = document.querySelector('.checkout');
        checkoutList.innerHTML = '';
        Object.entries(checkoutdData.val()).map((checkoutdData) => {

            const span1 = document.createElement('span');
            const span2 = document.createElement('span');
            const span3 = document.createElement('span');

            checkoutList.appendChild(span1);
            checkoutList.appendChild(span2);
            checkoutList.appendChild(span3);
            
            span1.innerHTML = checkoutdData[1].course_name;
            span2.innerHTML = `<input type="number" value=${checkoutdData[1].course_count} min='0' max='5'>`;
            span3.innerHTML = `${parseInt(checkoutdData[1].course_totalPrice) * 1000 * checkoutdData[1].course_count} AMD`;
            span2.querySelector('input').addEventListener('change', () => {
                totalButton();
                checkout.child(checkoutdData[0]).update({course_count: span2.querySelector('input').value});
                checkout.child(checkoutdData[0]).update({course_price: `${checkoutdData[1].course_price * checkoutdData[1].course_count} AMD`});
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