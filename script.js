const addNewBookBtn = document.getElementById("addNewBookBtn");
const title = document.getElementById("title");
const author = document.getElementById("author");
const pages = document.getElementById("pages");
const read = document.getElementById("read");
const unread = document.getElementById("unread");
const library = document.getElementById("library");
const modal = document.getElementById("addBookModal");
const openModalBtn = document.getElementById("add-book-btn");
const closeModalBtn = document.getElementById("close-modal");
const myLibrary = [];


// Book constructor

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

// Adding books to array

const book1 = new Book("The Lord of the Rings","J. R. R. Tolkien","310", true)
myLibrary.push(book1)

function addBook() {
    if (title.value != "" && author.value != "" && pages.value != "") {
        myLibrary.push(new Book(
            title.value,
            author.value,
            pages.value,
            read.checked))
        title.value = ""
        author.value = ""
        pages.value = ""
        modal.style.display = "none";
        showBooks();
    }
}

// Print all books from array

function showBooks() {
    library.innerHTML = ""
    for (let i = 0; i < myLibrary.length; i++) {
        const title = myLibrary[i].title
        const author = myLibrary[i].author
        const pages = myLibrary[i].pages
        const read = myLibrary[i].read
        const cardBookChecked = 
        '<div class="book-card" id="book' + i + '">'+
            '<h1>"'+ title +'"</h1>'+
            '<h4>'+ author +'</h4>'+
            '<p>'+ pages +' pages</p>'+
            '<div class="card-bottom">'+
                '<label class="btn btn-primary active">'+
                    'Read  '+
                    '<input checked type="checkbox" class="me-2" autocomplete="off">'+
                '</label>'+
                '<button class="delete-book" id="delete-button">Delete</button>'+
            '</div>'+
        '</div>';
        const cardBookUnchecked = 
        '<div class="book-card" id="book' + i + '">'+
            '<h1>"'+ title +'"</h1>'+
            '<h4>'+ author +'</h4>'+
            '<p>'+ pages +' pages</p>'+
            '<div class="card-bottom">'+
                '<label class="btn btn-primary active">'+
                    'Read  '+
                    '<input type="checkbox" class="me-2" autocomplete="off">'+
                '</label>'+
                '<button class="delete-book" id="delete-button">Delete</button>'+
            '</div>'+
        '</div>';
        if (read == true) {
        library.innerHTML += cardBookChecked
        }
        else {
            library.innerHTML += cardBookUnchecked
        }
    }
    changeRead()
    delBook()
}
showBooks();

// Change read <-> unread

function changeRead() {
    const readCheckbox = document.querySelectorAll("[type=checkbox]")
    readCheckbox.forEach(button => {
        button.addEventListener("click", (e) => {
            const id = button.parentElement.parentElement.parentElement.getAttribute("id").slice(4);
            if (button.checked == true) {
                myLibrary[id].read = true;
            }
            else {
                myLibrary[id].read = false;
            }
        })
    })
}

// Show & hide modal adding form

openModalBtn.onclick = function() {
    modal.style.display = "block";
}
  
closeModalBtn.onclick = function() {
    modal.style.display = "none";
}
  
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// Enforce min/max chars and numbers on form

function enforceMinMaxNum(el) {
    if (el.value != "") {
      if (parseInt(el.value) < parseInt(el.min)) {
        el.value = el.min;
      }
      if (parseInt(el.value) > parseInt(el.max)) {
        el.value = el.value.slice(0, 3);
      }
    }
}

function enforceMinMaxTitle(el) {
    if (el.value != "") {
      if (el.value.length < parseInt(el.min)) {
        el.value = el.value.slice(0, 50);
      }
      if (el.value.length > parseInt(el.max)) {
        el.value = el.value.slice(0, 50);
      }
    }
}

function enforceMinMaxAuthor(el) {
    if (el.value != "") {
      if (el.value.length < parseInt(el.min)) {
        el.value = el.value.slice(0, 30);
      }
      if (el.value.length > parseInt(el.max)) {
        el.value = el.value.slice(0, 30);
      }
    }
}

// Delete book from array and page

function delBook() {
    const delBtn = document.querySelectorAll(".delete-book")
    delBtn.forEach(button => {
        button.addEventListener("click", (e) => {
            const id = button.parentElement.parentElement.getAttribute("id").slice(4)
            myLibrary.splice(id, 1)
            showBooks()
        })
    })
}


// Eventlisteners 

read.addEventListener('click', (e) => {
    read.setAttribute('checked', 'checked');
    unread.removeAttribute('checked');
});

unread.addEventListener('click', (e) => {
    unread.setAttribute('checked', 'checked');
    read.removeAttribute('checked');
});

addNewBookBtn.addEventListener('click', (e) => addBook());

