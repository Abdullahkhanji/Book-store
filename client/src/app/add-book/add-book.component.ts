import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { doc, collection, getFirestore, setDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes } from "firebase/storage";

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.css']
})
export class AddBookComponent implements OnInit {
  selectedImage : any = null;
  selectedFile : any = null;

  constructor(private formBuilder: FormBuilder,) { 

  }

  ngOnInit(): void {
  }

  onFileSelected(event: any){
    this.selectedImage = event.target.files[0]
  }
  onChangeFile(event: any){
    this.selectedFile = event.target.files[0]
    console.log(this.selectedFile)
  }


  addBookForm = this.formBuilder.group({
    name: '',
    author: '',
    publisher: '',
    publicationDate: '',
    pageCount: '',
    description: '',
    bookCover: '',
    bookPDF:'',
  });


  async addBook () {

    console.log(this.addBookForm.value)
    const storage = getStorage();
    const storageRef = ref(storage, `book-cover/${this.selectedImage.name}`);
    const fileRef = ref(storage, `book-pdf/${this.selectedFile.name}`);

    console.log(this.addBookForm.value)
    uploadBytes(storageRef, this.selectedImage)
    uploadBytes(fileRef, this.selectedFile)
    let db = getFirestore();

    await setDoc(doc(collection(db, "books")), {
      name: this.addBookForm.value.name ,
      author: this.addBookForm.value.author ,
      publisher: this.addBookForm.value.publisher,
      publicationDate: this.addBookForm.value.publicationDate,
      pageCount: this.addBookForm.value.pageCount,
      description: this.addBookForm.value.description,
      bookCover: storageRef.fullPath ,
      bookPDF: fileRef.fullPath ,
    }).then(() => {
      this.addBookForm.reset()
    })

  }


}
