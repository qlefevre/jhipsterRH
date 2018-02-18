/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterRhTestModule } from '../../../test.module';
import { CongeeMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/congee-my-suffix/congee-my-suffix-delete-dialog.component';
import { CongeeMySuffixService } from '../../../../../../main/webapp/app/entities/congee-my-suffix/congee-my-suffix.service';

describe('Component Tests', () => {

    describe('CongeeMySuffix Management Delete Component', () => {
        let comp: CongeeMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<CongeeMySuffixDeleteDialogComponent>;
        let service: CongeeMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterRhTestModule],
                declarations: [CongeeMySuffixDeleteDialogComponent],
                providers: [
                    CongeeMySuffixService
                ]
            })
            .overrideTemplate(CongeeMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CongeeMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CongeeMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
