
(function () {
    "use strict";
    console.log("reading js");

    const form = document.querySelector('form');
    const formView = document.querySelector('#formView');
    const storyView = document.querySelector('#storyView');

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        const person = document.querySelector('#person').value;
        const hall = document.querySelector('#hall').value;
        const adverb = document.querySelector('#adverb').value;
        const animal = document.querySelector('#animal').value;
        const place = document.querySelector('#place').value;
        const transportation = document.querySelector('#transportation').value;
        const food = document.querySelector('#food').value;
        const celebrity = document.querySelector('#celebrity').value;
        const communication = document.querySelector('#communication').value;
        const figure = document.querySelector('#figure').value;
        const ingVerb = document.querySelector('#ingVerb').value;
        const emotion = document.querySelector('#emotion').value;
        const verb = document.querySelector('#verb').value;

        const story = document.querySelectorAll('#storyView strong');

        story[0].textContent = person;
        story[1].textContent = hall;
        story[2].textContent = adverb;
        story[3].textContent = animal;
        story[4].textContent = place;
        story[5].textContent = transportation;
        story[6].textContent = food;
        story[7].textContent = celebrity;
        story[8].textContent = communication;
        story[9].textContent = figure;
        story[10].textContent = ingVerb;
        story[11].textContent = emotion;
        story[12].textContent = verb;

        formView.className = 'hidden';
        storyView.className = '';
        document.body.className = 'story';

        const playAgain = document.querySelector('#playAgain');

        playAgain.addEventListener('click', function() {
        storyView.className = 'hidden';
        formView.className = '';
        document.body.className = '';
        form.reset();
});
    });

})();
