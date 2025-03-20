const ContactForm = () => {
  return (
    <div className="col">
                    <form>
                        <div className="mb-3">
                            <label htmlFor="nameInput" className="form-label">Your name</label>
                            <input type="text" className="form-control" id="nameInput" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="subjectInput" className="form-label">Subject</label>
                            <input type="text" className="form-control" id="subjectInput" required />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="messageInput" className="form-label">Message</label>
                            <textarea type="text" className="form-control" id="messageInput" required />
                        </div>
                        <button type="submit" className="btn btn-lg btn-warning text-white">Submit</button>
                    </form>
                </div>
  )
}

export default ContactForm