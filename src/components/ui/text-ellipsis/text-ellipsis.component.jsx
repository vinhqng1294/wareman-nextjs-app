import { objectIsNotNull } from '@/utils/commons/validateNotEmpty.utils';

const TextEllipsis = function ({
  textFormat,
  textWrapperFormat,
  content,
  customTextStyles,
  ...props
}) {
  const {} = props;

  return (
    <div
      className={`flex flex-nowrap truncate`.concat(
        textWrapperFormat ? ` ${textWrapperFormat}` : ``
      )}
    >
      <p
        className={`flex-nowrap w-full overflow-hidden overflow-ellipsis`.concat(
          textFormat ? ` ${textFormat}` : ` text-sm text-dark`
        )}
        style={objectIsNotNull(customTextStyles) ? customTextStyles : {}}
      >
        {content}
      </p>
    </div>
  );
};

export default TextEllipsis;

// Usage example

{
  /* <TextEllipsis
  content={`${productData?.name}`}
  textFormat={`text-dark whitespace-pre-wrap`.concat(` text-xs`)}
  customTextStyles={{
    WebkitLineClamp: 3,
    display: `-webkit-box`,
    WebkitBoxOrient: `vertical`,
  }}
/>; */
}
