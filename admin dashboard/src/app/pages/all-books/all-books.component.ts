import { Component, OnInit } from '@angular/core';
import {
  doc,
  collection,
  deleteDoc,
  getDocs,
  getFirestore,
} from 'firebase/firestore';
import { book } from '../book';

@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css'],
})


export class AllBooksComponent implements OnInit {




  booksList:any[]=[];

  constructor() {}

  ngOnInit(): void {
    this.readBooks();
  }

  async readBooks() {
    let db = getFirestore();
    let snapshot = await getDocs(collection(db, 'books'));

    snapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, ' => ', doc.data());
      let index:any = doc.data()
      index.key = doc.id
      this.booksList.push(index);
      console.log(this.booksList);
    });
  }

  async deleteBook(event:any) {
    let db = getFirestore();

    await deleteDoc(doc(db, 'books', event.key)).then(()=>{
      this.readBooks()
    })
  }
}

