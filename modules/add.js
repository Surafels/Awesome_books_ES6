import { bookTitle, bookAuthor,addBtn, listEntry , listLink ,addLink , listContact ,sectionList ,sectionNew ,sectionContact ,showDate

} from './variable.js';

const books = JSON.parse(localStorage.getItem('books')) || [];

const addBook = () => {
    const title = bookTitle.value.trim();
    const author = bookAuthor.value.trim();

    if (title.length > 0 && author.length > 0) {
      const book = { title, author };
      const same = books.some(
        (bk) => JSON.stringify(bk) === JSON.stringify(book),
      );
      if (!same) {
        books.push(book);
        updateStorage();
        clearInputs();
        renderBooks();
      }
    }
  };
  
  const updateStorage = () => {
    localStorage.setItem('books', JSON.stringify(books));
  }

  const removeBook = (title, author) => {
    books = books.filter((book) => book.title !== title && book.author !== author);
    updateStorage();
    renderBooks();
  };

  const clearInputs = () => {
    bookTitle.value = '';
    bookAuthor.value = '';
  }

  const renderBooks = () => {
    listEntry.innerHTML = books
      .map(
        (book) => `
          <li class="book-card">
            <p class="entry">
              <span class="book-title">"${book.title}"</span> by
              <span class="book-author">${book.author}</span>
            </p>
            <button class="remove-btn">Remove</button>
          </li>
        `,
      )
      .join('');

    const removeBtns = document.querySelectorAll('.remove-btn');

    removeBtns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const card = e.target.closest('.book-card');
        const title = card.querySelector('.book-title').innerText;
        const author = card.querySelector('.book-author').innerText;
        removeBook(title, author);
      });
    });
  };

 const  addToList = () => {
    sectionNew.classList.remove('hidden');
    sectionList.classList.add('hidden');
    sectionContact.classList.add('hidden');
  };

  const displayBookList = () => {
    sectionList.classList.remove('hidden');
    sectionNew.classList.add('hidden');
    sectionContact.classList.add('hidden');
  };

  const displayContactInfo = () => {
    sectionList.classList.add('hidden');
    sectionNew.classList.add('hidden');
    sectionContact.classList.remove('hidden');
  };
//   const newBook = new Book();
// window.addEventListener('load', newBook.addBook);
addLink.addEventListener('click', addToList);
// console.log('clicked');
listLink.addEventListener('click', displayBookList);
listContact.addEventListener( 'click',displayContactInfo);
 
export { addBook, removeBook,updateStorage,renderBooks,addToList,displayBookList, displayContactInfo};