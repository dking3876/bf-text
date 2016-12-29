import { Component } from '@angular/core';

//import { BfModal } from '../../../src'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public someValue:string = "My secret value";
  public uploadConfig:Object = {
    label: "Really Cool Uploader",
    url: "http://localdev.dev/angular/proj/src/api/file.php",
    style: [
      "background: #8BC34A"
    ],
    success: (res:any, item:any)=>{
      this.someValue = "we have liftoff";
      console.log(res);
      console.log(item);
    }
  }

  constructor() {
    
  }

  registerValue($event:any){
    console.log($event);
    this[$event['fieldName']] = $event['value'];
  }
  singleFile($event){
    console.log("one file is done");
    console.log($event);
  }
  allFiles($event){
    console.log("all files done");
    console.log($event);
  }
}
