const API_URL = 'http://localhost:8000'





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

async function getCategory(category){
    const response = await fetch(`${API_URL}/products/${category}`)
    return await response.json()

}

const item = JSON.parse(window.localStorage.getItem('category'))
const category = item["category"]

getCategory(category).then((products)=>{
    const categoryTitle = products[0].category
    const productSection = document.querySelector('.products')
    const productWrapper = createElement('div', {class: 'products-wrapper'})
    const productCategory = createElement('div', {class: 'product-category'})
    const title = createElement('h2', {innerText: categoryTitle})
    productCategory.append(title)
    const productContainer = createElement('div', {class: 'products-container'})
    const grid = createElement('div', {class: 'product-grid grid'})

    for (let index = 0; index < products.length; index++) {
        if(products.length === 0 || typeof(products[index])=== 'undefined'){
            break
        }
        const product = products[index]
        const card = createProductCard(product.name, product.quantity, product.image)
        grid.appendChild(card)
        
    }

    productContainer.append(grid)
    productWrapper.append(productCategory,productContainer)
    productSection.append(productWrapper)
    
})

