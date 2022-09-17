import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

@Component({
  selector: 'app-book-page',
  templateUrl: './book-page.component.html',
  styleUrls: ['./book-page.component.css'],
})
export class BookPageComponent implements OnInit {
  data : any[] = []
  constructor(private _Activatedroute: ActivatedRoute) {}
  id:any = this._Activatedroute.snapshot.paramMap.get('id');
  newId = this.id.replace(':' , '');

  ngOnInit(): void {
    this.getBookData()
    console.log(this.newId)
  }


  async getBookData(){
    let db = getFirestore();
    let docRef = doc(db, 'books', this.newId);
    let docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      this.data.push(docSnap.data())
    } else {
      console.log("No such document!");
    }

  }

}
