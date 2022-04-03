import fontCredits from '../assets/fonts/credits.json'

const softwareCredits = {
  "shell": "heyshell.xyz",
  "Blob SVG": "@Smitche on codepen.io"
}

const sponsorCredits = {
  "Playgrounds": "playgrounds.wtf"
}

function CreditsBlock({ json, title, color }: { json: any, title: string, color: string }) {
  return (
    <div className="block">
      <h3 className={`subtitle is-3 has-text-${color}`}>{title}</h3>
      <div className="block">
        {Object.keys(json).map((s, i) => {
          return (
            <div key={i}>
              <span className={`is-italic has-text-${color}`}>{s}</span>
              {` – ${Object.values(json)[i]}`}
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default () => {
  return (
    <section className="section pt-3">
      <CreditsBlock json={fontCredits} title="Fonts" color="green" />
      <CreditsBlock json={softwareCredits} title="Software" color="pink" />
      <CreditsBlock json={sponsorCredits} title="Sponsors" color="pink" />
    </section>
  )
}