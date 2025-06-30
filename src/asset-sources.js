import { AssetSrc } from './const';

export function imageSrc(imageName, source) {
  switch (source) {
    case AssetSrc.aceship:
      return `${source}/avg/images/${imageName}.png`;
    case AssetSrc.arkwaifu:
      return source.replace(/REPLACEME/, imageName);
    case AssetSrc.fexli:
      return `${source}/avgs/${imageName}.png`;
    default:
      return `${AssetSrc.akgcc}/torappu/dynamicassets/avg/images/${imageName}.png`.toLowerCase();
  }
}

export function backgroundSrc(imageName, source) {
  switch (source) {
    case AssetSrc.aceship:
      return `${source}/avg/backgrounds/${imageName}.png`;
    case AssetSrc.arkwaifu:
      return source.replace(/REPLACEME/, imageName);
    case AssetSrc.fexli:
      return `${source}/avgs/bg/${imageName}.png`;
    default:
      return `${AssetSrc.akgcc}/torappu/dynamicassets/avg/backgrounds/${imageName}.png`.toLowerCase();
  }
}

export function avatarImageSrc(charId, source) {
  switch (source) {
    case AssetSrc.aceship:
      return `${source}/avatars/${charId}.png`;
    case AssetSrc.fexli:
      return `${source}/avatar/ASSISTANT/${charId}.png`;
    default:
      return `${AssetSrc.akgcc}/torappu/dynamicassets/arts/charavatars/${charId}.png`.toLowerCase();
  }
}

export function charImageSrc(imageName, source) {
  const { id, face, body } = destructure(imageName);
  const faceAndBody = encodeURIComponent(`#${face}$${body}`);

  switch (source) {
    case AssetSrc.aceship:
      return `${source}/avg/characters/${id}${faceAndBody}.png`;
    case AssetSrc.arkwaifu:
      return source.replace(/REPLACEME/, `${id}${faceAndBody}`);
    case AssetSrc.fexli:
      return `${source}/charpack/${id}${faceAndBody}.png`;
    default:
      return `${AssetSrc.akgcc}/avg/characters/${id}${faceAndBody}.png`.toLowerCase();
  }
}

export function charArtSrc(imageName, source) {
  switch (source) {
    case AssetSrc.fexli:
    default:
      return `${AssetSrc.fexli}/charpack/${imageName.replace(/[#@]/g, '_')}.png`;
  }
}

export function charSkinPortraitSrc(imageName, source) {
  switch (source) {
    case AssetSrc.fexli:
    default:
      return `${AssetSrc.fexli}/charpor/${imageName.toLowerCase().replace(/[#@]/g, '_')}.png`;
  }
}


export function skinLogoSrc(imageName, source) {
  const fixedSkinLogo = imageName => {
    const ImgNameReplacements = {
      '2021#boc#2': '2021#boc#2_deco',
      '2024#sale#3': '2023#sale#2',
    };
    const fixedImageName = ImgNameReplacements[imageName] ? imageName.replace(imageName, ImgNameReplacements[imageName]) : imageName;
    return encodeURIComponent(fixedImageName);
  };
  switch (source) {
    case AssetSrc.akassets:
    default:
      switch (imageName) {
        case 'ILLUST_0':
          return;
        case 'ILLUST_2':
          return `${AssetSrc.akassets}/torappu/dynamicassets/arts/elite_hub/elite_2_large.png`;
        default:
          return `${AssetSrc.akassets}/torappu/dynamicassets/ui/skin/${fixedSkinLogo(imageName)}.png`;
      }
  }
}

export function musicSrc(path, source) {
  switch (source) {
    case AssetSrc.akgcc:
    default:
      return `${AssetSrc.akgcc}/torappu/dynamicassets/audio/${path.toLowerCase()}.mp3`;
  }
}

function destructure(name) {
  // eslint-disable-next-line no-unused-vars
  const [_, id, face='1', body='1'] = name.match(/^([^#^$]+)(?:#(\d+))?(?:\$(\d+))?$/);
  return {
    id,
    face: face.replace(/^0+/, ''),
    body: body.replace(/^0+/, ''),
  };
}
