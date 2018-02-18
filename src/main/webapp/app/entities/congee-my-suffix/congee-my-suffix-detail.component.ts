import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { CongeeMySuffix } from './congee-my-suffix.model';
import { CongeeMySuffixService } from './congee-my-suffix.service';

@Component({
    selector: 'jhi-congee-my-suffix-detail',
    templateUrl: './congee-my-suffix-detail.component.html'
})
export class CongeeMySuffixDetailComponent implements OnInit, OnDestroy {

    congee: CongeeMySuffix;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private congeeService: CongeeMySuffixService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCongees();
    }

    load(id) {
        this.congeeService.find(id)
            .subscribe((congeeResponse: HttpResponse<CongeeMySuffix>) => {
                this.congee = congeeResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCongees() {
        this.eventSubscriber = this.eventManager.subscribe(
            'congeeListModification',
            (response) => this.load(this.congee.id)
        );
    }
}
