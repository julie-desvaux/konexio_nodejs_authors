const express   = require('express');
const app       = express();
const port      = 3000;

const authors   = [
    {
        author: 'Lawrence Nowell',
        nationality: 'UK',
        books: ['Beowulf']
    },
    {
        author: 'William Shakespeare',
        nationality: 'UK',
        books: ['Hamlet', 'Othello', 'Romeo and Juliet', 'Macbeth']
    },
    {
        author: 'Charles Dickens',
        nationality: 'US',
        books: ['Oliver Twist', 'A Christmas Carol']
    },
    {
        author: 'Oscar Wilde',
        nationality: 'UK',
        books: ['The Picture of Dorian Gray', 'The Importance of Being Earnest']
    },
];

app.get('/', (req, res) =>  {
    res.send('<p>Authors API</p>')
});

app.get('/authors/:id', (req, res) =>  {
    console.log('authors', req.params.id);
    if (req.params.id -1 > authors.length) {
        console.log('if', (req.params.id -1 > authors.length));
        res.send(`<p>The author with the ID ${req.params.id} does not exist</p>`)
    }
    const currentAuthor = authors[req.params.id - 1];
    res.send(`<p>${currentAuthor.author}, ${currentAuthor.nationality}</p>`)
});

app.get('/authors/:id/books', (req, res) =>  {
    if (req.params.id -1 > authors.length) {
        console.log('if', (req.params.id -1 > authors.length));
        res.send(`<p>The author with the ID ${req.params.id} does not exist</p>`)
    }
    const currentAuthorBooks = authors[req.params.id - 1].books;
    const booksList = currentAuthorBooks.map(book => `<li>${book}</li>`);
    res.send(`<p>Books:</p><ul>${booksList.join('')}</ul>`)
});

app.get('*', (req, res) => {
    res.send('<p>Error <a href="/"> Return to the homepage</a></p>')
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});