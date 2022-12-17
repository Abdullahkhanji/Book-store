import { Component, OnInit } from '@angular/core';
import { doc, getDoc, getFirestore } from 'firebase/firestore';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  db = getFirestore()
  data: any


  constructor() { }

  ngOnInit(): void {
    this.getContactData()
  }
  async getContactData() {
    let docRef = doc(this.db, 'contact', 'contactdata');
    await getDoc(docRef).then((result) => {
      this.data = result.data();
    });
    console.log(this.data);
  }
}
