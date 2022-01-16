// query history
var queries = [];

// displays loader text while api returns
var loader = async function(node) {
    span = node.querySelector('span');
    const sleep = t => new Promise(s => setTimeout(s, t));
    for (let count = 0; count < 50; count++) {
        span.insertAdjacentText('beforeend', '.')
        await sleep(150);
    }
}

// displays search results, and creates fresh search form after submission
var search = function() {
    var new_search = document.querySelector('template').content.cloneNode(true);
    document.body.prepend(new_search);
    new_search = document.body.firstElementChild;
    new_search.addEventListener('submit', (e) => {
        var value = new_search.querySelector('input').value;
        e.preventDefault();
        // check if already queried, goto anchor if so
        if (queries.includes(value)) {
            location.hash = "#" + value.replace(' ', '_');
            new_search.querySelector('input').value = '';
            return;
        } else {
            queries.push(value);
        }
        // search and display results
        new_search.querySelector('span').innerHTML = value;
        new_search.querySelector('fieldset').id = value.replace(' ', '_');
        loader(new_search);
        fetch('http://144.217.13.121/api/' + value)
            .then(response => {
                if (!response.ok) {
                    return [];
                }
                return response.json();
            })
            .then((data) => {
                for (article of data) {
                    a = document.createElement('A');
                    a.text = article.title;
                    a.href = article.link;
                    new_search.querySelector('fieldset').appendChild(a);
                    br = document.createElement('BR');
                    new_search.querySelector('fieldset').appendChild(br);
                }
                new_search.querySelector('legend').innerHTML = value;
                // if not found
                if (!data.length) {
                    label = document.createElement('span');
                    label.textContent = 'not found.';
                    new_search.querySelector('fieldset').appendChild(label);
                }

            })
        new_search.querySelector('input').hidden = true;
        new_search.querySelector('button').hidden = true;
        search();
    });
};

search();




