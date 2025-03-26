import { GrTrophy, GrGift } from "react-icons/gr";
import { PiSealCheckLight } from "react-icons/pi";
import { MdOutlineSupportAgent } from "react-icons/md";

const ClientSupport = () => {
  return (
    <section className="container-fluid bg-yellowish py-6">
        <div className="row row-cols-1 row-cols-md-4 px-5">
            <div className="col d-flex py-4 py-md-0">
                <GrTrophy className="custom-icons" />
                <div className="ps-3 client-support">
                    <h4>High Quality</h4>
                    <h5>Crafted from top materials</h5>
                </div>
            </div>
            <div className="col d-flex py-4 py-md-0">
                <PiSealCheckLight className="custom-icons" />
                <div className="ps-3 client-support">
                    <h4>Warranty Protection</h4>
                    <h5>Over 2 years</h5>
                </div>
            </div>
            <div className="col d-flex py-4 py-md-0">
                <GrGift className="custom-icons" />
                <div className="ps-3 client-support">
                    <h4>Free Shipping</h4>
                    <h5>Order over $350</h5>
                </div>
            </div>
            <div className="col d-flex py-4 py-md-0">
                <MdOutlineSupportAgent className="custom-icons" />
                <div className="ps-3 client-support">
                    <h4>24 / 7 Support</h4>
                    <h5>Dedicated assistance</h5>
                </div>
            </div>
        </div>
    </section>
  )
}

export default ClientSupport