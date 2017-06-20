'use strict';
console.log('App is loading...');

var app = new Vue({
    el: '#app',
    data: {
        msg: 'Hello'
    },
    created() {
        setInterval(()=>{this.msg = randomStr()}, 1000);

    },
    computed: {
       reversedMsg() {
            return this.msg.split('').reverse().join('');
       } 
    }
})

function randomStr(size = 10)
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    for( var i=0; i < size; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}


