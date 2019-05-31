const rooms = [
  {
    room_rate_type_id: 202,
    price: 200,
  },
  {
    room_rate_type_id: 202,
    price: 200,
  },
  {
    room_rate_type_id: 202,
    price: 189,
  },
  {
    room_rate_type_id: 190,
    price: 200,
  },
]

let result = allRefIds.filter((e, i) => {
  return (
    allRefIds.findIndex(x => {
      return x.model == e.model && x.id == e.id
    }) == i
  )
})
