export interface Status {
  id: number
  title: string
  cards: Card[]
}

export interface Card {
  id: string
  title: string
  description: string
  status: string
}
