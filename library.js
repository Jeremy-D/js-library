//=====================================================
//make the modal window
//=====================================================
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
var btn = document.getElementById('myBtn');

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
	modal.style.display = 'block';
};

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
	modal.style.display = 'none';
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
	if (event.target == modal) {
		modal.style.display = 'none';
	}
};

//=====================================================
//library code
//=====================================================

let bookCount = 2;
let myLibrary = [];
const container = document.querySelector('.container');
const addBook = document.querySelector('#myBtn');
const myForm = document.querySelector('#myForm');
let cards = [];

//book constructor function
function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;

	this.info = function() {
		return `${this.title} by ${this.author}, ${String(this.pages)} pages. You have ${this.read ? "" : "not "} read this book.`;
	};
}

//reset form data after it is submitted
//handle the submit
myForm.addEventListener("submit", function(){
	handleSubmit(event);
	myForm.reset();
	modal.style.display = 'none';
});

//create a new book object when form is submitted and display it on the page
function handleSubmit(event) {
	event.preventDefault();

	bookCount ++;
  const userBook = new Book(event.target[0].value, event.target[1].value, event.target[2].value, event.target[3].checked);

  addBookToLibrary(userBook);
  putBookOnPage(bookCount);
}

//handleInputChange 
function handleInputChange(event) {
  const target = event.target;
  const value = target.value;
  const name = target.name;
}

//add book object to library
function addBookToLibrary(book) {
	myLibrary.push(book);
}

function putBookOnPage(i) {
	container.insertAdjacentHTML('beforeend', 	
		`<div class="book" id="${i}" data-book-number="${i}"> 
		 		<div class="content" id="content${i}">
 					<h2>${myLibrary[i].title}</h2>
 					<span> by ${myLibrary[i].author}</span>
 					<span> ${myLibrary[i].pages} pages</span>
 					<br>
 					<span class="status"> You have ${myLibrary[i].read ? "" : "not "} read this book.</span>
 				<div>
 				<br>
				<div>
					<button class='delete' onclick="deleteBook(event, ${i})"> Remove Book </button>
					<button class='toggle-read' onclick="toggleRead(event, ${i})">Toggle Read</button>
				</div>
			</div>
		</div>`
	);
}
//delete element by its data-attribute
function deleteBook(event, i) {
	let burnedBookNum = i;
	let burnedBookElement = document.getElementById(i);
	burnedBookElement.remove();
	//other way to grab book element
		//event.srcElement.parentNode.parentNode.remove();
}

function toggleRead(event, i) {
	console.log('hell0o');
	if (myLibrary[i].read === true) {
		myLibrary[i].read = false;
	} else {
		myLibrary[i].read = true;
	}

	let newId = i + 'prime';
 	let changeBookElement = document.getElementById(`content${i}`);
 	changeBookElement.innerHTML = `
		<h2>${myLibrary[i].title}</h2>
		<span> by ${myLibrary[i].author}</span>
		<span> ${myLibrary[i].pages} pages</span>
		<br>
		<span class="status"> You have ${myLibrary[i].read ? "" : "not "} read this book.</span>
		<br>
		<div>
			<button class='delete' onclick="deleteBook(event, ${i})"> Remove Book </button>
			<button class='toggle-read' onclick="toggleRead(event, ${i})">Toggle Read</button>
		</div>`;
}

//add dummy objects to the list
const book1 = new Book('Farenheit 451', 'Ray Bradbury', 358, false);
const book2 = new Book('1984', 'George Orwell', 256, false);
const book3 = new Book('Obelisk Gate', 'N.K. Jemisin', 520, true);

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);

//render dummy library
function render(library) {
	var testArr = [];
	for (var i = 0; i < library.length; i++) {
		putBookOnPage(i);
		cards[i] = document.getElementById(`${i}`);
	}
}

render(myLibrary);