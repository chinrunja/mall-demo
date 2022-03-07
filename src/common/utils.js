export function debounce(func, ms = 200) {
  let timer

  return function (...args) {
    clearTimeout(timer)

    timer = setTimeout(() => {
      func.apply(this, args)
    }, ms)
  }
}
