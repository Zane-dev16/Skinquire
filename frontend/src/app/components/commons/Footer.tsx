import Link from "next/link";
const Footer = () => {
  return (
    <div>
      <h1>FOOTER</h1>
      <Link href="/terms-and-conditions">TERMS AND CONDITIONS</Link>
      <br />
      <Link href="/privacy-policy">PRIVACY POLICY</Link>
    </div>
  );
};

export default Footer;