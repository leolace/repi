import { RepHeader, InfoCards, Content } from "./_compose";

export default function Page() {
  return (
    <section className="grid gap-16">
      <RepHeader />
      <InfoCards />
      <Content />
    </section>
  );
}
