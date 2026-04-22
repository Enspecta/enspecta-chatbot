import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useItems } from '../hooks/useItems.js'

const mockStorage = (() => {
  let store = {}
  return {
    getItem: vi.fn((key) => store[key] ?? null),
    setItem: vi.fn((key, val) => { store[key] = val }),
    clear: () => { store = {}; mockStorage.getItem.mockClear(); mockStorage.setItem.mockClear() },
  }
})()

beforeEach(() => {
  mockStorage.clear()
  vi.stubGlobal('localStorage', mockStorage)
})

describe('useItems', () => {
  it('initializes with seed items when storage is empty', () => {
    const { result } = renderHook(() => useItems())
    expect(result.current.items.length).toBeGreaterThan(0)
  })

  it('addItem adds a new item with generated id', () => {
    const { result } = renderHook(() => useItems())
    const before = result.current.items.length
    act(() => {
      result.current.addItem({ title: 'Ny punkt', priority: 'planerat', category: 'El', location: 'Kök' })
    })
    expect(result.current.items.length).toBe(before + 1)
    const added = result.current.items.find(i => i.title === 'Ny punkt')
    expect(added).toBeDefined()
    expect(added.id).toBeTruthy()
    expect(added.done).toBe(false)
  })

  it('markDone toggles done state and sets doneDate', () => {
    const { result } = renderHook(() => useItems())
    const id = result.current.items[0].id
    act(() => { result.current.markDone(id) })
    const item = result.current.items.find(i => i.id === id)
    expect(item.done).toBe(true)
    expect(item.doneDate).toBeTruthy()
  })

  it('markDone toggles back to undone', () => {
    const { result } = renderHook(() => useItems())
    const id = result.current.items[0].id
    act(() => { result.current.markDone(id) })
    act(() => { result.current.markDone(id) })
    const item = result.current.items.find(i => i.id === id)
    expect(item.done).toBe(false)
    expect(item.doneDate).toBeUndefined()
  })

  it('removeItem removes item by id', () => {
    const { result } = renderHook(() => useItems())
    const id = result.current.items[0].id
    const before = result.current.items.length
    act(() => { result.current.removeItem(id) })
    expect(result.current.items.length).toBe(before - 1)
    expect(result.current.items.find(i => i.id === id)).toBeUndefined()
  })

  it('persists items to localStorage on change', () => {
    const { result } = renderHook(() => useItems())
    act(() => {
      result.current.addItem({ title: 'Test', priority: 'planerat', category: 'El', location: 'Kök' })
    })
    expect(mockStorage.setItem).toHaveBeenCalledWith(
      'underhallsplan_items',
      expect.any(String)
    )
  })
})
