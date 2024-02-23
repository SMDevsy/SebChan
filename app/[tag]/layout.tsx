import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div>
      <Link href={"/"}>Back to Home</Link>
      {children}
    </div>
  );
}
