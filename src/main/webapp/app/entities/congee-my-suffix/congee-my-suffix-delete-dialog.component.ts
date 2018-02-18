import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CongeeMySuffix } from './congee-my-suffix.model';
import { CongeeMySuffixPopupService } from './congee-my-suffix-popup.service';
import { CongeeMySuffixService } from './congee-my-suffix.service';

@Component({
    selector: 'jhi-congee-my-suffix-delete-dialog',
    templateUrl: './congee-my-suffix-delete-dialog.component.html'
})
export class CongeeMySuffixDeleteDialogComponent {

    congee: CongeeMySuffix;

    constructor(
        private congeeService: CongeeMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.congeeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'congeeListModification',
                content: 'Deleted an congee'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-congee-my-suffix-delete-popup',
    template: ''
})
export class CongeeMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private congeePopupService: CongeeMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.congeePopupService
                .open(CongeeMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
