import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CongeeMySuffix } from './congee-my-suffix.model';
import { CongeeMySuffixService } from './congee-my-suffix.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-congee-my-suffix',
    templateUrl: './congee-my-suffix.component.html'
})
export class CongeeMySuffixComponent implements OnInit, OnDestroy {
congees: CongeeMySuffix[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private congeeService: CongeeMySuffixService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.congeeService.query().subscribe(
            (res: HttpResponse<CongeeMySuffix[]>) => {
                this.congees = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInCongees();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: CongeeMySuffix) {
        return item.id;
    }
    registerChangeInCongees() {
        this.eventSubscriber = this.eventManager.subscribe('congeeListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
