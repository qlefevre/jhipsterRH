import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EmployeeMySuffix } from './employee-my-suffix.model';
import { EmployeeMySuffixPopupService } from './employee-my-suffix-popup.service';
import { EmployeeMySuffixService } from './employee-my-suffix.service';
import { DepartmentMySuffix, DepartmentMySuffixService } from '../department-my-suffix';

@Component({
    selector: 'jhi-employee-my-suffix-dialog',
    templateUrl: './employee-my-suffix-dialog.component.html'
})
export class EmployeeMySuffixDialogComponent implements OnInit {

    employee: EmployeeMySuffix;
    isSaving: boolean;

    departments: DepartmentMySuffix[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private employeeService: EmployeeMySuffixService,
        private departmentService: DepartmentMySuffixService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.departmentService
            .query({filter: 'employee-is-null'})
            .subscribe((res: HttpResponse<DepartmentMySuffix[]>) => {
                if (!this.employee.departmentId) {
                    this.departments = res.body;
                } else {
                    this.departmentService
                        .find(this.employee.departmentId)
                        .subscribe((subRes: HttpResponse<DepartmentMySuffix>) => {
                            this.departments = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.employee.id !== undefined) {
            this.subscribeToSaveResponse(
                this.employeeService.update(this.employee));
        } else {
            this.subscribeToSaveResponse(
                this.employeeService.create(this.employee));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<EmployeeMySuffix>>) {
        result.subscribe((res: HttpResponse<EmployeeMySuffix>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: EmployeeMySuffix) {
        this.eventManager.broadcast({ name: 'employeeListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackDepartmentById(index: number, item: DepartmentMySuffix) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-employee-my-suffix-popup',
    template: ''
})
export class EmployeeMySuffixPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private employeePopupService: EmployeeMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.employeePopupService
                    .open(EmployeeMySuffixDialogComponent as Component, params['id']);
            } else {
                this.employeePopupService
                    .open(EmployeeMySuffixDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
