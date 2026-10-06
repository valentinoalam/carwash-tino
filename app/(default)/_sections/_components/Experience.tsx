const MOMENTS = [
  { title: "Book in a minute", body: "Pick your vehicle and service on this page, or message us on WhatsApp." },
  { title: "Photo updates as we go", body: "You get a picture at each stage, so you're never guessing what's happening." },
  { title: "Pick up under the lights", body: "We walk around the car with you before you pay, and fix anything you spot." },
];

const QUOTES = [
  { text: "I didn't recognise my own car in the lot.", author: "Dimas, black SUV" },
  { text: "The wheels were the part I'd given up on. They look new.", author: "Rina, city hatchback" },
  { text: "Water just rolls off it now. Best decision I made this year.", author: "Arif, sedan with ceramic coating" },
];

export default function Experience() {
  return (
    <section id="experience" className="sec exp">
      <div className="wrap">
        <h2 className="h2">Drop it off. Come back to a different car.</h2>
        <ol className="moments">
          {MOMENTS.map((m) => (
            <li key={m.title}>
              <h3>{m.title}</h3>
              <p>{m.body}</p>
            </li>
          ))}
        </ol>
        <div className="quotes">
          {QUOTES.map((q) => (
            <figure className="quote" key={q.author}>
              <blockquote>{q.text}</blockquote>
              <figcaption>{q.author}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
