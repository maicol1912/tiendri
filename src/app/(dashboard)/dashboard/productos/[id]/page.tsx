export default function EditProductoPage({
  params,
}: {
  params: { id: string };
}) {
  return <div>Edit Producto: {params.id}</div>;
}
