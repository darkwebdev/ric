import { charSkinPortraitSrc, skinLogoSrc } from '../../img-sources';

export const Skin = ({
  portraitId,
  skinName,
  isSelected,
  skinGroupId,
  Tag = 'div',
  ...rest
}) => {
  const skinLogo = skinLogoSrc(skinGroupId);
  const imageSource = charSkinPortraitSrc(portraitId);
  return <Tag
    {...rest}
    key={portraitId}
    className={`operator-skin ${isSelected ? 'selected' : ''}`}
    style={{ backgroundImage: `url("${imageSource}")` }}
  >
    <div
      className="operator-skin-reflect"
      style={{ backgroundImage: `url("${imageSource}")` }}
    />
    {skinLogo && (
      <div
        className="skin-logo"
        style={{ backgroundImage: `url("${skinLogo}")` }}
      >
        <span className="skin-name">{skinName}</span>
      </div>
    )}
  </Tag>
}
