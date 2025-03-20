import discover from "../assets/discover.png"

import {Link} from "react-router-dom"

const DiscoverMore = () => {
  return (
    <>
        <section className="position-relative overflow-hidden" style={{height: "75vh", width: "100vw"}}>
            <img src={discover} alt="" className="w-100 position-absolute top-50 start-50 translate-middle" style={{ minHeight: "100%", objectFit: "cover" }} />
            <div className="discover-more">
                <p id="new-arrival">New Arrival</p>
                <h1>Discover Our New Collection</h1>
                <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolorem laboriosam voluptatem totam, quaerat, necessitatibus eius iste fugiat.</p>
                <Link to="/shop" className="text-white"><button type="button" style={{backgroundColor: "#B88E2F"}} className="btn mt-4">Buy Now</button></Link>
            </div>
        </section>
    </>
  )
}

export default DiscoverMore