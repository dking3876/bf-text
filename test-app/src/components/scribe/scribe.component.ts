import { Component, ViewChild } from '@angular/core';
import { MdButtonModule } from '@angular/material';
import { MdIconModule, MdIconRegistry } from '@angular/material';
import { NectarModule } from './../../../../';
import { BfSidenav } from '../../../../bf-sidenav/index';

@Component({
  selector: 'scribe',
  templateUrl: './scribe.component.html',
  styleUrls: ['./scribe.component.css']
})
export class Scribe {
	headerText :string =  'Brafton';
  draftarticles = articles1.slice(0,3);
  @ViewChild(BfSidenav)
  private sidenav: BfSidenav;

constructor() {}

menuClick()
{
console.log("menu button clicked");
  this.sidenav.toggleMenu();
}

articleClick(article: Article)
{
console.log("clicked an article - " + article.title);
}

ShowMore()
{
console.log('showmore');
this.draftarticles = articles1;
}


}

var articles1: Article[] = [
    { main_imageurl: 'http://www.hercampus.com/sites/default/files/2013/02/27/topic-1350661050.jpg', title: 'Two police officers in serious condition after being deliberately mown down in hit and run', description: 'Brafton Test Feed', date: new Date(2016,9,15,12,32,55), extraInfo : '3hrs' },
    { main_imageurl: 'https://images-na.ssl-images-amazon.com/images/I/A1ynBCplCWL._SX355_.jpg', title: 'Cobham shares nose-dive as it issues second profit warning', description: 'Some other feed message', date: new Date(2016,9,15,12,32,55), extraInfo : '3hrs' },
    { main_imageurl: 'http://images.contactmusic.com/images/feature-images/small-apartments-franklin-and-mrolivetti-600-290-02.jpg', title: 'Time Warner and AT&T say No to grounds to block $108bn merger', description: 'Brafton News', date: new Date(2016,9,15,12,32,55), extraInfo : '3hrs' },
    { main_imageurl: 'http://www.hercampus.com/sites/default/files/2013/02/27/topic-1350661050.jpg', title: 'Two police officers in serious condition after being deliberately mown down in hit and run', description: 'Brafton Test Feed', date: new Date(2016,9,15,12,32,55), extraInfo : '3hrs' },
    { main_imageurl: 'https://images-na.ssl-images-amazon.com/images/I/A1ynBCplCWL._SX355_.jpg', title: 'Cobham shares nose-dive as it issues second profit warning', description: 'Some other feed message', date: new Date(2016,9,15,12,32,55), extraInfo : '3hrs' },
    { main_imageurl: 'http://images.contactmusic.com/images/feature-images/small-apartments-franklin-and-mrolivetti-600-290-02.jpg', title: 'Time Warner and AT&T say No to grounds to block $108bn merger', description: 'Brafton News', date: new Date(2016,9,15,12,32,55) , extraInfo : '3hrs'},
];

class Article {
    main_imageurl: string;
    title: string;
    description: string;
    date: Date;
    extraInfo: string;
}
