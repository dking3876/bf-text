import { Component, Input, Output, HostBinding, ChangeDetectionStrategy, NgModule, ModuleWithProviders, EventEmitter, ElementRef, OnInit} from '@angular/core';
import {CommonModule } from '@angular/common';
declare var window:Window;
declare var document:any;

@Component({
    moduleId: String(module.id),
    selector: 'bf-modal',
    templateUrl: 'modal.html',
    styleUrls: ['modal.scss']
})
export class BfModal implements OnInit{

    public mainContainer:any;
    public contentContainer:any;
    public closeContainer:any;

    constructor(private _element: ElementRef){
        console.log(this._element);
    }
    ngOnInit(){
        //get the elements and assign to the properties
    }
    create(el:any, cl:any, attr:any){
        attr = attr || [];
       var a = document.createElement(el);
       a.className = cl;
       attr.forEach(function(attr:any){
           for(var prop in attr){
               a.setAttribute(prop, attr[prop]);
           }
       });
       return a;
    }
    attach(el:any, event:any, callback:any){
        if(document.addEventListener){
            el.addEventListener(event, callback);
       }
       if(document.attachEvent){
           el.attachEvent("on"+event, callback);   
       }
    }
    center(){
        var top = Math.max(window.innerHeight - this.mainContainer.offsetHeight, 0) / 2;
           var left = Math.max(window.innerWidth - this.mainContainer.offsetWidth, 0) / 2;
           console.log(top, left, window.scrollY, window.screenX);
           this.mainContainer.style.top = (top + window.screenY) + "px";
           this.mainContainer.style.left = (left + window.screenX) + "px";
    }
    open(settings:any){
        this.contentContainer.innerHTML = "";

           if(settings.url){ //for iframe
               this.contentContainer.appendChild(this.create("iframe", "modal-frame", 
                    [{
                      "src": settings.url                    
                    },
                    {
                       "width": "100%"
                    },
                    {
                        "height": "100%"
                    }]
               ));
           }else{
               this.contentContainer.innerHTML = settings.content;            

           }

           this.mainContainer.style.width = settings.width || "auto";
           this.mainContainer.style.height = settings.height || "auto";

           document.getElementsByTagName("body")[0].appendChild(this.mainContainer);

           this.center();
           
           this.attach(window, "resize", this.center);
    }
    close(){
         this.contentContainer.innerHTML = "";
           if(this.mainContainer.remove){
               console.log("using remove method");
               this.mainContainer.remove();
           }else{
               console.log("using removeNode method");
               this.mainContainer.removeNode(true);
           }
           
           
           window.removeEventListener("resize", this.center);

    }
    
}
@NgModule({
    imports: [],
    exports: [BfModal],
    declarations: [BfModal]
})
export class BfModalModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: BfModalModule,
            providers: []
        }
    }
}