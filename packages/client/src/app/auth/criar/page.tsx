import { Card, CardSubtitle, CardTitle, PageTitle } from "@components";
import { Button } from "@components/button";

const Create = () => {
  return (
    <div className="grid gap-6">
      <PageTitle
        title="Escolha a sua classe"
        subtitle="Usaremos isso para modificar a sua experiência na Repi."
      />
      <div className="flex gap-6">
        <Card>
          <CardTitle tag="h2">Bixo</CardTitle>
          <CardSubtitle>Quero encontrar uma república</CardSubtitle>
        </Card>
        <Card>
          <CardTitle tag="h2">República</CardTitle>
          <CardSubtitle>Quero divulgar minha república</CardSubtitle>
        </Card>
      </div>
    </div>
  );
};

export default Create;
