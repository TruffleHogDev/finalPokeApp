// $.tsx
import { redirect } from "@remix-run/node";

export const clientLoader = async () => {
  // Redirect to _index.tsx
  return redirect("/app/routes/_index.tsx"); // Adjust the path as necessary
};

export default function CatchAllRoute() {
  // This component can remain empty as it will redirect before rendering
  return null;
}
