import { Component, Input, Output, HostBinding, ChangeDetectionStrategy, NgModule, ModuleWithProviders, EventEmitter, ElementRef, OnInit} from '@angular/core';
import {CommonModule } from '@angular/common';
import { BrowserModule,DomSanitizer } from '@angular/platform-browser';

import { MdIconModule, MdIconRegistry, MdButtonModule } from '@angular/material';

import { UploadItem } from 'angular2-http-file-upload';
import { Uploader } from 'angular2-http-file-upload';
import * as DEFINITIONS from './extention.definitions';

class BfUploader extends UploadItem{
    public index:number;
    constructor(file:any){
        super();
        this.url = "";
        this.headers = {};
        this.file = file;
        this.index = null;
    }
}
@Component({
    moduleId: String(module.id),
    selector: 'bf-input[file]',
    templateUrl: './file.html',
    styleUrls: ['file.css']
})
export class BfFile implements OnInit{

    private _validConfig: boolean = true;
    private uploadUrl:string;
    private uploaded:Array<any> = [];
    private multiple:boolean = false;
    private _config:any;
    private _errorMessage:string = "This uploader will not function and therefore is being disabled.  See documentation for appropriate configuration at https://github.com/dking3876/bf-text";
    private styles:any;

    @Input() config:any;

    @Output() fileUploaded: EventEmitter<any> = new EventEmitter<any>(); //Notification for individual file uploads

    @Output() uploadCompleted: EventEmitter<any> = new EventEmitter<any>(); //Notification for all files uploaded

    constructor(public element: ElementRef, private _uploaderService: Uploader, private _sanitizer:DomSanitizer){
    }
    ngOnInit(){
        if(!this.config){
            console.error("No configuration provided for Uploader. " + this._errorMessage);
            this._validConfig = false;
            return;
        }
        this.setup();
        this._uploaderService.onSuccessUpload = (item:any, res:any, state:any, header:any)=>{
            this.success(item, res, state, header);
            if(this.config['success']){ //if user has defined method run this method after predefined method
                this.config['success'](res,item);
            }
        }
        this._uploaderService.onErrorUpload = (item:any, res:any, state:any, header:any)=>{
            this.error(item, res, state, header);
            if(this.config['error']){ //if user has defined method run this method after predefined method
                this.config['error'](res,item);
            }
        };
        this._uploaderService.onCompleteUpload = (item:any, res:any, state:any, header:any)=>{
            this.completed(item, res, state, header);
            if(this.config['completed']){ //if user has defined method run this method after predefined method
                this.config['completed'](res,item);
            }
        };
        this._uploaderService.onProgressUpload = (item:any, percent:any)=>{
            this.progress(item, percent);
            if(this.config['progress']){ //if user has defined method run this method after predefined method
                this.config['progress'](percent,item);
            }    
        };
    }
    setup(){
        this._config = this.config;
        this.multiple = this.config['multiple'] || false; //allow multiple
        this.uploadUrl = this.config['url'] ? this.config['url'] : this.configFalse("");
        this.styles = this.config['style']? this._sanitizer.bypassSecurityTrustStyle(this.config['style'].join(";")) : "";
        if(!this._validConfig){
            console.error("Invalid configuration provided. " + this._errorMessage);
        }
        
    }
    configFalse(need:any){
        this._validConfig = false;
        return need;
    }
    parentNotifySingle(file:any, response:any){ //each file uploaded so do something
        this.fileUploaded.emit({file,response});
    }
    parentNotifyAll(){ //all files done uploading so do something
        this.uploadCompleted.emit(this.uploaded);
    }
    displayImage(file:any, i:any){
        let reader = new FileReader();
        reader.onload = (e:any)=>{
            let img = e.target.result;
            this.uploaded[i].src = img;
        }
        reader.readAsDataURL(file)
    }
    displayIcon(type:any, i:any){
        let f_type:string = type[1];
        let icons:Object = DEFINITIONS.definitions;
        if(icons[f_type]){
            return icons[f_type];
        }
        return "fa fa-file";
    }
    uploadFiles($event:any){
        if(!this._validConfig){
            console.error("Invalid file upload configuration. Upload terminating.");
            return;
        }
        this.uploaded = [];
        let files = Array.from($event.target.files);

        //add the files to this.uploaded array with prop loading = true;
        files.forEach((file:any, i:number)=>{
            let f = {
                index: i,
                name: file.name,
                loading: true,
                size: file.size,
                type: file.type.split("/"),
                file: file
            }
            this.uploaded.push(f)
            if(f.type[0] == "image"){
                this.displayImage(file, i);
            }else{
                this.uploaded[i].class = this.displayIcon(f.type, i);
            }
        })
        if(this.config['beforeUpload']){
            files = this.config['beforeUpload'](files);
        }
        files.map((file:any, i:number) =>{
            let upItem = new BfUploader(file);
            upItem.url = this.config['url'];
            upItem.index = i;
            this._uploaderService.upload(upItem);
        })   
        this.parentNotifyAll();
    }
    beforeUpload(){
    }
    success(item:any, res:any, state:any, header:any){ //Updates the array of uploaded Items with each Items server response
        this.uploaded[item.index].response = res;
        this.parentNotifySingle(item, res);
    }
    error(item:any, res:any, state:any, header:any){
        console.error("Danger, Danger Will robinson");
        console.warn("I have a bad feeling about this");
    }
    completed(item:any, res:any, state:any, header:any){
        let type = item.file.type.split("/");
        let container = "uploadedItem-"+item.index;
        this.uploaded[item.index]['loading'] = false;
    }
    progress(item:any, percent:any){
        let container = "uploadedItem-"+item.index;
        let el = this.element.nativeElement.querySelector('#'+container+' .progress .progPercent');
        el.innerHTML = percent + "%";        
    }
    closeBox($event:any){
        let parent = $event.target.parentNode.style.display = "none";
    }
}
@NgModule({
    imports: [MdIconModule, BrowserModule],
    exports: [BfFile],
    declarations: [BfFile]
})
export class BfFileModule {
    static forRoot(): ModuleWithProviders {
        return {
            ngModule: BfFileModule,
            providers: [MdIconRegistry, Uploader]
        }
    }
}