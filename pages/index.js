import { Banner } from '../components/Banner'
import { Header } from '../components/Header'

export default function Home() {
  return (
    <div className='bg-gray-800 text-white min-h-screen'>
      <Header />
      <Banner />
    </div>
  )
}
