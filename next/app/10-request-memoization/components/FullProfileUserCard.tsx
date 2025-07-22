export default async function SimpleUserCard() {
  const res = await fetch('https://randomuser.me/api?nat=us')
  const data = await res.json() as {
    results: {
      gender: "male" | "female"
      name: {
        title: string
        first: string
        last: string
      }
      location: {
        street: {
          number: number
          name: string
        }
        city: string
        state: string
        country: string
        postcode: number
        coordinates: {
          latitude: string
          longitude: string
        }
        timezone: {
          offset: string
          description: string
        }
      }
      email: string
      dob: {
        date: string
        age: number
      }
      phone: string
      cell: string
      picture: {
        medium: string
      }
    }[]
  }
  const user = data.results[0]
  return (
    <div className="max-w-md p-4 border-2 border-gray-200 bg-white">
      <img className="mb-2" src={user.picture.medium} alt={`${user.name.first} ${user.name.last}`} />
      <h2 className="mb-2 text-lg font-bold">{user.name.title} {user.name.first} {user.name.last}</h2>
      <p><b>Gender:</b> {user.gender === 'male' ? 'Male' : 'Female'}</p>
      <p><b>Location:</b> {user.location.street.number} {user.location.street.name}, {user.location.city}, {user.location.state}, {user.location.country} {user.location.postcode}</p>
      <p><b>Coordinates:</b> {user.location.coordinates.latitude}, {user.location.coordinates.longitude}</p>
      <p><b>Timezone:</b> {user.location.timezone.offset} {user.location.timezone.description}</p>
      <p><b>Email:</b> {user.email}</p>
      <p><b>DOB:</b> {user.dob.date} ({user.dob.age} years old)</p>
      <p><b>Phone:</b> {user.phone}</p>
      <p><b>Cell:</b> {user.cell}</p>
    </div>
  )
}
