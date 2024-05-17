// function transaction(event){
//     document.location.replace('/transaction');
// }

// document.addEventListener('#transaction', functionhere);
document
.querySelector('#backToProduct')
.addEventListener("click", function(event) {
    event.preventDefault();
    document.location.replace('/products');
});