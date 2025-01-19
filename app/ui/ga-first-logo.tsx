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

export function GAFirstLogoWhite() {
  return (
    <Image
        src="/gafirstlogowhite.png"
        width={1000}
        height={760}
        className="md:block"
        alt="GA FIRST Logo"
    />
  );
}

