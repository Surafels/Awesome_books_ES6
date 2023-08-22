import{  addBook, removeBook,updateStorage,
    renderBooks,addToList,displayBookList, displayContactInfo} from './modules/add.js';
import { DateTime } from './modules/luxon.js';

addBook();
removeBook();
updateStorage();
renderBooks();
addToList();
displayBookList();
displayContactInfo();

const now =DateTime.now();
const date =document.querySelector('#current-date');
date.textContent=now.toLocaleString(DateTime.DATETIME_MED);
console.log(formattedDate);
