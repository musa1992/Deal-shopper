// add click event listeners to add to list button
// add item to cart
// add to cart item toast indicates how many items are in the cart

let addBtns = document.querySelectorAll('.btn-add-cart')

const cart = (()=>{
    const cartItems = []

    function addToCart(item){
        cartItems.unshift(item)
        return cartItems
    }

    function removeFromCart(item){
        let index = cartItems.findIndex(element => element.name === item)

        cartItems.splice(index,1)
        return cartItems
    }

    function allItems(){
        return cartItems
    }

    function itemsCount(){
        return cartItems.length
    }

    return {
        addToCart,
        removeFromCart,
        allItems,
        itemsCount
    }

})()


function countCartItems(items){
    let itemsCount = document.querySelector('.items-counter')
    itemsCount.classList.remove('hidden')
    itemsCount.textContent = items
}

function sendCartData(){
    // make network call to express server
}


addBtns.forEach((btn)=>{
    btn.addEventListener('click', (e)=>{
        let buttonClicked = e.target
        let parent = buttonClicked.parentElement
        let name= parent.querySelector('.name').innerHTML
        let imgLink = parent.querySelector('.item-img').src
        let prd = {
            name: name,
            image: imgLink
        }
        cart.addToCart(prd)
        countCartItems(cart.itemsCount())
    })
})





