import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AssignUserModalComponent } from '../assign-user-modal/assign-user-modal.component';
import { CreateTicketModalComponent } from '../create-ticket-modal/create-ticket-modal.component';
import { TicketFilter, TicketWithUser, User } from '../_models';
import {
  RootStoreSelectors,
  RootStoreState,
  TicketStoreActions,
  TicketStoreSelectors,
  UserStoreSelectors
} from '../_store';

@Component({
  selector: 'app-ticket-list',
  templateUrl: './ticket-list.component.html',
  styleUrls: ['./ticket-list.component.css']
})
export class TicketListComponent implements OnInit {
  ticketsWithUsers$: Observable<TicketWithUser[]>;
  users$: Observable<User[]>;
  currentFilter$: Observable<TicketFilter>;
  isLoading$: Observable<boolean>;

  constructor(
    private store: Store<RootStoreState.RootState>,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.ticketsWithUsers$ = this.store.select(
      RootStoreSelectors.selectFilteredTicketItemsWithUser
    );
    this.currentFilter$ = this.store.select(
      TicketStoreSelectors.selectTicketCurrentFilter
    );
    this.isLoading$ = this.store.select(RootStoreSelectors.selectIsLoading);
    this.users$ = this.store.select(UserStoreSelectors.selectAllUserItems);
  }

  createTicket() {
    this.modalService.open(CreateTicketModalComponent);
  }

  onViewTicket(ticketId: number) {
    this.router.navigate(['/tickets', ticketId]);
  }

  onAssignTicket(ticketId: number) {
    const modalRef = this.modalService.open(AssignUserModalComponent);
    modalRef.componentInstance.ticketId = ticketId;
  }

  onCompleteTicket(ticketId: number) {
    this.store.dispatch(
      new TicketStoreActions.CompleteTicketAction({ ticketId })
    );
  }

  onFilterTickets(filter: TicketFilter) {
    this.store.dispatch(new TicketStoreActions.FilterTicketsAction({ filter }));
  }
}
