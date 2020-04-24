<template>
    <div>
        <h1>My Books</h1>

        <a-list :grid="{ gutter: 16, xs: 1, sm: 1, md: 2, lg: 4, xl: 4, xxl: 3 }" :dataSource='books'>
            <a-list-item slot="renderItem" slot-scope="item, index">
                <a-card :title="item.title" @click='inspectBook(index)'>
                    <span class='author'>{{item.author}}</span>
                    <div class='description'>
                        {{item.description}}
                    </div>
                    <div class='availability'>
                        <span v-if='item.available' style='color: green;'>Available</span>
                        <span v-if='!item.available' style='color: red;'>Unavailable</span>
                    </div>
                </a-card>
            </a-list-item>
        </a-list>

        <a-button type='primary' shape = 'circle' id='add-book' @click='editBook(false)'>+</a-button>


        <a-modal :title='currentBook.title' v-model='isInspectingBook' :okText='checkoutOrEdit' @ok='editBook(true)' @cancel='inspectorCanceled'>
            <a-skeleton :loading='isLoadingBook' active='true'/>
            <span v-if='!isLoadingBook' class='author'>{{currentBook.author}}</span>
            <p v-if='!isLoadingBook'>
                {{currentBook.description}}
            </p>
        </a-modal>

        <a-modal title='Edit Data' v-model='editingBook' okText='Submit' :confirmLoading='loadingSubmit' @ok='submitBook'>
            <a-form>
                <a-form-item label='Title'>
                    <a-input type='text' v-model='currentBook.title'/>
                </a-form-item>

                <a-form-item label='Author'>
                    <a-input type='text' v-model='currentBook.author'/>
                </a-form-item>

                <a-form-item label='Description'>
                    <a-textarea type='text' v-model='currentBook.description'/>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
import config from '../config.js'
import Metric from './Metric'
import { authenticatedReq, libraryId } from '../helpers'

String.prototype.trunc =
function( n, useWordBoundary ){
    if (this.length <= n) { return this; }
    var subString = this.substr(0, n-1);
    return (useWordBoundary 
    ? subString.substr(0, subString.lastIndexOf(' ')) 
    : subString) + "&hellip;";
};

export default {
    name: 'Metrics',
    components: { Metric },
    data() {
        return {
            books: [],
            currentBook: {},
            isInspectingBook: false,
            isLoadingBook: true,
            editingBook: false,
            checkoutOrEdit: 'Checkout',
            bookTitle: '',
            bookAuthor: '',
            bookDescription: '',
            loadingSubmit: false,
            creating: false
        }
    },
    mounted() {
        authenticatedReq('/books/mine', 'GET', {}, (res) => {
            this.books = []
            for (var key in res) {
                var book = res[key]
                book["key"] = key

                this.books.push(book)
            }
        })
    },
    methods: {
        loadBooks() {
            authenticatedReq('/books/mine', 'GET', {}, (res) => {
            this.books = []
            for (var key in res) {
                var book = res[key]
                book["key"] = key

                this.books.push(book)
            }
        })
        },
        
        inspectBook(index) {
            this.isInspectingBook = true
            this.isLoadingBook = true

            const key = this.books[index].key

            authenticatedReq('/books/' + key, 'GET', {}, (res) => {
                this.isLoadingBook = false
                this.currentBook = res
                this.currentBook.key = key

                if (res.owner == libraryId()) {
                    this.checkoutOrEdit = 'Edit'
                } else {
                    this.chekcoutOrEdit = 'Checkout'
                }
            })
        },
        editBook(editMode) {
            this.editingBook = true
            this.currentBook.editing = editMode
        },
        inspectorCanceled() {
            this.isInspectingBook = false
            this.currentBook = {}
        },

        submitBook() {
            this.loadingSubmit = true
            
            if(this.currentBook.editing){
                const book = {
                    title: this.currentBook.title,
                    author: this.currentBook.author,
                    description: this.currentBook.description
                }

                authenticatedReq('/books/' + this.currentBook.key, 'PUT', book, (res) => {
                    this.loadingSubmit = false
                    this.editingBook = false
                    this.loadBooks()
                })
            }else {
                const book = {
                    title: this.currentBook.title,
                    author: this.currentBook.author,
                    description: this.currentBook.description
                }

                authenticatedReq('/book/create', 'POST', book, (res) => {
                    this.loadingSubmit = false
                    this.editingBook = false
                    this.loadBooks()
                })
            }
        }
    }
}

</script>

<style scoped>
    .author {
        color: lightgray;
        font-size: 13px;
    }
    .description {
        max-lines: 3
    }
    #add-book {
        width: 70px;
        height: 70px;
        font-size: 25px;
        position: fixed;
        right: 50px;
        bottom: 50px
    }
</style>