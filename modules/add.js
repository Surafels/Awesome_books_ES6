import {
  bookTitle, bookAuthor, addBtn, listEntry, listLink, addLink, listContact, sectionList,
  sectionNew, sectionContact,

} from './variable.js';

let books = JSON.parse(localStorage.getItem('books')) || [];

const updateStorage = () => {
  localStorage.setItem('books', JSON.stringify(books));
};
const clearInputs = () => {
  bookTitle.value = '';
  bookAuthor.value = '';
};

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
  const removeBook = (title, author) => {
    books = books.filter((book) => book.title !== title && book.author !== author);
    updateStorage();
    renderBooks();
  };

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

const addToList = () => {
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
const removeBook = (title, author) => {
  books = books.filter((book) => book.title !== title && book.author !== author);
  updateStorage();
  renderBooks();
};

addLink.addEventListener('click', addToList);
addBtn.addEventListener('click', addBook);
listLink.addEventListener('click', displayBookList);
listContact.addEventListener('click', displayContactInfo);

export {
  addBook, removeBook, updateStorage, renderBooks, addToList, displayBookList, displayContactInfo,
};