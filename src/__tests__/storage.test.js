import { describe, it, expect, beforeEach, vi } from 'vitest'
import { loadHouse, saveHouse, loadItems, saveItems } from '../data/storage.js'
import { seedHouse, seedItems } from '../data/seed.js'

const mockStorage = (() => {
  let store = {}
  return {
    getItem: vi.fn((key) => store[key] ?? null),
    setItem: vi.fn((key, val) => { store[key] = val }),
    clear: () => { store = {} },
  }
})()

beforeEach(() => {
  mockStorage.clear()
  vi.stubGlobal('localStorage', mockStorage)
})

describe('loadHouse', () => {
  it('returns seed data when localStorage is empty', () => {
    expect(loadHouse()).toEqual(seedHouse)
  })

  it('returns parsed value when stored', () => {
    const custom = { ...seedHouse, city: 'Göteborg' }
    mockStorage.setItem('underhallsplan_house', JSON.stringify(custom))
    expect(loadHouse()).toEqual(custom)
  })
})

describe('saveHouse', () => {
  it('persists house to localStorage', () => {
    saveHouse(seedHouse)
    expect(mockStorage.setItem).toHaveBeenCalledWith(
      'underhallsplan_house',
      JSON.stringify(seedHouse)
    )
  })
})

describe('loadItems', () => {
  it('returns seed items when localStorage is empty', () => {
    expect(loadItems()).toEqual(seedItems)
  })

  it('returns parsed items when stored', () => {
    const custom = [{ id: 'x', title: 'Test', priority: 'planerat', category: 'El', location: 'Kök', done: false }]
    mockStorage.setItem('underhallsplan_items', JSON.stringify(custom))
    expect(loadItems()).toEqual(custom)
  })
})

describe('saveItems', () => {
  it('persists items to localStorage', () => {
    saveItems(seedItems)
    expect(mockStorage.setItem).toHaveBeenCalledWith(
      'underhallsplan_items',
      JSON.stringify(seedItems)
    )
  })
})
