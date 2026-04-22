import { seedHouse, seedItems } from './seed.js'

const HOUSE_KEY = 'underhallsplan_house'
const ITEMS_KEY = 'underhallsplan_items'

export function loadHouse() {
  try {
    const raw = localStorage.getItem(HOUSE_KEY)
    return raw ? JSON.parse(raw) : seedHouse
  } catch {
    return seedHouse
  }
}

export function saveHouse(house) {
  localStorage.setItem(HOUSE_KEY, JSON.stringify(house))
}

export function loadItems() {
  try {
    const raw = localStorage.getItem(ITEMS_KEY)
    return raw ? JSON.parse(raw) : seedItems
  } catch {
    return seedItems
  }
}

export function saveItems(items) {
  localStorage.setItem(ITEMS_KEY, JSON.stringify(items))
}
