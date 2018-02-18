import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CongeeMySuffix } from './congee-my-suffix.model';
import { CongeeMySuffixPopupService } from './congee-my-suffix-popup.service';
import { CongeeMySuffixService } from './congee-my-suffix.service';

@Component({
    selector: 'jhi-congee-my-suffix-dialog',
    templateUrl: './congee-my-suffix-dialog.component.html'
})
export class CongeeMySuffixDialogComponent implements OnInit {

    congee: CongeeMySuffix;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private congeeService: CongeeMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.congee.id !== undefined) {
            this.subscribeToSaveResponse(
                this.congeeService.update(this.congee));
        } else {
            this.subscribeToSaveResponse(
                this.congeeService.create(this.congee));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<CongeeMySuffix>>) {
        result.subscribe((res: HttpResponse<CongeeMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: CongeeMySuffix) {
        this.eventManager.broadcast({ name: 'congeeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-congee-my-suffix-popup',
    template: ''
})
export class CongeeMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private congeePopupService: CongeeMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.congeePopupService
                    .open(CongeeMySuffixDialogComponent as Component, params['id']);
            } else {
                this.congeePopupService
                    .open(CongeeMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
