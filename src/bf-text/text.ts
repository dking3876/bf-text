import { Component, Input, Output, HostBinding, ChangeDetectionStrategy, NgModule, ModuleWithProviders, EventEmitter, ElementRef, OnInit} from '@angular/core';
import {CommonModule } from '@angular/common';

import { MdIconModule, MdIconRegistry } from '@angular/material';

@Component({
    moduleId: String(module.id),
    selector: 'bf-input[text]',
    templateUrl: 'text.html',
    styleUrls: ['text.css']
})
export class BfText implements OnInit{
    private _value:any;
    @Input() 
    get value(){
        return this._value;
    }
    set value(v:any){
        this._value = v;
    }

    private _fieldName:string;
    @Input()
    get fieldName(){
        return this._fieldName;
    }
    set fieldName(name:string){
        this._fieldName = name;
    }
    
    private _edit:boolean = false;
    get isEditing(){
        return this._edit;
    }
    set isEditing(b:boolean){
        this._edit = b;
    }
    public Dom:any;
    @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

    constructor(public element: ElementRef){
    }
    ngOnInit(){
        this.Dom = {
            host: this.element,
            parent: this.element.nativeElement,
            label: this.element.nativeElement.childNodes[0].childNodes[1],
            input: this.element.nativeElement.childNodes[0].childNodes[3]
        }
    }
    valueModify(){
        this.valueChange.emit({
            value: this.value,
            fieldName: this.fieldName
        })
    }
    startEditing(){
        console.log("Editing");
        this.isEditing = true;
        setTimeout(()=> this.Dom['input'].focus(), 250);
    }
    finishEditing($event:any){
        if($event.type === "keyup"){
            let key = $event.keyCode;
            if(key !== 13 && key !== 9 ){ //EEnter or Tab triggers finish
                return;
            }
        }
        this.isEditing = false;
        this.value = $event.target.value;
        this.valueModify();
    }

}

@NgModule({
    imports: [MdIconModule],
    exports: [BfText],
    declarations: [BfText]
})
export class BfTextModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: BfTextModule,
            providers: [MdIconRegistry]
        }
    }
}