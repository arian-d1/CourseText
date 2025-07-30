export default function HeaderButton({ url, imgName }) {
  const imgSrc = "./src/public/" + imgName;
  return (
    <a href={url}>
      <img src={imgSrc} alt={imgName} className="max-w-8"></img>
    </a>
  );
}
