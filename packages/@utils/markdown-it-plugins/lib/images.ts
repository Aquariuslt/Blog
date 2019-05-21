import * as _ from 'lodash';

function detectImages(md): void {
  md.core.ruler.push('detect_images', (state): void => {
    const tokens = state.tokens;
    const images: string[] = [];

    tokens.map((token): void => {
      if (token.type === 'inline') {
        if (token.children) {
          token.children.map((childToken): void => {
            if (childToken.type === 'image') {
              childToken.attrs.map((imageAttr): void => {
                if (_.isArray(imageAttr) && imageAttr.length > 1 && imageAttr[0] === 'src') {
                  const imageUrl = imageAttr[1];
                  images.push(imageUrl);
                }
              });
            }
          });
        }
      }
    });

    if (state.env) {
      state.env.images = images;
    }
  });
}

export default detectImages;
