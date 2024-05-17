// function transaction(event){
//     document.location.replace('/transaction');
// }
// also remember to set req.session.customer_id to null
// document.addEventListener('#transaction', functionhere);
document
    .querySelector('#backToProduct')
    .addEventListener("click", function(event) {
        event.preventDefault();
        document.location.replace('/products');
    });