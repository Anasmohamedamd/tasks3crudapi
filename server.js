const express = require('express');
const app = express();


app.use(express.json());

const PORT = 3000

const books = [
    {id:1,title:'400 Days',author:'Chetan bhagat'},
    {id:2,title:'Atomic Habits',author:'James Clear'}
]

//GET all books
app.get('/book',(req,res) => {
    try{
    res.json(books);
    }catch(error){
        res.status(500).json({msg:error.msg});
    }
})

// CREATE book
app.post('/book',(req,res) => {
    try {
        const{title,author} = req.body
        if(!title || !author){
            res.status(200).json({message:'title or author required'});
        }

        const newBook = {id:books.length+1,title,author};
        books.push(newBook);
        res.status(201).json(newBook)
    } catch (error) {
        res.status(500).json({msg:error.msg});
    }
})

//UPDATE book by ID
app.put('/book/:id',(req,res) => {
    try {
        const {id} = req.params;
        const {title,author} = req.body
        const book = books.find(b => b.id === parseInt(id));

        if(!book) return res.status(401).json({msg:'Book not found'});

        book.title = title || book.title
        book.author = author || book.author

        res.json(book)
    } catch (error) {
        res.status(500).json({msg:error.msg});
    }
})

//DELETE book by ID
app.delete('/book/:id',(req,res) => {
    try {
    const {id} = req.params
    const bookIndex = books.findIndex(b => b.id === parseInt(id));

    if(bookIndex === -1) return res.status(401).json({msg:'Book not found'});

    books.splice(bookIndex,1)
    res.status(200).json({msg:'Book Deleted successfully'});
}
 catch (error) {
        res.status(500).json({msg:error.msg}); 
    }
})

app.listen(PORT,() => {
    console.log(`Server is connected at ${PORT}`);
})