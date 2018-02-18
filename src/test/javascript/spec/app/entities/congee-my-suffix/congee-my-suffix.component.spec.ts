/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { JhipsterRhTestModule } from '../../../test.module';
import { CongeeMySuffixComponent } from '../../../../../../main/webapp/app/entities/congee-my-suffix/congee-my-suffix.component';
import { CongeeMySuffixService } from '../../../../../../main/webapp/app/entities/congee-my-suffix/congee-my-suffix.service';
import { CongeeMySuffix } from '../../../../../../main/webapp/app/entities/congee-my-suffix/congee-my-suffix.model';

describe('Component Tests', () => {

    describe('CongeeMySuffix Management Component', () => {
        let comp: CongeeMySuffixComponent;
        let fixture: ComponentFixture<CongeeMySuffixComponent>;
        let service: CongeeMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterRhTestModule],
                declarations: [CongeeMySuffixComponent],
                providers: [
                    CongeeMySuffixService
                ]
            })
            .overrideTemplate(CongeeMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CongeeMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CongeeMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new CongeeMySuffix(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.congees[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
