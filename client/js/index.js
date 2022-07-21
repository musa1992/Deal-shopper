// add click event listeners to add to list button
// add item to cart
// add to cart item toast indicates how many items are in the cart

let addBtns = document.querySelectorAll('.btn-add-cart')
let productCategoryLinks = document.querySelectorAll('.category-item')
const API_URL = 'http://localhost:8000'

const categories = ['flour','sugar','cooking oil', 'milk', 'cooking ingredients', 
    'rice & grains', 'beverages', 'baking', 'breakfast cereals', 'laundry', 'paper & rolls', 'toilet cleaning']

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

async function getAllProducts(){
    const response = await fetch(`${API_URL}/products`)
    return await response.json()
}

function createElement(type, attrs = {}){
    const element = document.createElement(type)
    for(let attr in attrs){
        const value = attrs[attr]
        if (attr == 'innerText'){
            element.innerText = value
        }else {
            element.setAttribute(attr,value)
        }
    }

    return element
}

function createProductCard(productName, productQuantity, image){
    const card = createElement('div', {class: 'item'})
    const productImage = createElement('img', {class: 'item-img', src: image})
    const itemInfo = createElement('div', {class: 'item-info'})
    const name = createElement('p', {class: 'name', innerText: productName})
    const quantity = createElement('p', {class: 'quantity', innerText: productQuantity})
    itemInfo.append(name,quantity)
    
    const button = createElement('button', {class: 'btn-add-cart', innerText: 'ADD TO LIST'})
   

    card.append(productImage,itemInfo,button)

    return card
}


getAllProducts().then((products)=>{
    const productSection = document.querySelector('.products')

    categories.forEach((category)=>{
        const productWrapper = createElement('div', {class: 'products-wrapper'})
        const productCategory = createElement('div', {class: 'product-category'})
        const categoryTitle = createElement('h2', {innerText: category})
        productCategory.append(categoryTitle)
        const productContainer = createElement('div', {class: 'products-container'})
        const productGrid = createElement('div', {class: 'product-grid grid'})

        let product = products.filter(el => el.category.toLowerCase() === category.toLowerCase())
        
        

        for (let index = 0; index < 6; index++) {
            if(product.length === 0 || typeof(product[index]) === 'undefined' ){
                break
            }
            let element = product[index]
            let productCard = createProductCard(element.name, element.quantity, element.image)
            productGrid.appendChild(productCard)
            
        }
        productContainer.appendChild(productGrid)

        productWrapper.append(productCategory,productContainer)

        productSection.appendChild(productWrapper)

    })

})

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


async function getCategory(category){
    const response = await fetch(`${API_URL}/products/${category}`)
    return await response.json()

}
productCategoryLinks.forEach((link)=>{
    link.addEventListener('click', (e)=>{
        let clickedLink = e.target
        let category = clickedLink.dataset.name
        getCategory(category).then((res)=>{
            console.log(res)
        })
        
    })
})







