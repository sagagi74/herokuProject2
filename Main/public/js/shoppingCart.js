
$(document).ready(function($) {
    $(".btn-dark").click(function() {
        window.location = $(this).data("href");
    });
});



document
.querySelector('#backToProduct')
.addEventListener("click", function(event) {
event.preventDefault();
document.location.replace('/products');
});

document
.querySelector('#transaction')
.addEventListener("click", async () => {
try {
    await fetch('/api/transaction/complete', {
        method: 'PUT',
    });
  } catch (err) {
    console.log('Error on POST');
}


});