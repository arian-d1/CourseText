export default function HeaderButton({ url, imgSrc }) {
  return (
    <a href={url}>
      <img src={imgSrc}></img>
    </a>
  );
}
