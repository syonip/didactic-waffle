<template>
  <section v-if="books">
  
    <book-filter @set-filter="setFilter"></book-filter>
    <h2>We h-if="editedBook || isCreateMode" :book="editedBook" @save="saveBook">
    </book-edit>
  
  </section>
</template>

<script>
import BookService from '../services/book.service8'

export default {
  name: 'book-list',
  created() {
    bookService.getBooks().then(books => {
      // console.log(books);
      this.books = books
      // books has become REACTIVE!
      // console.log(this.books);
    })
  },
  data() {
    return {
      books: null,
      selectedBook: null,
      editedBook: null,
      isCreateMode: false,
      bookFilter: null
    }
  },
  computed: {
    booksToShow() {
      if (!this.bookFilter) return this.books;
      return this.books.filter(book => {
        return book.title.includes(this.bookFilter.byText)
      });
    }
  },
  methods: {
    selectBook(book) {
      this.selectedBook = book;
    },
    resetSelected() {
      this.selectedBook = null;
    },
    selectNext() {
      this.selectedBook = bookService.getNext(this.selectedBook);
    },
    editBook(book) {
      console.log('Editing the book', book)
      this.editedBook = book;
    },
    deleteBook(book) {
      bookService.deleteBook(book);
    },
    saveBook(book) {
      bookService.saveBook(book);
      this.editedBook = null;
      this.isCreateMode = false;
    },
    setFilter(newFilter) {
      console.log('newFilter', newFilter);
      this.bookFilter = newFilter;
    },
    addToCart(book) {
      cartService.addToCart(book);
    }
  }
}
</script>

<style scoped>

</style>
