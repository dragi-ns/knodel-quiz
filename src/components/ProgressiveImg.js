import { useState, useEffect } from 'react';
import classNames from 'classnames';

function ProgressiveImg({ placeholderSrc, src, ...props }) {
  const [imgSrc, setImgSrc] = useState(placeholderSrc || src);

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      setImgSrc(src);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  return (
    <img
      {...{ src: imgSrc, ...props }}
      alt={props.alt || ''}
      className={classNames({
        loading: placeholderSrc && imgSrc === placeholderSrc,
        loaded: placeholderSrc && imgSrc !== placeholderSrc,
      })}
    />
  );
}
export default ProgressiveImg;
