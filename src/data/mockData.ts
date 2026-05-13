import { IItem } from '@/types/item';

export const mockGenres = [
  'Hip-Hop', 'R&B', 'Jazz', 'Soul', 'Pop', 'Rock', 'Eletrônico',
  'Indie', 'Lo-fi', 'Funk', 'Reggae', 'MPB', 'Sertanejo', 'Trap',
  'Alternative', 'Afrobeats', 'Drill', 'Neo Soul',
];

export const mockTags = [
  'favorites', 'viagem', 'estudo', 'treino', 'relaxar', 'festa',
  'melancolia', 'euforia', 'clássico', 'novo', 'raro', 'cult',
  'mainstream', 'underground', 'instrumental', 'ao vivo',
];

export const mockArtists = [
  'Kendrick Lamar', 'Frank Ocean', 'SZA', 'Tyler, the Creator',
  'Bad Bunny', 'Beyoncé', 'The Weeknd', 'Burna Boy',
  'Anitta', 'Caetano Veloso', 'Gilberto Gil', 'Djonga',
  'BROCKHAMPTON', 'Billie Eilish', 'Lana Del Rey', 'PJ Harvey',
  'Radiohead', 'Tame Impala', 'Mac Miller', 'J. Cole',
];

export const mockRecommenders = [
  'Lucas', 'Ana', 'Pedro', 'Maria', 'João', 'Carla', 'Felipe', 'Beatriz',
];

// Pitchfork CDN (media.pitchfork.com) — extracted directly from review page HTML
const BASE = 'https://media.pitchfork.com/photos';
const covers = {
  // Confirmed — found in Pitchfork page sidebars
  damn:        `${BASE}/5929c3e8eb335119a49ed80f/1:1/w_300,c_limit/31d2b6fd.jpg`,
  flowerBoy:   `${BASE}/59663e05ec814a1a5898c3a3/1:1/w_300,c_limit/tyler-the-creator-flower-boy-cover-1.jpg`,
  chromakopia: `${BASE}/671f8c1e86725d26e919a455/1:1/w_300,c_limit/Tyler-the-Creator-Chromakopia.jpg`,
  // Unconfirmed — URLs not found; items will render without cover
  blonde:       undefined,
  sos:          undefined,
  unVerano:     undefined,
  renaissance:  undefined,
  gnx:          undefined,
  inRainbows:   undefined,
  currents:     undefined,
  swimming:     undefined,
  channelOrange: undefined,
  twiceAsTall:  undefined,
};

export const mockItems: IItem[] = [
  // Em Rotação
  {
    id: '1',
    title: 'DAMN.',
    artists: ['Kendrick Lamar'],
    type: 'Álbum',
    coverUrl: covers.damn,
    genres: ['Hip-Hop', 'Trap'],
    tags: ['favorites', 'clássico'],
    lists: ['Em Rotação'],
    recommendedBy: ['Lucas'],
  },
  {
    id: '2',
    title: 'Blonde',
    artists: ['Frank Ocean'],
    type: 'Álbum',
    genres: ['R&B', 'Neo Soul', 'Alternative'],
    tags: ['favorites', 'melancolia', 'cult'],
    lists: ['Em Rotação'],
    recommendedBy: ['Ana', 'Pedro'],
  },
  {
    id: '3',
    title: 'SOS',
    artists: ['SZA'],
    type: 'Álbum',
    genres: ['R&B', 'Pop', 'Neo Soul'],
    tags: ['favorites', 'novo'],
    lists: ['Em Rotação', 'Recomendações'],
    recommendedBy: ['Maria'],
  },

  // Recomendações
  {
    id: '4',
    title: 'Flower Boy',
    artists: ['Tyler, the Creator'],
    type: 'Álbum',
    coverUrl: covers.flowerBoy,
    genres: ['Hip-Hop', 'Indie', 'Pop'],
    tags: ['cult', 'melancolia'],
    lists: ['Recomendações'],
    recommendedBy: ['Felipe'],
  },
  {
    id: '5',
    title: 'Un Verano Sin Ti',
    artists: ['Bad Bunny'],
    type: 'Álbum',
    genres: ['Reggae', 'Trap', 'Pop'],
    tags: ['festa', 'novo'],
    lists: ['Recomendações'],
    recommendedBy: ['Carla', 'João'],
  },
  {
    id: '6',
    title: 'Renaissance',
    artists: ['Beyoncé'],
    type: 'Álbum',
    genres: ['Eletrônico', 'Funk', 'R&B'],
    tags: ['festa', 'euforia'],
    lists: ['Recomendações'],
    recommendedBy: ['Beatriz'],
  },

  // Lançamentos Recentes
  {
    id: '7',
    title: 'GNX',
    artists: ['Kendrick Lamar'],
    type: 'Álbum',
    genres: ['Hip-Hop', 'Trap', 'Alternative'],
    tags: ['novo', 'favorites'],
    lists: ['Lançamentos Recentes'],
  },
  {
    id: '8',
    title: 'Chromakopia',
    artists: ['Tyler, the Creator'],
    type: 'Álbum',
    coverUrl: covers.chromakopia,
    genres: ['Hip-Hop', 'Neo Soul', 'Alternative'],
    tags: ['novo', 'euforia'],
    lists: ['Lançamentos Recentes'],
    recommendedBy: ['Lucas'],
  },
  {
    id: '9',
    title: 'Folha de São Paulo',
    artists: ['Djonga'],
    type: 'Single',
    genres: ['Hip-Hop', 'MPB'],
    tags: ['novo', 'underground'],
    lists: ['Lançamentos Recentes'],
  },

  // Lista de Desejos
  {
    id: '10',
    title: 'In Rainbows',
    artists: ['Radiohead'],
    type: 'Álbum',
    genres: ['Rock', 'Alternative', 'Eletrônico'],
    tags: ['clássico', 'cult', 'melancolia'],
    lists: ['Lista de Desejos'],
    recommendedBy: ['Pedro'],
  },
  {
    id: '11',
    title: 'Currents',
    artists: ['Tame Impala'],
    type: 'Álbum',
    genres: ['Rock', 'Eletrônico', 'Indie'],
    tags: ['clássico', 'relaxar'],
    lists: ['Lista de Desejos'],
  },
  {
    id: '12',
    title: 'Swimming',
    artists: ['Mac Miller'],
    type: 'Álbum',
    genres: ['Hip-Hop', 'Neo Soul', 'Jazz'],
    tags: ['melancolia', 'favorites', 'cult'],
    lists: ['Lista de Desejos'],
    recommendedBy: ['Ana'],
  },

  // Ouvidos
  {
    id: '13',
    title: 'channel ORANGE',
    artists: ['Frank Ocean'],
    type: 'Álbum',
    genres: ['R&B', 'Soul', 'Pop'],
    tags: ['clássico', 'favorites'],
    lists: ['Ouvidos'],
    recommendedBy: ['Maria', 'Felipe'],
  },
  {
    id: '14',
    title: 'Ladrão',
    artists: ['Djonga'],
    type: 'Álbum',
    genres: ['Hip-Hop', 'Trap', 'MPB'],
    tags: ['underground', 'cult'],
    lists: ['Ouvidos'],
  },
  {
    id: '15',
    title: 'Twice as Tall',
    artists: ['Burna Boy'],
    type: 'Álbum',
    genres: ['Afrobeats', 'R&B'],
    tags: ['novo', 'relaxar'],
    lists: ['Ouvidos'],
    recommendedBy: ['João'],
  },
];
