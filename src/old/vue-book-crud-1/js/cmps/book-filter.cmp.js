Vue.component('book-filter', {
    template: `
        <section class="book-filter">
            <h2>Books Filter</h2>
            <input type="text" v-model="bookFilter.byText" placeholder="Filter By Name" >
        </section>
    `,
    data() {
        return {
            bookFilter: { byText: '', byMaxPrice: 1000 }
        }
    },
    created() {
        this.$watch('bookFilter.byText', function (newVal, oldVal) {
            this.$emit('set-filter', this.bookFilter);
        })

    },
    methods: {

    }
});
