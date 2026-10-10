import { useEffect, useRef, useState } from 'react'
import { birthdayContent as content } from './content'
import './App.css'

const HeartIcon = ({ filled = false }) => (
  <svg
    aria-hidden="true"
    className={filled ? 'icon icon--filled' : 'icon'}
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <path d="M20.8 8.9c0 5.1-8.8 10.1-8.8 10.1S3.2 14 3.2 8.9A4.7 4.7 0 0 1 12 6.2a4.7 4.7 0 0 1 8.8 2.7Z" />
  </svg>
)

const ArrowIcon = () => (
  <svg aria-hidden="true" className="icon" viewBox="0 0 24 24" fill="none">
    <path d="M5 12h13M13 6l6 6-6 6" stroke="currentColor" strokeWidth="1.6" />
  </svg>
)

const SparkleIcon = () => (
  <svg aria-hidden="true" className="icon" viewBox="0 0 24 24" fill="none">
    <path d="M12 2v20M2 12h20M4.9 4.9l14.2 14.2M19.1 4.9 4.9 19.1" stroke="currentColor" strokeWidth="1" />
  </svg>
)

const FlowerDoodle = ({ className = '' }) => (
  <svg aria-hidden="true" className={`flower-doodle ${className}`} viewBox="0 0 120 120" fill="none">
    <path d="M60 60c-7-18-4-37 9-49 6 16 3 32-9 49ZM60 60c17-8 35-7 47 4-15 9-31 8-47-4ZM60 60c8 17 7 35-4 47-9-15-8-31 4-47ZM60 60c-17 8-35 7-47-4 15-9 31-8 47 4ZM60 60c-1-19 7-35 22-42 1 17-7 31-22 42ZM60 60c19-1 35 7 42 22-17 1-31-7-42-22Z" stroke="currentColor" strokeWidth="1.1" />
    <circle cx="60" cy="60" r="5" fill="currentColor" />
  </svg>
)

// Native modal dialogs keep keyboard focus inside and make the page behind inert.
function useModal(isOpen) {
  const ref = useRef(null)

  useEffect(() => {
    if (!isOpen || !ref.current) return
    const dialog = ref.current
    const opener = document.activeElement
    dialog.showModal()
    return () => {
      dialog.close()
      if (opener instanceof HTMLElement && opener.isConnected) opener.focus({ preventScroll: true })
    }
  }, [isOpen])

  return ref
}

function Intro({ isOpen, onOpen }) {
  return (
    <section className={`intro-screen ${isOpen ? 'intro-screen--dismissed' : ''}`} aria-label="Birthday surprise introduction" inert={isOpen} aria-hidden={isOpen}>
      <div className="intro-orb intro-orb--one" />
      <div className="intro-orb intro-orb--two" />
      <div className="intro-topline">
        <span>for {content.nickname}, with love</span>
        <span className="intro-topline__mark">✦</span>
        <span>{content.shortDate}</span>
      </div>

      <div className="intro-content">
        <div className="intro-copy">
          <p className="eyebrow eyebrow--light">{content.intro.eyebrow}</p>
          <h1>
            A little <em>surprise</em>
            <br />for {content.nickname}<span className="accent-dot">.</span>
          </h1>
          <p className="intro-description">{content.intro.description}</p>
        </div>

        <div className="envelope-scene" aria-hidden="true">
          <div className="envelope-shadow" />
          <div className="envelope-envelope">
            <div className="envelope-paper-envelope">
              <span>21</span>
              <small>for you</small>
            </div>
            <div className="envelope-flap-envelope" />
            <div className="envelope-front-envelope" />
            <HeartIcon filled />
          </div>
          <span className="envelope-note envelope-note--left">open when ready</span>
          <span className="envelope-note envelope-note--right">with all my love</span>
        </div>
      </div>

      <div className="intro-action">
        <button type="button" className="button button--light" onClick={onOpen}>
          Open your surprise <ArrowIcon />
        </button>
        <span className="intro-action__hint">A little scroll through the heart</span>
      </div>

      <div className="intro-bottomline">
        <span>made for {content.nickname}</span>
        <span className="intro-bottomline__line" />
        <span>with every good feeling</span>
      </div>
    </section>
  )
}

function SiteHeader({ onFinalClick }) {
  return (
    <header className="site-header">
      <a className="brand" href="#hero" aria-label="Back to the beginning">
        <span className="brand-mark"><HeartIcon filled /></span>
        <span>for her, <em>with love</em></span>
      </a>
      <nav className="site-nav" aria-label="Main navigation">
        <a href="#memories">Memories</a>
        <a href="#dreams">Her dreams</a>
        <a href="#reasons">21 things</a>
        <a href="#letter">The letter</a>
        <a href="#sister">For her Didi</a>
      </nav>
      <button type="button" className="header-love-button" onClick={onFinalClick} aria-label="Jump to the final surprise">
        <HeartIcon />
      </button>
    </header>
  )
}

function Hero({ onBegin }) {
  return (
    <section className="hero-section page-section" id="hero" tabIndex="-1">
      <div className="hero-backdrop-word" aria-hidden="true">love</div>
      <div className="section-index section-index--hero"><span>01</span><span className="section-index__line" /><span>07</span></div>
      <div className="hero-content">
        <div className="hero-copy">
          <p className="eyebrow">{content.hero.eyebrow}</p>
          <h2>{content.hero.title}<br /><em>{content.herName}.</em></h2>
          <p className="hero-subtitle">{content.hero.subtitle}</p>
          <button type="button" className="text-link" onClick={onBegin}>
            Begin our little story <ArrowIcon />
          </button>
        </div>

        <div className="hero-portrait-wrap">
          <div className="hero-portrait-frame">
            <img className="hero-portrait-photo" src={content.hero.image} alt={`${content.nickname}, the birthday girl`} />
            <span className="placeholder-photo-label">{content.hero.portraitLabel}</span>
            <span className="portrait-tape" />
          </div>
          <div className="hero-stamp"><span>made<br />with<br /><HeartIcon filled /></span></div>
          <span className="hero-caption">The main character<br />of my favorite story</span>
        </div>
      </div>
      <div className="hero-footer">
        <span>{content.date}</span>
        <span className="hero-footer__center"><SparkleIcon /> scroll to wander through the love</span>
        <span>chapter 01</span>
      </div>
    </section>
  )
}

function SectionIntro({ number, eyebrow, title, description, align = '' }) {
  return (
    <div className={`section-intro ${align ? `section-intro--${align}` : ''}`}>
      <div className="section-number">{number}</div>
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
        {description && <p className="section-description">{description}</p>}
      </div>
    </div>
  )
}

function MemoryCard({ memory, onSelect, index }) {
  return (
    <button type="button" className={`memory-card memory-card--${memory.tone} memory-card--${index + 1}`} onClick={() => onSelect(memory)}>
      <div className="memory-card__photo">
        <span className="memory-card__photo-number">{memory.number}</span>
        {memory.image ? (
          <img className="memory-card__image" src={memory.image} alt={memory.title} loading="lazy" decoding="async" />
        ) : (
          <div className="memory-placeholder-art">
            <div className="placeholder-sun" />
            <div className="placeholder-horizon" />
            <div className="placeholder-sparkle placeholder-sparkle--one">✦</div>
            <div className="placeholder-sparkle placeholder-sparkle--two">✦</div>
            <span className="memory-placeholder-art__label">add a<br />photo here</span>
          </div>
        )}
        <span className="memory-card__edit">{memory.image ? 'open photo' : 'add photo'} <span>{memory.image ? '↗' : '+'}</span></span>
      </div>
      <div className="memory-card__details">
        <span className="memory-card__number">{memory.number}</span>
        <span className="memory-card__title">{memory.title}</span>
        <span className="memory-card__arrow"><ArrowIcon /></span>
      </div>
      <p className="memory-card__caption">{memory.caption}</p>
      <span className="sr-only">Open memory {memory.number}: {memory.title}</span>
    </button>
  )
}

function MemoryModal({ memory, onClose }) {
  const dialogRef = useModal(Boolean(memory))

  if (!memory) return null

  return (
    <dialog ref={dialogRef} className="modal-backdrop" aria-labelledby="memory-title" aria-describedby="memory-description" onCancel={(event) => { event.preventDefault(); onClose() }} onClick={(event) => { if (event.target === event.currentTarget) onClose() }}>
      <div className={`memory-modal memory-modal--${memory.tone}`}>
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close memory details">×</button>
        {memory.image ? (
          <img className="modal-photo" src={memory.image} alt={memory.title} />
        ) : (
          <div className="modal-placeholder">
            <span>{memory.number}</span>
            <small>your photo here</small>
          </div>
        )}
        <p className="eyebrow">A frame kept close</p>
        <h2 id="memory-title">{memory.title}</h2>
        <p id="memory-description">{memory.note}</p>
        <button type="button" className="text-link" onClick={onClose}>Back to our memories <ArrowIcon /></button>
      </div>
    </dialog>
  )
}

function Memories({ onSelect }) {
  return (
    <section className="memories-section page-section" id="memories">
      <div className="floating-heart floating-heart--one" aria-hidden="true">♡</div>
      <div className="floating-heart floating-heart--two" aria-hidden="true">♡</div>
      <SectionIntro
        number="02"
        eyebrow={content.memoriesIntro.eyebrow}
        title={<>{content.memoriesIntro.title}</>}
        description={content.memoriesIntro.description}
      />
      <div className="memories-grid">
        {content.memories.map((memory, index) => <MemoryCard key={memory.number} memory={memory} index={index} onSelect={onSelect} />)}
        <div className="memory-note-card">
          <FlowerDoodle />
          <p className="script-note">Fill these pages<br />with us.</p>
          <span className="memory-note-card__line" />
          <span className="memory-note-card__caption">your memories go here</span>
        </div>
      </div>
    </section>
  )
}

function Dreams() {
  return (
    <section className="dreams-section page-section" id="dreams">
      <div className="dreams-orbit dreams-orbit--one" />
      <div className="dreams-orbit dreams-orbit--two" />
      <SectionIntro
        number="03"
        eyebrow={content.dreams.label}
        title={<>{content.dreams.title}</>}
        description={content.dreams.description}
      />
      <div className="dreams-layout">
        <div className="dreams-copy">
          {content.dreams.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <span className="dreams-signature">{content.dreams.signature}</span>
        </div>
        <div className="dreams-highlights" aria-label="Things I believe about Janu">
          {content.dreams.highlights.map((highlight) => (
            <div className="dream-highlight" key={highlight.label}>
              <strong>{highlight.value}</strong>
              <span>{highlight.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Reasons() {
  const [revealed, setRevealed] = useState(new Set())

  const toggleReason = (number) => {
    setRevealed((current) => {
      const next = new Set(current)
      if (next.has(number)) next.delete(number)
      else next.add(number)
      return next
    })
  }

  return (
    <section className="reasons-section page-section" id="reasons">
      <div className="reasons-glow" />
      <SectionIntro
        number="04"
        eyebrow={content.reasonsIntro.eyebrow}
        title={<>21 reasons I<br /><em>love you.</em></>}
        description={content.reasonsIntro.description}
      />
      <div className="reasons-meta"><span>tap to reveal</span><span>01 — 21</span></div>
      <div className="reasons-grid">
        {content.reasons.map((reason, index) => {
          const isRevealed = revealed.has(reason.number)
          return (
            <button
              type="button"
              key={reason.number}
              className={`reason-card ${isRevealed ? 'reason-card--revealed' : ''}`}
              onClick={() => toggleReason(reason.number)}
              style={{ '--card-index': index }}
              aria-label={`${isRevealed ? 'Hide' : 'Reveal'} reason ${reason.number}: ${reason.title}`}
              aria-describedby={isRevealed ? `reason-message-${reason.number}` : undefined}
              aria-pressed={isRevealed}
            >
              <span className="reason-card__front" aria-hidden={isRevealed}><span>{reason.number}</span><HeartIcon /><small>tap me</small></span>
              <span className="reason-card__back" aria-hidden={!isRevealed}><span>{reason.number}</span><strong>{reason.title}</strong><small className="reason-card__message" id={`reason-message-${reason.number}`}>{reason.text}</small><small>tap to close</small></span>
            </button>
          )
        })}
      </div>
      <div className="reasons-footer"><span className="reasons-footer__script">and counting...</span><span className="reasons-footer__line" /><HeartIcon filled /><span>because 21 will never be enough</span></div>
    </section>
  )
}

function Letter({ isOpen, onOpen }) {
  const paperRef = useRef(null)

  useEffect(() => {
    if (isOpen) paperRef.current?.focus({ preventScroll: true })
  }, [isOpen])

  return (
    <section className="letter-section page-section" id="letter">
      <div className="letter-decor letter-decor--top" aria-hidden="true">♡</div>
      <div className="letter-decor letter-decor--bottom"><SparkleIcon /></div>
      <SectionIntro
        number="05"
        eyebrow={content.letter.label}
        title={<>A letter for<br /><em>your heart.</em></>}
        description={content.letter.description}
      />
      <div className="letter-stage">
        <div className={`letter-envelope ${isOpen ? 'letter-envelope--open' : ''}`}>
          <div className="letter-reveal" inert={!isOpen} aria-hidden={!isOpen}>
            <div className="letter-reveal__inner">
          <article className="letter-paper" id="personal-letter" ref={paperRef} tabIndex={isOpen ? -1 : undefined} aria-label="My letter to Janu">
            <div className="letter-paper__top"><span>11 · 10 · 2026</span><HeartIcon filled /></div>
            <p className="letter-greeting">{content.letter.greeting}</p>
            <div className="letter-copy">{content.letter.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div>
            <p className="letter-signoff">{content.letter.signoff}<br /><em>{content.letter.signature}</em></p>
          </article>
            </div>
          </div>
          <div className="letter-pocket"><span>for {content.herName}</span></div>
          <div className="letter-flap"><span>with love</span></div>
          <div className="letter-seal"><HeartIcon filled /></div>
        </div>
        <button type="button" className="button button--burgundy letter-open-button" onClick={onOpen} aria-expanded={isOpen} aria-controls="personal-letter">
          {isOpen ? 'Close my letter' : 'Open my letter'} <ArrowIcon />
        </button>
        <p className="letter-hint">{isOpen ? 'Read slowly. It is all meant for you.' : 'There is something I want you to know.'}</p>
      </div>
    </section>
  )
}

function SisterNote() {
  return (
    <section className="sister-section page-section" id="sister">
      <div className="sister-ribbon">with warmth ♡</div>
      <SectionIntro
        number="06"
        eyebrow={content.sister.label}
        title={<>{content.sister.title}</>}
        description={content.sister.description}
      />
      <div className="sister-note-wrap">
        <article className="sister-note-card">
          <div className="sister-note-card__top"><span>for someone Janu loves</span><HeartIcon filled /></div>
          <h3>{content.sister.greeting}</h3>
          <div className="sister-note-card__copy">
            {content.sister.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
          <span className="sister-note-card__signoff">With best wishes, for both of you</span>
        </article>
        <div className="sister-side-note">
          <FlowerDoodle />
          <p className="script-note">{content.sister.sideNote.split('\n').map((line) => <span key={line}>{line}<br /></span>)}</p>
          <span>keep cheering<br />for each other</span>
        </div>
      </div>
    </section>
  )
}

const confettiColors = ['#8e2940', '#d7a44a', '#f9ddd5', '#c35a69', '#f7efe5', '#563142']

function FinalSurprise({ isRevealed, onReveal }) {
  const dialogRef = useModal(isRevealed)

  return (
    <section className="final-section page-section" id="final">
      <div className="final-spotlight" />
      <div className="final-content">
        <p className="eyebrow eyebrow--light">{content.final.kicker}</p>
        <div className="final-sparkles"><SparkleIcon /><HeartIcon filled /><SparkleIcon /></div>
        <h2>{content.final.title.split('\n').map((line) => <span key={line}>{line}<br /></span>)}</h2>
        <p className="final-message">{content.final.message}</p>
        <button type="button" className="button button--cream" onClick={onReveal}>
          {content.final.button} <HeartIcon filled />
        </button>
      </div>
      <div className="final-footer"><span>07 / 07</span><span>the end is only another beginning</span><span>♡</span></div>

      {isRevealed && (
        <dialog ref={dialogRef} className="celebration" aria-labelledby="celebration-title" onCancel={(event) => { event.preventDefault(); onReveal() }} onClick={(event) => { if (event.target === event.currentTarget) onReveal() }}>
          <div className="celebration-glow" />
          <div className="confetti" aria-hidden="true">
            {Array.from({ length: 34 }, (_, index) => <span key={index} style={{ '--i': index, '--confetti-left': `${(index * 37) % 100}%`, '--confetti-color': confettiColors[index % confettiColors.length] }} />)}
          </div>
          <div className="celebration-card">
            <div className="celebration-card__icon"><HeartIcon filled /></div>
            <p className="eyebrow">for the birthday girl</p>
            <h3 id="celebration-title">{content.final.celebrationTitle.split('\n').map((line) => <span key={line}>{line}<br /></span>)}</h3>
            <p>{content.final.celebrationMessage}</p>
            <span className="celebration-card__signoff">{content.final.celebrationSignoff}</span>
            <button type="button" className="text-link" onClick={onReveal}>Keep this feeling close <ArrowIcon /></button>
          </div>
        </dialog>
      )}
    </section>
  )
}

function App() {
  const [isIntroOpen, setIsIntroOpen] = useState(false)
  const [selectedMemory, setSelectedMemory] = useState(null)
  const [isLetterOpen, setIsLetterOpen] = useState(false)
  const [isFinalRevealed, setIsFinalRevealed] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('intro-locked', !isIntroOpen || Boolean(selectedMemory) || isFinalRevealed)
    return () => document.body.classList.remove('intro-locked')
  }, [isIntroOpen, selectedMemory, isFinalRevealed])

  useEffect(() => {
    if (isIntroOpen) document.getElementById('hero')?.focus({ preventScroll: true })
  }, [isIntroOpen])

  const openIntro = () => {
    setIsIntroOpen(true)
  }

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })

  return (
    <div className="birthday-site">
      <Intro isOpen={isIntroOpen} onOpen={openIntro} />
      <div className={`site-content ${isIntroOpen ? 'site-content--ready' : ''}`} inert={!isIntroOpen}>
        <a className="skip-link" href="#hero">Skip to birthday wishes</a>
        <SiteHeader onFinalClick={() => scrollTo('final')} />
        <main>
          <Hero onBegin={() => scrollTo('memories')} />
          <Memories onSelect={setSelectedMemory} />
          <Dreams />
          <Reasons />
          <Letter isOpen={isLetterOpen} onOpen={() => setIsLetterOpen((open) => !open)} />
          <SisterNote />
          <FinalSurprise isRevealed={isFinalRevealed} onReveal={() => setIsFinalRevealed((revealed) => !revealed)} />
        </main>
      </div>
      <MemoryModal memory={selectedMemory} onClose={() => setSelectedMemory(null)} />
    </div>
  )
}

export default App
