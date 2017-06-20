Vue.component('quest', {
    template: `
        <section>
            <h1>Ask Yes/No Quest</h1>
            <input v-model="question">
            <p>{{ answer }}</p>

        </section>
    `,
    data() {
        return {
            question: '',
            answer: ''
        }
    },
    watch: {
        question(val) {
            if (val.endsWith('?')) {
                this.answer = 'Finding your answer...'
                this.getAnswer().then(ans => this.answer = ans)
            }
        }
    },
    methods: {
       getAnswer() {
           return fetch('https://yesno.wtf/api/')
            .then(res => res.json())
            .then(res => res.answer)
       } 
    }
})