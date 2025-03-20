import { HiMapPin } from "react-icons/hi2";
import { FaPhoneAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";

const ContactInfo = () => {

    const address = "https://www.google.com/maps/place/Gisma+University+of+Applied+Sciences/@52.4082927,12.8229199,11z/data=!3m1!5s0x47a8f6f5be4d5021:0x2c47dc9a994031eb!4m10!1m2!2m1!1sGISMA!3m6!1s0x47a8f7a4d1dc0a51:0x8d43dcbe9ec1d162!8m2!3d52.434749!4d13.0544452!15sCgVHSVNNQZIBCnVuaXZlcnNpdHngAQA!16s%2Fg%2F11qqmkt301?entry=ttu&g_ep=EgoyMDI1MDIyNS4wIKXMDSoASAFQAw%3D%3D"
    const number = "https://wa.me/4915234640640"
    
  return (
                <div>
                    <div className="mb-5 d-flex flex-column align-items-center d-md-block">
                        <a style={{fontSize: "32px", fontWeight: "600"}} className="text-decoration-none text-black" href={address} >
                            <HiMapPin className="inline mb-3 me-3" />
                            Address
                        </a>
                        <a style={{fontSize: "16px", fontWeight: "300"}} className="d-block w-50 ms-5 text-grey text-decoration-none" href={address}>GISMA University of Applied Sciences, Konrad-Zuse-Ring 11, Potsdam, BB, Germany</a>
                    </div>
                    <div className="mb-5 d-flex flex-column align-items-center d-md-block">
                        <a style={{fontSize: "32px", fontWeight: "600"}} className="text-decoration-none text-black" href={number} >
                            <FaPhoneAlt className="inline mb-3 me-3"/>
                            Phone
                        </a>
                        <a style={{fontSize: "16px", fontWeight: "300"}} className="d-block w-50 ms-5 text-grey text-decoration-none" href={number}>+(49) 15 234 640 640</a>
                    </div>
                    <div className="mb-5 d-flex flex-column align-items-center d-md-block">
                        <div style={{fontSize: "32px", fontWeight: "600"}} className="text-decoration-none text-black" >
                            <FaClock className="inline mb-3 me-3" />
                            Working Time
                        </div>
                        <div style={{fontSize: "16px", fontWeight: "300"}} className="d-block w-50 ms-5 text-grey text-decoration-none">Monday-Friday: 9:00 - 22:00<br />Saturday: 9:00 - 20:00<br />Sunday: Closed</div>
                    </div>
                </div>
  )
}

export default ContactInfo