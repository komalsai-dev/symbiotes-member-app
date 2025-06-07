import { redirect } from "next/navigation";

export default function Page() {
  redirect("/main/settings/general");
  return null;
}
