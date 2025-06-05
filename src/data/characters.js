// Character definitions for the RPG display system

export const CHARACTERS = {
  grandfather: {
    id: 'grandfather',
    name: 'おじいさん',
    variants: {
      default: {
        image: `${process.env.PUBLIC_URL}/assets/characters/grandfather/default.png`,
        placeholder: 'おじいさん\n👴',
        bgColor: '#f5deb3'
      },
      happy: {
        image: `${process.env.PUBLIC_URL}/assets/characters/grandfather/happy.png`,
        placeholder: 'おじいさん\n😊👴',
        bgColor: '#f5deb3'
      }
    }
  },
  
  grandmother: {
    id: 'grandmother', 
    name: 'おばあさん',
    variants: {
      default: {
        image: `${process.env.PUBLIC_URL}/assets/characters/grandmother/default.png`,
        placeholder: 'おばあさん\n👵',
        bgColor: '#f0e6d2'
      },
      happy: {
        image: `${process.env.PUBLIC_URL}/assets/characters/grandmother/happy.png`,
        placeholder: 'おばあさん\n😊👵',
        bgColor: '#f0e6d2'
      },
    }
  },
  
  amber: {
    id: 'amber',
    name: 'アンバー',
    variants: {
      default: {
        image: `${process.env.PUBLIC_URL}/assets/characters/amber/default.png`,
        placeholder: 'アンバー\n🐱',
        bgColor: '#ffe4b5'
      },
      happy: {
        image: `${process.env.PUBLIC_URL}/assets/characters/amber/happy.png`,
        placeholder: 'アンバー\n🐱',
        bgColor: '#ffe4b5'
      },
      with_kasa: {
        image: `${process.env.PUBLIC_URL}/assets/characters/amber/with_kasa.png`,
        placeholder: 'アンバー\n🐱',
        bgColor: '#ffe4b5'
      },
      holding_poster: {
        image: `${process.env.PUBLIC_URL}/assets/characters/amber/holding_poster.png`,
        placeholder: 'アンバー\n🐱',
        bgColor: '#ffe4b5'
      }
    }
  },
  
  jizo: {
    id: 'jizo',
    name: 'おじぞうさん',
    variants: {
      default: {
        image: `${process.env.PUBLIC_URL}/assets/characters/jizo/default.png`,
        placeholder: 'おじぞうさん\n🗿',
        bgColor: '#d3d3d3'
      },
      with_kasa: {
        image: `${process.env.PUBLIC_URL}/assets/characters/jizo/with_kasa.png`,
        placeholder: 'おじぞうさん\n🗿',
        bgColor: '#d3d3d3'
      },
      holding_phone: {
        image: `${process.env.PUBLIC_URL}/assets/characters/jizo/holding_phone.png`,
        placeholder: 'おじぞうさん\n📱',
        bgColor: '#d3d3d3'
      },
      holding_magic: {
        image: `${process.env.PUBLIC_URL}/assets/characters/jizo/holding_magic.png`,
        placeholder: 'おじぞうさん\n🪄',
        bgColor: '#d3d3d3'
      }
    }
  }
};

// Helper function to get character info with variant support
export const getCharacter = (characterId, variant = 'default') => {
  const character = CHARACTERS[characterId] || CHARACTERS.narrator;
  const characterVariant = character.variants[variant] || character.variants.default;
  
  return {
    id: character.id,
    name: character.name,
    ...characterVariant
  };
};

// Helper function to create character data for route groups with variant support
export const createCharacterConfig = (
  leftCharId = null, 
  rightCharId = null, 
  leftVisible = true, 
  rightVisible = true,
  leftVariant = 'default',
  rightVariant = 'default'
) => {
  return {
    left: leftVisible ? leftCharId : null,
    right: rightVisible ? rightCharId : null,
    leftVariant: leftVariant,
    rightVariant: rightVariant,
    visible: {
      left: leftVisible,
      right: rightVisible
    }
  };
};

// Convenience function for quick character setup with variants
export const createCharacterVariant = (characterId, variant = 'default') => {
  return { id: characterId, variant: variant };
};

// Helper to create config with character variant objects
export const createCharacterConfigWithVariants = (
  leftChar = null,    // { id: 'characterId', variant: 'variantName' } or null
  rightChar = null,   // { id: 'characterId', variant: 'variantName' } or null
  leftVisible = true,
  rightVisible = true
) => {
  return {
    left: leftVisible && leftChar ? leftChar.id : null,
    right: rightVisible && rightChar ? rightChar.id : null,
    leftVariant: leftChar?.variant || 'default',
    rightVariant: rightChar?.variant || 'default',
    visible: {
      left: leftVisible,
      right: rightVisible
    }
  };
};

// Pixel art scaling configurations
export const PIXEL_ART_SCALING = {
  CONTAIN: 'contain',    // Fit within bounds, maintain aspect ratio (recommended for most cases)
  COVER: 'cover',        // Fill entire area, may crop image
  FILL: 'fill',          // Stretch to fill exactly (may distort)
  SCALE_DOWN: 'scale-down', // Like contain but won't scale up
  NONE: 'none'           // Use original size
};

// Create character variant with scaling options for pixel art
export const createPixelArtVariant = (characterId, variant = 'default', scaling = PIXEL_ART_SCALING.CONTAIN) => {
  return { 
    id: characterId, 
    variant: variant,
    pixelArt: true,
    scaling: scaling
  };
};

// Enhanced character config for pixel art with custom scaling
export const createPixelArtConfig = (
  leftChar = null,    // Use createPixelArtVariant() for pixel art characters
  rightChar = null,   // Use createPixelArtVariant() for pixel art characters  
  leftVisible = true,
  rightVisible = true
) => {
  return {
    left: leftVisible && leftChar ? leftChar.id : null,
    right: rightVisible && rightChar ? rightChar.id : null,
    leftVariant: leftChar?.variant || 'default',
    rightVariant: rightChar?.variant || 'default',
    leftScaling: leftChar?.scaling || PIXEL_ART_SCALING.CONTAIN,
    rightScaling: rightChar?.scaling || PIXEL_ART_SCALING.CONTAIN,
    leftPixelArt: leftChar?.pixelArt || false,
    rightPixelArt: rightChar?.pixelArt || false,
    visible: {
      left: leftVisible,
      right: rightVisible
    }
  };
}; 