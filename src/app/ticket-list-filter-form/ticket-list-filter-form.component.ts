import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { TicketFilter, User } from '../_models';

@Component({
  selector: 'app-ticket-list-filter-form',
  templateUrl: './ticket-list-filter-form.component.html',
  styleUrls: ['./ticket-list-filter-form.component.css']
})
export class TicketListFilterFormComponent implements OnInit, OnDestroy {
  @Input() currentFilter: TicketFilter;
  @Input() users: User[];
  @Output() filter = new EventEmitter<TicketFilter>();

  form: FormGroup;
  formValue: TicketFilter;
  formValueSub: Subscription;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
    this.formValueSub = this.form.valueChanges.subscribe(value => {
      const updatedFilter: TicketFilter = {
        ...value,
        completed:
          value.completed !== null && value.completed !== ''
            ? value.completed === 'true'
            : null,
        assigneeId:
          value.assigneeId !== null && value.assigneeId !== ''
            ? parseInt(value.assigneeId, 10)
            : null
      };
      this.formValue = updatedFilter;
    });
    this.form.setValue({
      assigneeId: null,
      completed: null
    });
  }

  buildForm() {
    this.form = this.fb.group({
      completed: [null],
      assigneeId: [null]
    });
  }

  updateFilter() {
    this.filter.emit({ ...this.formValue });
  }

  ngOnDestroy() {
    if (this.formValueSub) {
      this.formValueSub.unsubscribe();
    }
  }
}
