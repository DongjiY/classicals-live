import Link from "next/link";

export default function Logo({
  forceLight,
  forceDark,
}: {
  forceLight?: boolean;
  forceDark?: boolean;
}) {
  if (forceLight) {
    return (
      <Link href="/">
        <img src="/classicalslivelogo.svg" />
      </Link>
    );
  } else if (forceDark) {
    return (
      <Link href="/">
        <img src="/classicalslivelogodark.svg" />
      </Link>
    );
  } else {
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
}
