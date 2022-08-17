'use strict';

import { copyToClipboard } from './copy-to-clipboard.js';

const emptyLogItem = {
    id: new Date().getTime(),
    date: new Date(),
    text: null,
    result: false
};

function newLogItem() {
    return Object.assign({}, emptyLogItem, {
        date: new Date(),
        id: new Date().getTime()
    });
}

new Vue({
    el: '#app',
    mounted() {},
    methods: {
        removeLine() {
            const text = event.target.parentNode.parentNode.querySelector('input').value || null;
            this.log = this.log.filter(singleItem => singleItem.text != text);
            this.persist();
        },
        formatDate(date) {
            return fecha.format(new Date(date), 'HH:mm:ss');
        },
        persist() {
            clearTimeout(this.timeOut);
            this.timeOut = setTimeout(() => {
                localStorage.setItem('protocol-log', JSON.stringify(this.log));
            }, 1000);
        },
        append() {
            this.log = this.log.concat([newLogItem()]);
            this.persist();
            setTimeout(() => {
                const lis = document.querySelectorAll('li input');
                lis[lis.length - 1].focus();
            }, 100);
        },
        copy() {
            copyToClipboard(
                this.log
                    .filter(({ text }) => Boolean(text))
                    .map(({ date, text }) => {
                        return `${this.formatDate(date)} - ${text}`;
                    })
                    .join('\n')
            );
        },
        clear() {
            if (confirm("Realy clear?")) {
                this.log = [newLogItem()];
                this.persist();
            }
        }
    },
    template: '#user',
    data() {
        return {
            log: JSON.parse(localStorage.getItem('protocol-log')) || [
                newLogItem()
            ],
            timeOut: null
        };
    },
    computed: {}
});
