import { Category } from './Category'

export class Phrase {
  constructor(
    public id: number,
    public description: string,
    public date: Date,
    public categoryId: number,
    public isFavorite: boolean = false,
  ) {}
  
    getFormattedDate(): string {
    const day = this.date.getDate().toString().padStart(2, '0')
    const month = (this.date.getMonth() + 1).toString().padStart(2, '0') // El valor del mes varía de de 0 a 11
    const year = this.date.getFullYear()
    return `${day}/${month}/${year}`
  }
}