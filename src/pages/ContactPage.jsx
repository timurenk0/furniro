import PageName from "../components/PageName"
import GetInTouch from "../components/GetInTouch"
import ClientSupport from "../components/ClientSupport"

const ContactPage = () => {
  return (
    <main>
        <PageName pageName={"Contact"} />
        <GetInTouch />
        <ClientSupport />
    </main>
  )
}

export default ContactPage