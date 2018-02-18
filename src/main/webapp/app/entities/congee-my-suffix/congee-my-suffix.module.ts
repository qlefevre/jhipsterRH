import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { JhipsterRhSharedModule } from '../../shared';
import {
    CongeeMySuffixService,
    CongeeMySuffixPopupService,
    CongeeMySuffixComponent,
    CongeeMySuffixDetailComponent,
    CongeeMySuffixDialogComponent,
    CongeeMySuffixPopupComponent,
    CongeeMySuffixDeletePopupComponent,
    CongeeMySuffixDeleteDialogComponent,
    congeeRoute,
    congeePopupRoute,
} from './';

const ENTITY_STATES = [
    ...congeeRoute,
    ...congeePopupRoute,
];

@NgModule({
    imports: [
        JhipsterRhSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        CongeeMySuffixComponent,
        CongeeMySuffixDetailComponent,
        CongeeMySuffixDialogComponent,
        CongeeMySuffixDeleteDialogComponent,
        CongeeMySuffixPopupComponent,
        CongeeMySuffixDeletePopupComponent,
    ],
    entryComponents: [
        CongeeMySuffixComponent,
        CongeeMySuffixDialogComponent,
        CongeeMySuffixPopupComponent,
        CongeeMySuffixDeleteDialogComponent,
        CongeeMySuffixDeletePopupComponent,
    ],
    providers: [
        CongeeMySuffixService,
        CongeeMySuffixPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterRhCongeeMySuffixModule {}
