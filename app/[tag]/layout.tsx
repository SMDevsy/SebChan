import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div>
      {children}
      <Link href={"/"}>Back to Home</Link>
    </div>
  );
}
