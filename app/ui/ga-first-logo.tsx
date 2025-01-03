import Image from 'next/image';

export function GAFirstLogo() {
  return (
    <Image
        src="/gafirstlogo.png"
        width={1000}
        height={760}
        className="hidden md:block"
        alt="GA FIRST Logo"
    />
  );
}

export function GAFirstLogoDark() {
  return (
    <Image
        src="/gafirstlogodark.png"
        width={1000}
        height={760}
        className="hidden md:block"
        alt="GA FIRST Logo"
    />
  );
}

export function BadgeLogo() {
  return (
    <Image
      src="/blackandwhitetall.png"
      width={250}
      height={285}
      className="hidden md:block"
      alt="FIRST Dive Logo"
    />
  )
}
