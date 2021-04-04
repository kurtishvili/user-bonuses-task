import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from 'primeng/api';
import { BonusType } from 'src/app/enums/bonus-type.enum';
import { UserBonus } from 'src/app/models/user-bonus.model';

@Component({
  selector: 'app-user-bonuses',
  templateUrl: './user-bonuses.component.html',
  styleUrls: ['./user-bonuses.component.scss']
})
export class UserBonusesComponent {

  @Output('onAddBonus')
  onAddBonus: EventEmitter<UserBonus> = new EventEmitter;

  @Output('onDeleteBonus')
  onDeleteBonus: EventEmitter<number> = new EventEmitter();

  @Input()
  bonuses: UserBonus[] = [];
  displayDialog: boolean = false;

  bonusForm: FormGroup;

  bonusTypes: SelectItem[] = [
    { value: 1, label: 'Freespin' },
    { value: 2, label: 'Freebet' },
    { value: 3, label: 'Money' }
  ]

  currencies: SelectItem[] = [
    { value: 1, label: 'USD' },
    { value: 2, label: 'GEL' },
  ]

  constructor(private fb: FormBuilder) {
    this.initializeBonusForm();
  }

  initializeBonusForm() {
    this.bonusForm = this.fb.group({
      bonusType: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
      currency: ['',]
    })
  }

  addBonusClick() {
    this.bonusForm.reset();
    this.displayDialog = true;
  }

  onSubmitBonus() {
    this.onAddBonus.emit(this.bonusForm.value)
  }

  deleteBonus(id: number) {
    this.onDeleteBonus.emit(id);
  }

  closeDialog() {
    this.displayDialog = false;
  }

  isMoney(bonusType: BonusType) {
    return bonusType == BonusType.Money;
  }

  bonusTypeOnChange(evnt) {
    const bonusType: SelectItem = this.bonusForm.get('bonusType').value
    const currenyControl = this.bonusForm.get('currency');

    if (bonusType.value == BonusType.Money) {
      currenyControl.setValidators(Validators.required);
    } else {
      currenyControl.clearValidators();
    }

    currenyControl.updateValueAndValidity();
  }
}