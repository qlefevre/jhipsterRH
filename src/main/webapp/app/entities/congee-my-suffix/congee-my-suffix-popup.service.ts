import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { CongeeMySuffix } from './congee-my-suffix.model';
import { CongeeMySuffixService } from './congee-my-suffix.service';

@Injectable()
export class CongeeMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private congeeService: CongeeMySuffixService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.congeeService.find(id)
                    .subscribe((congeeResponse: HttpResponse<CongeeMySuffix>) => {
                        const congee: CongeeMySuffix = congeeResponse.body;
                        congee.date = this.datePipe
                            .transform(congee.date, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.congeeModalRef(component, congee);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.congeeModalRef(component, new CongeeMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    congeeModalRef(component: Component, congee: CongeeMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.congee = congee;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
