var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { IsNotEmpty, IsString, IsEnum, IsOptional, MinLength, MaxLength } from 'class-validator';
export var LockPeriod;
(function (LockPeriod) {
    LockPeriod[LockPeriod["THIRTY_DAYS"] = 30] = "THIRTY_DAYS";
    LockPeriod[LockPeriod["ONE_HUNDRED_DAYS"] = 100] = "ONE_HUNDRED_DAYS";
    LockPeriod[LockPeriod["ONE_YEAR"] = 365] = "ONE_YEAR";
})(LockPeriod || (LockPeriod = {}));
export class CreateJournalEntryDto {
}
__decorate([
    IsNotEmpty(),
    IsString(),
    MinLength(10, { message: 'Entry must be at least 10 characters long' }),
    MaxLength(5000, { message: 'Entry cannot exceed 5000 characters' }),
    __metadata("design:type", String)
], CreateJournalEntryDto.prototype, "content", void 0);
__decorate([
    IsEnum(LockPeriod),
    __metadata("design:type", Number)
], CreateJournalEntryDto.prototype, "lockPeriodDays", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(100, { message: 'Title cannot exceed 100 characters' }),
    __metadata("design:type", String)
], CreateJournalEntryDto.prototype, "title", void 0);
export class UpdateJournalEntryDto {
}
__decorate([
    IsOptional(),
    IsString(),
    MinLength(10, { message: 'Entry must be at least 10 characters long' }),
    MaxLength(5000, { message: 'Entry cannot exceed 5000 characters' }),
    __metadata("design:type", String)
], UpdateJournalEntryDto.prototype, "content", void 0);
__decorate([
    IsOptional(),
    IsString(),
    MaxLength(100, { message: 'Title cannot exceed 100 characters' }),
    __metadata("design:type", String)
], UpdateJournalEntryDto.prototype, "title", void 0);
