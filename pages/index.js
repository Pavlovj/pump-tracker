import { Banner } from '../components/Banner'
import { Header } from '../components/Header'
import { TrendingTable } from '../components/TrendingTable'

export default function Home() {
  return (
    <div className='bg-gray-800 text-white min-h-screen'>
      <Header />
      <Banner />

      <TrendingTable />
    </div>
  )
}
