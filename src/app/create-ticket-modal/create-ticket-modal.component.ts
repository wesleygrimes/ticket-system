import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Ticket } from '../_models';
import { RootStoreState, TicketStoreActions } from '../_store';

@Component({
  selector: 'app-create-ticket-modal',
  templateUrl: './create-ticket-modal.component.html',
  styleUrls: ['./create-ticket-modal.component.css']
})
export class CreateTicketModalComponent implements OnInit {
  newTicketDescription: string;

  constructor(
    private store: Store<RootStoreState.RootState>,
    private activeModal: NgbActiveModal
  ) {}

  ngOnInit() {}

  create() {
    const newTicket: Ticket = {
      assigneeId: null,
      completed: false,
      description: this.newTicketDescription,
      id: null
    };

    this.store.dispatch(
      new TicketStoreActions.AddTicketAction({
        newTicket
      })
    );
    this.activeModal.close();
  }

  cancel() {
    this.activeModal.close();
  }
}
