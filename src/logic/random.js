export function sampleWithoutReplacement(source, count) {
  const pool = [...source]
  return Array.from({ length: count }, () => {
    const index = Math.floor(Math.random() * pool.length)
    return pool.splice(index, 1)[0]
  })
}
