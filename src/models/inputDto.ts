import {isNotEmpty, isNumber, isPositive, MinLength, MaxLength, Min, Max} from 'class-validator';

//for class-validator validation
export class InputDto {
    // @isNotEmpty()
    @MinLength(5, {message: 'Title is too short, at least $constraint1 chars'})
    @MaxLength(15, {message: 'Title is too long, not more than 15 chars'})
    private readonly title: string;

    // @isNotEmpty()
    @MinLength(5, {message: 'Title is too short, at least $constraint1 chars'})
    @MaxLength(25, {message: 'Title is too long, not more than $constraint1 chars'})
    private readonly description: string;

    // @isNumber()
    // @isPositive()
    @Min(1)
    @Max(8)
    private readonly people: number;

    constructor(title: string, description: string, people: number) {
        this.title = title;
        this.description = description;
        this.people = people;
    }
    returnInputDtoAsArray(): [string, string, number]{
        return [this.title, this.description, this.people];
    }
}