export default function HeaderButton({ url, imgName }) {
  const imgSrc = "./src/public/" + imgName;
  return (
    <a href={url} className=" hover:opacity-50 transition-opacity duration-300">
      <img src={imgSrc} alt={imgName} className="max-w-8"></img>
    </a>
  );
}
