import DiscoverMore from "../components/DiscoverMore"
import BrowseRange from "../components/BrowseRange"
import OurProducts from "../components/OurProducts"

const HomePage = () => {
  return (
    <>
        <DiscoverMore />
        <BrowseRange />
        <OurProducts isHome={true}/>
    </>
  )
}

export default HomePage