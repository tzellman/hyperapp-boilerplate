const actions = {
  add: ({ num, clicks }) => ({ num: num + 1, clicks: clicks + 1 }),
  sub: ({ num, clicks }) => ({ num: num - 1, clicks: clicks + 1 })
}

export default actions
