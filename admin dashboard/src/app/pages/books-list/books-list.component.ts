import { Component, OnInit } from '@angular/core';
import { collection, getDocs, getFirestore } from 'firebase/firestore';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {
  booksList:any[]=[]
  constructor() { }

  ngOnInit(): void {
    this.readBooks()
  }

  async readBooks(){
    let db = getFirestore();
    let snapshot = await getDocs(collection(db, "books"));
    
    snapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      console.log(doc.id, " => ", doc.data());
      this.booksList.push(doc.data())
      console.log(this.booksList);

    });
  }

}
