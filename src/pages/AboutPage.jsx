import PageName from "../components/PageName"
import ClientSupport from "../components/ClientSupport"

const AboutPage = () => {
    
  return (
    <main>
        <PageName pageName={"About"} />
        <section className="container mb-5">
            <h2 className="text-dark-grey">The Story Behind Furniro</h2>
            <p className="text-grey">Furniro began with a simple yet ambitious idea: to make stylish, high-quality furniture accessible to everyone, no matter where they live. 
                Our journey started when a group of design enthusiasts stumbled upon an elegant yet freely available web design template on Figma. 
                Inspired by its clean aesthetics and modern functionality, we saw an opportunity to build something greater—a brand that seamlessly combines convenience, 
                affordability, and sustainability.<br /><br />
                From day one, we aimed to redefine how people shop for furniture. We believe that every home deserves beautiful, functional, and long-lasting pieces 
                without the hassle of traditional shopping.  That’s why we created Furniro: an online furniture store that puts the customer experience first while 
                remaining committed to ethical and eco-friendly practices.
            </p>
            <h2 className="mt-5 text-dark-grey">Our Mission and Vision</h2>
            <p className="text-grey">At Furniro, our mission is to transform the furniture industry by making top-quality products available at competitive prices. 
                We envision a world where stylish interiors are no longer a luxury but a standard for everyone. By leveraging innovative technology, sustainable materials, 
                and outstanding craftsmanship, we are striving to become the leading name in online furniture retail.<br /><br />
                We don’t just sell furniture; we bring design, comfort, and functionality into people’s lives. Our goal is to simplify the shopping experience, 
                ensuring that every piece you purchase enhances your home’s aesthetic while being durable, affordable, and environmentally responsible.
            </p>
            <h2 className="mt-5 text-dark-grey">Commitment to Sustainability</h2>
            <p className="text-grey">
                We understand that the furniture industry has a significant impact on the environment. That’s why we take conscious steps toward sustainability at every 
                stage of our business. From sourcing eco-friendly materials to using sustainable packaging, we’re committed to minimizing our carbon footprint.<br /><br />
                Our wood comes from responsibly managed forests, ensuring that for every tree used, more are planted. We prioritize recycled and upcycled materials, 
                reducing waste and promoting a circular economy. Even our logistics are designed to be eco-conscious, with smart packaging techniques that reduce excess 
                materials and carbon emissions.<br /><br />
                Beyond our products, we actively participate in global sustainability initiatives. A portion of our profits goes toward reforestation programs and other 
                environmental projects. Because at Furniro, we believe that great design should not come at the cost of our planet.
            </p>
            <h2 className="mt-5 text-dark-grey">The Furniro Collection</h2>
            <p className="text-grey">
                Our catalog features an extensive range of furniture pieces, from modern minimalistic designs to timeless classics. Whether you’re looking for a sleek 
                office desk, a cozy sofa, or a dining set that brings family and friends together, Furniro has something for every space.<br /><br />
                We collaborate with talented designers and skilled artisans to craft furniture that stands the test of time. Each piece undergoes rigorous quality checks 
                to ensure it meets our high standards before reaching your home. And with our user-friendly online platform, browsing, selecting, and purchasing furniture 
                has never been easier.
            </p>
            <h2 className="mt-5 text-dark-grey">Our Achievements and Future Goals</h2>
            <p className="text-grey">
                Since our launch, we have gained thousands of happy customers who trust Furniro for their home decor needs. Our commitment to quality, affordability, and 
                sustainability has helped us establish a strong reputation in the industry. Some of our notable achievements include:<br /><br />
            <ul>
                <li>Successfully delivering furniture to customers in multiple countries.</li>
                <li>Expanding our product line to include a wide range of home essentials.</li>
                <li>Receiving excellent reviews for our customer service and hassle-free shopping experience.</li>
                <li>Partnering with sustainable suppliers to ensure ethical sourcing of materials.</li>
            </ul>
            But we’re just getting started. Our long-term goals include:<br /><br />
            <ul>
                <li>Becoming the top online furniture retailer in the market.</li>
                <li>Introducing a customizable furniture range to allow customers to design their perfect pieces.</li>
                <li>Expanding our sustainability efforts by using even more recycled materials and eco-friendly production methods.</li>
                <li>Enhancing our logistics network to ensure faster, more efficient, and carbon-neutral delivery.</li>
            </ul>
            </p>
            <h2 className="mt-5 text-dark-grey">Why Choose Furniro?</h2>
            <p className="text-grey">
                There are plenty of online furniture retailers out there, but Furniro stands out for a few key reasons:<br /><br />
                <ul>
                    <li><b>Unmatched Quality:</b> Every piece of furniture is crafted with precision and care, ensuring durability and elegance.</li>
                    <li><b>Sustainable Practices:</b> We prioritize eco-friendly materials and ethical production methods.</li>
                    <li><b>Affordable Pricing:</b> Luxury design shouldn’t break the bank, and we work hard to keep our prices competitive.</li>
                    <li><b>Seamless Shopping Experience:</b> Our website is designed to make browsing and purchasing effortless, with detailed product descriptions and high-resolution images.</li>
                    <li><b>Exceptional Customer Support:</b> We value our customers and go the extra mile to provide support at every stage of their shopping journey.</li>
                </ul>
            </p>
        </section>
        <ClientSupport />
    </main>
  )
}

export default AboutPage