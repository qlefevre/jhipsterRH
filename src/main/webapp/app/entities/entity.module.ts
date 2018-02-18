import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterRhEmployeeMySuffixModule } from './employee-my-suffix/employee-my-suffix.module';
import { JhipsterRhCongeeMySuffixModule } from './congee-my-suffix/congee-my-suffix.module';
import { JhipsterRhDepartmentMySuffixModule } from './department-my-suffix/department-my-suffix.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JhipsterRhEmployeeMySuffixModule,
        JhipsterRhCongeeMySuffixModule,
        JhipsterRhDepartmentMySuffixModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterRhEntityModule {}
