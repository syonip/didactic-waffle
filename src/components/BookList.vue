<template>
  <section v-if="books">
  
    <book-filter @set-filter="setFilter"></book-filter>
    <h2>We have {{books.length}} Books</h2>
    <button @click="isCreateMode=true">+</button>
    <ul>
      <book-preview v-for="currBook in booksToShow" :key="currBook.id" @click.native="selectBook(currBook)" @edit="editBook(currBook)" @delete="deleteBook(currBook)" @add-to-cart="addToCart(currBook)" :book="currBook">
      </book-preview>
    </ul>
    <book-details v-if="selectedBook" @close="resetSelected" @next="selectNext" :book="selectedBook">
    </book-details>
  
    <book-edit v-if="editedBook || isCreateMode" :book="editedBook" @save="saveBook">
    </book-edit>
  
  </section>
</template>

<script>
import bookService from '../services/book.service'
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
