export default function StorefrontPage({
  params,
}: {
  params: { slug: string };
}) {
  return <div>Storefront: {params.slug}</div>;
}
