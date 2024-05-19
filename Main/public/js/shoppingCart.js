
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
        document.location.replace('/transactionComplete');
        
    });