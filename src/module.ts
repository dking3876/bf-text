import { NgModule, ModuleWithProviders} from '@angular/core';

import { BfTextModule } from './bf-text/index';
import { BfModalModule } from './bf-modal/index';
import { BfTextareaModule } from './bf-textarea/index';
import { BfFileModule } from './bf-file/index';

//List imports 


const EDITER_MODULES:any = [
    BfTextModule,
    BfModalModule, 
    BfTextareaModule,
    BfFileModule
];

@NgModule({
    imports : [
        BfTextModule.forRoot(),
        BfModalModule.forRoot(),
        BfTextareaModule.forRoot(),
        BfFileModule.forRoot()
    ],
    exports : EDITER_MODULES
})
export class EditorRootModule{}

@NgModule({
    imports: EDITER_MODULES,
    exports: EDITER_MODULES
})
export class EditorModule{
    static forRoot(): ModuleWithProviders {
        return {ngModule: EditorRootModule}
    }
}