import { NgModule } from '@angular/core';

import { ResumenComponent } from './resumen.component';
import { ResumenRoutingModule } from './resumen.routing';

@NgModule({
    imports: [
        ResumenRoutingModule,
    ],
    declarations: [
        ResumenComponent,
    ],
    providers: []
})
export class ResumenModule { }
