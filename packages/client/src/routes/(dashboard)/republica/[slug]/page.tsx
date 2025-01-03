interface Params {
  slug: string;
}

export default async function Page({ params }: { params: Promise<Params> }) {
  const { slug } = await params;

  return <div>slug {slug}</div>;
}
