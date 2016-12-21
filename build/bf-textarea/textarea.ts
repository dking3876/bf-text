import { Component, Input, Output, HostBinding, ChangeDetectionStrategy, NgModule, ModuleWithProviders, EventEmitter, ElementRef} from '@angular/core';
import {CommonModule } from '@angular/common';

@Component({
    moduleId: String(module.id),
    selector: 'bf-input[textarea]',
    templateUrl: 'textarea.html',
    styleUrls: ['textarea.scss']
})
export class BfTextarea{
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
    @Output() valueChange: EventEmitter<any> = new EventEmitter<any>();

    constructor(public element: ElementRef){
        console.log(this.element)
    }
    valueModify(){
        this.valueChange.emit(this.value)
    }
    startEditing(){
        console.log("clicked");
        this.isEditing = true;
        console.log(this.element.nativeElement.childNodes[0])
        setTimeout(()=> this.element.nativeElement.childNodes[0].focus(), 250);
    }
    finishEditing($event:any){
        console.log($event.target.value);
        this.isEditing = false;
        this.value = $event.target.value;
        this.valueModify();
    }
}
@NgModule({
    imports: [],
    exports: [BfTextarea],
    declarations: [BfTextarea]
})
export class BfTextareaModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: BfTextareaModule,
            providers: []
        }
    }
}