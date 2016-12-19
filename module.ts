import { NgModule, ModuleWithProviders} from '@angular/core';

import { BfTextModule } from './bf-text/index';

//List imports 


const EDITER_MODULES:any = [
    BfTextModule
];

@NgModule({
    imports : [
        BfTextModule.forRoot()
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