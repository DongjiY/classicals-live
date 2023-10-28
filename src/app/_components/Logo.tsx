import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/">
      <picture>
        <source
          srcSet="/classicalslivelogodark.svg"
          media="(prefers-color-scheme: dark)"
        />

        <img src="/classicalslivelogo.svg" />
      </picture>
    </Link>
  );
}
