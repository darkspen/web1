type Listener<T> = (val: T) => void

export function createStore<T>(initial: T) {
  let val = initial
  const listeners = new Set<Listener<T>>()
  return {
    get: () => val,
    set: (next: T) => {
      val = next
      listeners.forEach(fn => fn(next))
    },
    subscribe: (fn: Listener<T>) => {
      listeners.add(fn)
      return () => listeners.delete(fn)
    },
  }
}
