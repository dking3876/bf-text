import { Component, Input, Output, HostBinding, ChangeDetectionStrategy, NgModule, ModuleWithProviders, EventEmitter, ElementRef, ViewChild, OnInit} from '@angular/core';
import {CommonModule } from '@angular/common';
import { MdIconModule, MdIconRegistry } from '@angular/material';
import { BfModalModule, BfModal } from '../bf-modal/index';

@Component({
    moduleId: String(module.id),
    selector: 'bf-input[textarea]',
    templateUrl: 'textarea.html',
    styleUrls: ['textarea.css']
})
export class BfTextarea implements OnInit{
    @ViewChild(BfModal)
    BfModal : BfModal;

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
            parent: this.element.nativeElement.childNodes[0],
            textArea: this.element.nativeElement.childNodes[0].childNodes[5].childNodes[1]
        }
    }
    valueModify(){
        this.valueChange.emit(this.value)
    }
    check(){
        this.BfModal.show();
    }
    startEditing(){
        console.log("Editing");
        this.isEditing = true;
        setTimeout(()=> this.Dom.textArea.focus(), 250);
    }
    finishEditing($event:any){
        this.isEditing = false;
        this.value = $event.target.value;
        this.valueModify();
    }
}
@NgModule({
    imports: [BfModalModule, MdIconModule],
    exports: [BfTextarea],
    declarations: [BfTextarea ]
})
export class BfTextareaModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: BfTextareaModule,
            providers: [MdIconRegistry]
        }
    }
}