import { useRef, useState, type FormEvent } from 'react'
import { benefits, cars, steps, testimonials } from './data'

const asset = (file: string) => import.meta.env.BASE_URL + 'figma/' + file
type Car = (typeof cars)[number]
type Panel = { kind: 'rent'; car: Car } | { kind: 'Sign in' | 'Sign up' }

function Icon({ file, size, className = '' }: { file: string; size: number; className?: string }) {
  return <img src={asset(file)} width={size} height={size} className={'shrink-0 ' + className} alt="" />
}

function Logo({ footer = false }: { footer?: boolean }) {
  return <a href="#top" className="flex w-fit items-center gap-2 font-semibold" aria-label="Rentcars home">
    <img src={asset(footer ? '0f6e4.svg' : '2eefc.svg')} width="24" height="26" alt="" /> RENTCARS
  </a>
}

function Stores() {
  return <div className="stores flex flex-wrap gap-3">
    <a className="store" href="https://play.google.com/store/search?q=rentcars&c=apps" aria-label="Find Rentcars on Google Play" />
    <a className="store apple" href="https://apps.apple.com/us/search?term=rentcars" aria-label="Find Rentcars on the App Store" />
  </div>
}

function Heading({ label, children }: { label: string; children: string }) {
  return <div className="section-heading">
    <span className="tag">{label}</span>
    <h2>{children}</h2>
  </div>
}

const links = [['Become a renter', '#booking'], ['Rental deals', '#deals'], ['How it work', '#how'], ['Why choose us', '#why']] as const

function SearchForm({ onSearch }: { onSearch: (location: string) => void }) {
  const [pickup, setPickup] = useState('')
  const [dropoff, setDropoff] = useState('')
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onSearch(String(new FormData(event.currentTarget).get('location')).trim())
  }
  return <form id="booking" className="booking shell" onSubmit={submit}>
    <label className="field">
      <Icon file="64d8f.svg" size={32} />
      <span><span className="field-title">Location</span><input name="location" placeholder="Search your location" required /></span>
    </label>
    {([{ label: 'Pickup date', hint: 'Tue 15 Feb, 09:00', val: pickup, set: setPickup },
      { label: 'Return date', hint: 'Thu 16 Feb, 11:00', val: dropoff, set: setDropoff, min: pickup }]).map((field) =>
      <label className="field" key={field.label}>
        <Icon file="b0047.svg" size={32} /><span>
          <span className="field-title">{field.label}</span>
          <span className={'date-field ' + (field.val ? 'has-date' : '')}>
            <span aria-hidden="true">{field.hint}</span>
            <input aria-label={field.label} type="datetime-local" value={field.val} min={field.min} onChange={(event) => field.set(event.target.value)} required />
          </span>
        </span>
      </label>,
    )}
    <button className="primary h-12">Search</button>
  </form>
}

function Hero({ onPanel, onSearch }: { onPanel: (panel: Panel) => void; onSearch: (location: string) => void }) {
  const [menu, setMenu] = useState(false)
  return <header id="top" className="hero">
    <img className="hero-mark" src={asset('79dec.svg')} alt="" />
    <div className="shell header-bar">
      <Logo />
      <button className="menu-toggle" type="button" aria-expanded={menu} aria-controls="site-menu" onClick={() => setMenu(!menu)}>{menu ? 'Close' : 'Menu'}</button>
      <div id="site-menu" className={'header-menu ' + (menu ? 'open' : '')}>
        <nav aria-label="Main navigation">{links.map(([label, href]) => <a key={href} href={href} onClick={() => setMenu(false)}>{label}</a>)}</nav>
        <div className="auth flex items-center gap-6">
          <button type="button" onClick={() => { setMenu(false); onPanel({ kind: 'Sign in' }) }}>Sign in</button>
          <button type="button" className="primary px-8 h-[43px]" onClick={() => { setMenu(false); onPanel({ kind: 'Sign up' }) }}>Sign up</button>
        </div>
      </div>
    </div>
    <div className="shell hero-stage">
      <div className="hero-copy">
        <h1>Find, book and<br className="desktop-break" /> rent a car <span>Easily<img src={asset('45951.svg')} alt="" /></span></h1>
        <p>Get a car wherever and whenever you need it with your IOS and Android device.</p>
        <Stores />
      </div>
      <img className="hero-car" src={asset('f8d61.png')} alt="Blue sports car" fetchPriority="high" />
    </div>
    <SearchForm onSearch={onSearch} />
  </header>
}

function HowItWorks() {
  const brands = [['3fc34.svg', 'Honda'], ['06793.svg', 'Jaguar'], ['e89dd.svg', 'Nissan'], ['7f0aa.svg', 'Volvo'], ['bd632.svg', 'Audi'], ['2df0b.svg', 'Acura']]
  return <section className="how" id="how">
    <div className="shell">
      <Heading label="HOW IT WORK">Rent with following 3 working steps</Heading>
      <ol className="steps">
        {steps.map(([file, title, body]) => <li key={title}>
          <div className="icon-tile"><Icon file={file} size={48} /></div>
          <h3>{title}</h3><p>{body}</p>
        </li>)}
      </ol>
    </div>
    <div className="brands">{brands.map(([file, name]) => <img key={name} alt={name} src={asset(file)} />)}</div>
  </section>
}

function WhyUs() {
  return <section className="why" id="why">
    <div className="why-art"><img className="why-mark" src={asset('adbc9.svg')} alt="" /><img className="why-car" src={asset('3fc06.png')} alt="Silver Audi R8" /></div>
    <div className="why-copy">
      <Heading label="WHY CHOOSE US">We offer the best experience with our rental deals</Heading>
      <ul className="benefits">{benefits.map(([file, title, body]) => <li key={title}>
        <div className="icon-tile"><Icon file={file} size={24} /></div>
        <div><h3>{title}</h3><p>{body}</p></div>
      </li>)}</ul>
    </div>
  </section>
}

function Deals({ onRent, location }: { onRent: (car: Car) => void; location: string }) {
  const [all, setAll] = useState(false)
  return <section className="deals shell" id="deals">
    <Heading label="POPULAR RENTAL DEALS">Most popular cars rental deals</Heading>
    {location && <p className="deal-note" role="status">Browse vehicles for {location}. Live availability is not connected.</p>}
    <div className="car-grid" id="vehicles">{cars.map((car, i) => <article className="car-card" key={car.name}>
      <div className="car-photo" data-car={i}><div><img src={asset(car.image)} alt={car.name} /></div></div>
      <div className="car-details">
        <h3>{car.name}</h3>
        <p className="rating"><Icon file="b4275.svg" size={16} /><span><strong>{car.rating}</strong> ({car.reviews} reviews)</span></p>
        <ul className="specs">
          {([['786c8.svg', car.seats + ' Passagers'], ['5c7c4.svg', 'Auto'], ['af0ad.svg', 'Air Conditioning'], ['5dcd6.svg', car.seats + ' Doors']]).map(([file, label]) =>
            <li key={file}><Icon file={file} size={20} /><span>{label}</span></li>,
          )}
        </ul>
        <p className="price"><span>Price</span><span><strong>{car.price}</strong> /day</span></p>
        <button className="primary rent-button" type="button" onClick={() => onRent(car)} aria-label={'Rent ' + car.name}>Rent Now <Icon file="9153a.svg" size={20} /></button>
      </div>
    </article>)}</div>
    <button type="button" className="outline" aria-expanded={all} aria-controls="catalog-status" onClick={() => setAll(!all)}>
      {all ? 'Hide vehicle count' : 'Show all vehicles'} <Icon file="9eee0.svg" size={20} />
    </button>
    <p className="catalog-status" id="catalog-status" hidden={!all}>All {cars.length} vehicles are shown.</p>
  </section>
}

function Reviews() {
  return <section className="reviews" aria-label="Testimonials">
    <img src={asset('c4033.svg')} className="quote-left" alt="" />
    <img src={asset('f8510.svg')} className="quote-right" alt="" />
    <Heading label="TESTIMONIALS">What people say about us?</Heading>
    <div className="review-track">{testimonials.map((review) => <article className="review-card" key={review.name}>
      <img className="review-photo" src={asset(review.image)} width="397" height="438" alt="" />
      <div className="review-copy">
        <p className="score"><strong>5.0</strong><span>stars</span></p>
        <img width="136" height="24" src={asset('c803b.svg')} alt="" />
        <blockquote>“{review.text}”</blockquote>
        <div className="review-by"><h3>{review.name}</h3><p>{review.location}</p></div>
      </div>
    </article>)}</div>
  </section>
}

function Download() {
  return <section className="download" id="download">
    <img className="download-mark" src={asset('796ad.svg')} alt="" />
    <div className="shell download-inner">
      <div className="download-copy">
        <span className="tag">DOWNLOAD</span>
        <h2>Download Rentcars App for <span>FREE</span></h2>
        <p>For faster, easier booking and exclusive deals.</p>
        <Stores />
      </div>
      <div className="phone" role="img" aria-label="Rentcars app shown on an iPhone">
        <img src={asset('b9451.png')} className="phone-shadow" alt="" />
        <img src={asset('69296.png')} className="phone-body" alt="" />
        <img src={asset('09f20.png')} className="phone-screen" alt="" />
      </div>
    </div>
  </section>
}

const footerGroups = [
  ['Our Product', ['Career', 'Car', 'Packages', 'Features', 'Priceline']],
  ['Resources', ['Download', 'Help Centre', 'Guides', 'Partner Network', 'Cruises', 'Developer']],
  ['About Rentcars', ['Why choose us', 'Our Story', 'Investor Relations', 'Press Center', 'Advertise']],
] as const
const footerLinks: Record<string, string> = { Car: '#deals', Packages: '#deals', Features: '#why', Download: '#download', Guides: '#how', 'Why choose us': '#why', 'Help Centre': 'mailto:rentcars@gmail.com' }

function Footer() {
  return <footer className="footer">
    <div className="shell">
      <div className="footer-grid">
        <div className="contact">
          <Logo footer />
          <address>
            <p><Icon file="e737c.svg" size={24} /><span>25566 Hc 1, Glenallen,<br /> Alaska, 99588, USA</span></p>
            <a href="tel:+603478427312"><Icon file="48458.svg" size={24} />+603 4784 273 12</a>
            <a href="mailto:rentcars@gmail.com"><Icon file="eec7b.svg" size={24} />rentcars@gmail.com</a>
          </address>
        </div>
        {footerGroups.map(([title, items]) => <div className="footer-group" key={title}>
          <h2>{title}</h2>
          <ul>{items.map(item => <li key={item}>{footerLinks[item] ? <a href={footerLinks[item]}>{item}</a> : item}</li>)}</ul>
        </div>)}
        <div className="footer-group"><h2>Follow Us</h2><div className="flex gap-4">
          <a href="https://www.facebook.com/Rentcars/" aria-label="Facebook"><Icon file="3bb38.svg" size={24} /></a>
          <a href="https://www.instagram.com/rentcars/" aria-label="Instagram"><Icon file="06984.svg" size={24} /></a>
          <a href="https://www.youtube.com/@rentcars" aria-label="YouTube"><Icon file="b9ff5.svg" size={24} /></a>
        </div></div>
      </div>
      <p className="copyright">Copyright 2023 ・ Rentcars, All Rights Reserved</p>
    </div>
  </footer>
}

export default function App() {
  const [panel, setPanel] = useState<Panel | null>(null)
  const [location, setLocation] = useState('')
  const dialog = useRef<HTMLDialogElement>(null)
  function open(next: Panel) {
    setPanel(next)
    dialog.current?.showModal()
  }
  function search(place: string) {
    setLocation(place)
    document.getElementById('deals')?.scrollIntoView()
  }
  return <>
    <Hero onPanel={open} onSearch={search} />
    <main><HowItWorks /><WhyUs /><Deals onRent={(car) => open({ kind: 'rent', car })} location={location} /><Reviews /><Download /></main>
    <Footer />
    <dialog ref={dialog} aria-labelledby="panel-title" onClose={() => setPanel(null)}>
      {panel && <div className="panel">
        <h2 id="panel-title">{panel.kind === 'rent' ? panel.car.name : panel.kind}</h2>
        {panel.kind === 'rent'
          ? <p>{panel.car.price} per day. Online booking is not connected in this demo.</p>
          : <p>Account services are not connected in this demo.</p>}
        <button type="button" className="primary px-6 h-11" onClick={() => dialog.current?.close()}>Close</button>
      </div>}
    </dialog>
  </>
}
