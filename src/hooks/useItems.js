import { useState, useEffect } from 'react'
import { loadItems, saveItems } from '../data/storage.js'

export function useItems() {
  const [items, setItems] = useState(() => loadItems())

  useEffect(() => {
    saveItems(items)
  }, [items])

  function addItem({ title, priority, category, location, note }) {
    const newItem = {
      id: Date.now().toString(),
      title,
      priority,
      category,
      location,
      note: note || undefined,
      done: false,
    }
    setItems(prev => [...prev, newItem])
  }

  function markDone(id) {
    setItems(prev => prev.map(item => {
      if (item.id !== id) return item
      if (item.done) {
        const { doneDate, ...rest } = item
        return { ...rest, done: false }
      }
      return { ...item, done: true, doneDate: new Date().toISOString().slice(0, 10) }
    }))
  }

  function removeItem(id) {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  return { items, addItem, markDone, removeItem }
}
