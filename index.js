'use strict';

function searchHandle() {
    const username = $('#username').val().toLowerCase();
    fetch(`https://api.github.com/users/${username}/repos`)
        .then(response => {
            if (response.ok)
                return response.json();
            throw "Unable to locate this handle, please check the spelling!"
        })
        .then(responseJson => {
            console.log(responseJson);
            displayResults(responseJson);
        })
        .catch(error => alert(error));
}

function displayResults(responseJson) {
    $('.results').empty();
    for (let i = 0; i < responseJson.length; i++) {
        $('.results').append(
            `<li>${responseJson[i].name} - ${responseJson[i].full_name}</li>`
        )
    }
}

function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        searchHandle();
    });
}

$(function() {
    watchForm();
});