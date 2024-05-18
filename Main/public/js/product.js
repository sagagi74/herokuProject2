const dayjs = require('dayjs');

const buyProductQuantity = async (event) => {
    event.preventDefault();

    // getting the product_id
    const pageURL = new URL(window.location.href);
    const urlArr = pageURL.pathname.split('/');
    const product_id = urlArr[urlArr.length - 1];

    const total = 0; // has to be declared because part of table
    const customer_id = 5;  // Assuming you have the customer ID available here
    const created_date = dayjs();
    const ordered = 0; // has to be declared because part of table
    const transaction_id = 0; // has to be declared because part of table
    const dordered = 0; // has to be declared because part of table
    const transactionData = {
        total,
        customer_id,
        created_date,
        ordered,
        transaction_id,
        product_id,
        dordered,
    };
    try {
        const response = await fetch(`/api/products/${product_id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transactionData)
        });
        const result = await response.json();
        if (result.success) {
            console.log('Data inserted successfully:', result);
        } else {
            console.error('Error inserting data:', result.error);
        }
    } catch (err) {
        console.error('Error inserting ');
    }
};
document
    .querySelector('.product-bought')
    .addEventListener('submit', buyProductQuantity);
