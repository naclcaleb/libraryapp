import Vue from 'vue'
const axios = require('axios').default
const $ = require('jquery')
const eventBus = new Vue()
import config from  './config'

function authenticate(authResponse) {
    localStorage.setItem('token', authResponse['token'])
    localStorage.setItem('libraryId', authResponse['libraryId'])
    
    eventBus.$emit('authStateChanged')
}

function getPermissionLevel() {
    const permissionLevel = localStorage.getItem('permissionLevel')
    if (permissionLevel == undefined || permissionLevel == null) return 0;
    return Number(permissionLevel);
}

async function signIn(username, password, onSuccess) {
    $.ajax({
        url: config.baseUrl + '/signin',
        method: 'POST',
        data: {
            name: username,
            password: password
        },
        success: function(res) {
            console.log(res)
            authenticate(res)
            eventBus.$emit('authStateChanged')
        }
    })
}


async function authenticatedReq(url, method, params, onSuccess) {
    let accessToken = localStorage.getItem('token')
    $.ajax({
        url: config.baseUrl + url, 
        method: method,
        data: params,
        headers: {
            'Authorization': accessToken
        },
        crossDomain: true,
        success: function(res) {
            if (typeof res == "string") {
                res = $.parseJSON(res)
            }
            if (res['error'] == 'invalid-token') {
                logOut()
            } else {
                onSuccess(res)
            }
        }
    })
}

async function authenticatedReqMultipart(url, method, formData, onSuccess) {
    let accessToken = localStorage.getItem('token')
    
    $.ajax({
        url: config.baseUrl + url, 
        method: method,
        data: formData,
        processData: false,
        contentType: false,
        headers: {
            'Authorization': accessToken
        },
        crossDomain: true,
        success: function(res) {
            if (typeof res == "string") {
                res = $.parseJSON(res)
            }
            if (res['error'] == 'invalid-token') {
                logOut()
            } else {
                onSuccess(res)
            }
        }
    })
}

function isAuthenticated() {
    if (localStorage.getItem('token') != undefined && localStorage.getItem('token') != null) {
        return true
    }
    return false
}


function logOut() {
    localStorage.removeItem('token')

    eventBus.$emit('authStateChanged')
}

function notEmpty(val) {
    return val != null && val != undefined
}

function libraryId() {
    return localStorage.getItem('libraryId')
}

export {
    authenticatedReq,
    authenticatedReqMultipart,
    isAuthenticated,
    logOut,
    eventBus,
    signIn,
    getPermissionLevel,
    notEmpty,
    libraryId
}