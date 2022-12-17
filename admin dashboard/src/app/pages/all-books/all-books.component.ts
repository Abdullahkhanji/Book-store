import { Component, OnInit, ElementRef } from '@angular/core';
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  getFirestore,
} from 'firebase/firestore';
import { getDownloadURL, getStorage, ref } from 'firebase/storage';
@Component({
  selector: 'app-all-books',
  templateUrl: './all-books.component.html',
  styleUrls: ['./all-books.component.css'],
})
export class AllBooksComponent implements OnInit {
  data: any;
  booksList: any = [];
  bookId: any

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {
    this.readBooks();

    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.src = '../assets/js/main.js';
    this.elementRef.nativeElement.appendChild(s);
  }

  async readBooks() {
    let db = getFirestore();
    let snapshot = await getDocs(collection(db, 'books'));

    snapshot.forEach((doc) => {
      let index: any = doc.data();
      index.key = doc.id;
      this.booksList.push(index);
      const storage = getStorage();
      const storageRef = ref(storage, doc.data()['bookCover']);
      const fileRef = ref(storage, doc.data()['bookPDF']);
      getDownloadURL(fileRef).then((url: any) => {
        index.selectedFile = url;
      });
      getDownloadURL(storageRef).then((url) => {
        console.log(url);
        index.selectedImage = url;
      });
      getDownloadURL(fileRef).then((url) => {
        index.selectedFile = url;
      });
      this.data = index;
    });
  }
  setId(id:any){
    this.bookId = id
  }
  async deleteBook(id: any) {
    let db = getFirestore();
    console.log(id)
    await deleteDoc(doc(db, 'books', id))
  }
}
