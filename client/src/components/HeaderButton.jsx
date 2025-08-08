export default function HeaderButton({ url, alt, src}) {
  return (
    <a href={url} className=" hover:opacity-50 transition-opacity duration-300">
      <img src={src} alt={alt} className="max-w-8"></img>
    </a>
  );
}
