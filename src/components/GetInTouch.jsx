import ContactInfo from "./ContactInfo"
import ContactForm from "./ContactForm"

const GetInTouch = () => {
  return (
        <>
            <section className="container text-center w-50 mb-5 text-dark-grey">
                <h2>Get In Touch With Us</h2>
                <p className="text-light-grey">For More Information About Our Product & Services. Please Feel Free To Drop Us An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!</p>
            </section>
            <section className="container py-5">
                <div className="row row-cols-1 row-cols-md-2">
                    <ContactInfo />
                    <ContactForm />
                </div>
            </section>
        </>
  )
}

export default GetInTouch