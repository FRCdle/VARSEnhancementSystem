import Image from 'next/image';

export default function GAFirstLogo() {
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
