function productRedirect(){
    document.location.replace('/products');
}

function transaction(){
    document.location.replace('/transaction');
}

document.addEventListener('transaction', functionhere);
document.addEventListener('backToProduct', productRedirect());