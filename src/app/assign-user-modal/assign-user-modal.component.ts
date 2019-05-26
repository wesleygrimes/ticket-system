import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from '../_models';
import {
  RootStoreState,
  TicketStoreActions,
  UserStoreSelectors
} from '../_store';

@Component({
  selector: 'app-assign-user-modal',
  templateUrl: './assign-user-modal.component.html',
  styleUrls: ['./assign-user-modal.component.css']
})
export class AssignUserModalComponent implements OnInit {
  users$: Observable<User[]>;
  ticketId: number;

  selectedAssignee: number;

  constructor(
    private store: Store<RootStoreState.RootState>,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit() {
    this.users$ = this.store.select(UserStoreSelectors.selectAllUserItems);
  }

  assign() {
    this.store.dispatch(
      new TicketStoreActions.AssignTicketAction({
        ticketId: this.ticketId,
        userId: this.selectedAssignee
      })
    );
    this.activeModal.close();
  }

  cancel() {
    this.activeModal.close();
  }
}
