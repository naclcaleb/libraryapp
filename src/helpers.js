import Vue from 'vue'
const axios = require('axios').default
const $ = require('jquery')
const eventBus = new Vue()

function authenticate(authResponse) {    
    localStorage.setItem('access', authResponse['access'])
    if ('refresh' in authResponse) {
        localStorage.setItem('refresh', authResponse['refresh'])
        localStorage.setItem('username', authResponse['username'])
    }
    eventBus.$emit('authStateChanged')
}

async function signIn(username, password, onSuccess) {
    $.ajax({
        url: 'https://api.gethighlow.com/admin/sign_in',
        method: 'POST',
        data: {
            username: username,
            password: password
        },
        success: function(res) {
            authenticate(res)
            eventBus.$emit('authStateChanged')
        }
    })
}


async function authenticatedReq(url, method, params, onSuccess) {
    let accessToken = localStorage.getItem('access')
    
    $.ajax({
        url: 'https://api.gethighlow.com' + url, 
        method: method,
        data: params,
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
        crossDomain: true,
        success: function(res) {
            if (typeof res == "string") {
                res = $.parseJSON(res)
            }
            if (res['error'] == 'ERROR-INVALID-TOKEN') {
                $.ajax({
                    url: 'https://api.gethighlow.com/admin/refresh_access',
                    method: 'POST',
                    data: {
                        refresh: localStorage.getItem('refresh')
                    },
                    success: function(result) {
                        if (typeof result == "string") {
                            result = $.parseJSON(result)
                        }
                        if (result['error'] == 'ERROR-INVALID-REFRESH-TOKEN') {
                            logOut()
                        } else {
                            authenticate(result)
                            authenticatedReq(url, method, params, onSuccess)
                        }
                    }
                })
            } else {
                onSuccess(res)
            }
        }
    })
}

function isAuthenticated() {
    if (localStorage.getItem('access') != undefined && localStorage.getItem('access') != null) {
        return true
    }
    return false
}


function logOut() {
    localStorage.removeItem('refresh')
    localStorage.removeItem('access')
    localStorage.removeItem('username')

    eventBus.$emit('authStateChanged')
}

export {
    authenticatedReq,
    isAuthenticated,
    logOut,
    eventBus,
    signIn
}