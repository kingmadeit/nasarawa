import Image from "next/image";
import Link from "next/link";

export function Logo() {
  return (
    <Link href="/" data-entrance="logo" className="mb-12 self-start">
      <Image
        src="/images/logo.png"
        alt="Nasarawa"
        width={96}
        height={96}
        className="h-20 w-10"
        priority
      />
    </Link>
  );
}
