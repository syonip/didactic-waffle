
// Client Side State of the store
// Kind of caching...
var books = [];

function getBooks() {
  return new Promise(resolve => {
    // simple caching mechanism
    if (books.length) {
      resolve(books);
    }
    else {
      setTimeout(() => {
        books = generateBooks();

        books = books.map(book => {
          book.quantity = 0;
          book.tag = {val : 7 }
          return book;
        })
        
        resolve(books);
      }, 500);
    }

  });
}

function getBookById(bookId) {
  return getBooks().then(books => {
    const book = books.find(book => bookId === book.id);
    return book;
  });
}

function deleteBook(book) {
  console.log('Deleting the book', book)
  var idx = books.indexOf(book)
  books.splice(idx, 1);
}

function getNext(book) {
    // select next in a cyclic way
    var idx = books.indexOf(book);
    return (idx < books.length-1)?  
          books[idx+1] : books[0];
}

function saveBook(book) {
  var idx = books.findIndex(currBook => currBook.id === book.id)
  books.splice(idx, 1, book);
}


// Used to create local data with no AJAX
function generateBooks() {
  const skills = ['JavaScript', 'CSS', 'SASS', 'Node', 'Angular 2', 'VUE'];

  return skills.map(generateBook);
}

function generateBook(skill, i) {
  return {
    id: i + 1,
    title: `Mastering ${skill}`,
    description: `${skill} lorem  ipsum dkhd daklhd dakhdk dakhdk da`,
    price: (i + 1) * 10
  }
}









// function getProductsFromGenericAPI() {
//   const params = {
//     rows:       10,
//     id:        '{index}',
//     price:     '{number|1000}',
//     title: '{lorem|2}',
//     description: '{lorem|10}',
//     pretty: true
//   }

//   return $.getJSON('http://www.filltext.com', params);

// }

export default {
  getBooks,
  deleteBook,
  getNext,
  saveBook
}

