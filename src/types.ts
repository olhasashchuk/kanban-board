export interface Status {
  id: number
  title: string
  cards: Card[]
}

export interface Card {
  id: number
  title: string
  description: string
  status: string
}
