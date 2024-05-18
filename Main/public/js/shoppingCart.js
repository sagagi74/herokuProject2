
document
    .querySelector('#backToProduct')
    .addEventListener("click", function(event) {
        event.preventDefault();
        document.location.replace('/products');
    });

document
    .querySelector('#transaction')
    .addEventListener("click", function(event) {
        event.preventDefault();
        // needs to update databases
        
    });