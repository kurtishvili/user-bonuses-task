import { BonusType } from "../enums/bonus-type.enum";
import { Currency } from "../enums/currency.enum";

export interface UserBonus {
    id?: number;
    userId?: number;
    bonusType?: BonusType;
    quantity?: number;
    currency?: Currency;
}