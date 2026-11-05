(function () {
    'use strict';

    const star1 = document.querySelector('#star1');
    const artwork = document.querySelector('#artwork');
    const overlay = document.querySelector('#overlay');
    const closeBtn = document.querySelector('#close');

    star1.addEventListener('mouseover', function () {
        artwork.className = 'show';
    });

    star1.addEventListener('mouseout', function () {
        artwork.className = '';
    });

    star1.addEventListener('click', function () {
        overlay.className = '';
    });

    closeBtn.addEventListener('click', function () {
        overlay.className = 'hidden';
    });

}());