let page = 1

function displayBooks(data){

const container = document.getElementById("books")
container.innerHTML=""

data.forEach(book => {

container.innerHTML += `
<div class="book">
<h3>${book.title}</h3>
<p>Author: ${book.author}</p>
<p>Category: ${book.category}</p>
<p>Price: ₹${book.price}</p>
<p>Rating: ${book.rating}</p>
</div>
`

})
}

function searchBook(){

const title = document.getElementById("search").value

fetch(`http://localhost:3000/books/search?title=${title}`)
.then(res => res.json())
.then(data => displayBooks(data))
}

function filterProgramming(){

fetch("http://localhost:3000/books/category/Programming")
.then(res => res.json())
.then(data => displayBooks(data))
}

function sortPrice(){

fetch("http://localhost:3000/books/sort/price")
.then(res => res.json())
.then(data => displayBooks(data))
}

function sortRating(){

fetch("http://localhost:3000/books/sort/rating")
.then(res => res.json())
.then(data => displayBooks(data))
}

function topBooks(){

fetch("http://localhost:3000/books/top")
.then(res => res.json())
.then(data => displayBooks(data))
}

function loadMore(){

fetch(`http://localhost:3000/books?page=${page}`)
.then(res => res.json())
.then(data => displayBooks(data))

page++
}