import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Bookstore';
  spinner = true;

  // constructor(){
  //   setTimeout(() => {this.loader()}, 2000);
  // }




  loader () {
    this.spinner = false
    // const box = document.getElementById('loader-container');
    // if (box) {
    //   box.classList.add('active')
    // }
  }

  fadeOut() {
    this.spinner = true
    setTimeout(() => {this.loader()}, 800);
    console.log(this.spinner)
  }

}

