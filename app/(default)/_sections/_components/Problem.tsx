const FACTS = [
  {
    title: "Road film dulls paint",
    body: "A thin layer of traffic film, tar and dust holds moisture against the clear coat and flattens the shine long before you notice damage.",
  },
  {
    title: "Brake dust bites wheels",
    body: "Hot metallic dust bonds to wheel finishes. The longer it sits, the harder it is to lift.",
  },
  {
    title: "Water spots etch",
    body: "Rain and hard water dry into mineral rings that can mark glass and paint if they're left.",
  },
];

export default function Problem() {
  return (
    <section id="problem" className="sec problem">
      <div className="wrap">
        <div className="problem-in">
          <h2 className="h2">Dirt does more than look bad.</h2>
          <ul className="facts">
            {FACTS.map((f) => (
              <li key={f.title}>
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
