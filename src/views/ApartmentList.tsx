import { Layout } from './Layout.js'

interface Apartment {
  id: number
  title: string
  price: string
  url: string
  img: string
  sqm: string
  rooms: string
  desc: string
  createdAt: string
}

export function ApartmentList({ apartments }: { apartments: Apartment[] }) {
  return (
    <Layout title="Apartments in Chamonix">
      <h1>Apartments in Chamonix</h1>
      <ul>
        {apartments.map((apt) => (
          <li key={apt.id}>
            <div
              class="image"
              style={`background-image: url(${apt.img})`}
            />
            <h4>
              <a target="_blank" href={apt.url}>
                {apt.title}
              </a>
            </h4>
            <strong>{apt.price} &euro;</strong> - {apt.createdAt}
            <br />
            <small>
              {apt.sqm}m&sup2; - rooms: {apt.rooms}
            </small>
            <p>{apt.desc}</p>
          </li>
        ))}
      </ul>
    </Layout>
  )
}
