import FancyUserCard from "./components/FancyUserCard"
import FullProfileUserCard from "./components/FullProfileUserCard"
import LikeUserCard from "./components/LikeUserCard"
import SimpleUserCard from "./components/SimpleUserCard"

export default function Page() {
  return (
    <div>
      <h1 className="text-xl font-bold mb-5">Caching (Request Memoization)</h1>
      <div className="space-y-4">
        <SimpleUserCard />
        <FancyUserCard />
        <FullProfileUserCard />
        <LikeUserCard />
      </div>
    </div>
  )
}
