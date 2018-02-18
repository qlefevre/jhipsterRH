/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { JhipsterRhTestModule } from '../../../test.module';
import { CongeeMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/congee-my-suffix/congee-my-suffix-detail.component';
import { CongeeMySuffixService } from '../../../../../../main/webapp/app/entities/congee-my-suffix/congee-my-suffix.service';
import { CongeeMySuffix } from '../../../../../../main/webapp/app/entities/congee-my-suffix/congee-my-suffix.model';

describe('Component Tests', () => {

    describe('CongeeMySuffix Management Detail Component', () => {
        let comp: CongeeMySuffixDetailComponent;
        let fixture: ComponentFixture<CongeeMySuffixDetailComponent>;
        let service: CongeeMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterRhTestModule],
                declarations: [CongeeMySuffixDetailComponent],
                providers: [
                    CongeeMySuffixService
                ]
            })
            .overrideTemplate(CongeeMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CongeeMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CongeeMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new CongeeMySuffix(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.congee).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
