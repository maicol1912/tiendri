import { redirect } from "next/navigation";

// Banners are now configured from the "Contenido Principal" tab in Configuracion.
// This page redirects to avoid stale bookmarks.

export default function BannersPage() {
  redirect("/dashboard/configuracion");
}
