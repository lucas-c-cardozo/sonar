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

// Cover Art Archive (MusicBrainz) — stable public URLs
// Format: https://coverartarchive.org/release/{mbid}/front-250
const covers = {
  damn: 'https://coverartarchive.org/release/2bb20e02-f9e8-4e6a-adba-27ef4a9dc8d0/front-250',
  blonde: 'https://coverartarchive.org/release/19cb409e-8eb5-4627-82e5-fb7212fc8e9a/front-250',
  sos: 'https://coverartarchive.org/release/f00f9e21-cd3a-44be-97b1-b5ef3c556938/front-250',
  flowerBoy: 'https://coverartarchive.org/release/cc36ea83-3de3-4f09-8912-9b09f5e7c0bb/front-250',
  unVerano: 'https://coverartarchive.org/release/eb6fb32a-0dce-459a-9714-a1ae9e7e04a9/front-250',
  renaissance: 'https://coverartarchive.org/release/39658e21-506a-45a2-a752-09f83ca5ac1f/front-250',
  gnx: 'https://coverartarchive.org/release/e3e91ec3-3fdb-4d58-8cba-cb7f20df50a5/front-250',
  chromakopia: 'https://coverartarchive.org/release/f5c83cbe-d06c-43e3-991f-f3adfd02bfe2/front-250',
  inRainbows: 'https://coverartarchive.org/release/ce2887e6-ceca-4bb0-b059-cc6364e62134/front-250',
  currents: 'https://coverartarchive.org/release/f83dbf5a-12c0-493d-b8e0-9bcfe9e5ccaa/front-250',
  swimming: 'https://coverartarchive.org/release/39a48619-8397-47b0-9c09-5290cd9f6aa0/front-250',
  channelOrange: 'https://coverartarchive.org/release/2e7c3c14-5fb6-47d8-b40e-e92c80b1f447/front-250',
  twiceAsTall: 'https://coverartarchive.org/release/c42ed87a-d747-4809-8c0e-e56a1e73c8be/front-250',
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
    coverUrl: covers.blonde,
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
    coverUrl: covers.sos,
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
    coverUrl: covers.unVerano,
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
    coverUrl: covers.renaissance,
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
    coverUrl: covers.gnx,
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
    coverUrl: covers.inRainbows,
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
    coverUrl: covers.currents,
    genres: ['Rock', 'Eletrônico', 'Indie'],
    tags: ['clássico', 'relaxar'],
    lists: ['Lista de Desejos'],
  },
  {
    id: '12',
    title: 'Swimming',
    artists: ['Mac Miller'],
    type: 'Álbum',
    coverUrl: covers.swimming,
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
    coverUrl: covers.channelOrange,
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
    coverUrl: covers.twiceAsTall,
    genres: ['Afrobeats', 'R&B'],
    tags: ['novo', 'relaxar'],
    lists: ['Ouvidos'],
    recommendedBy: ['João'],
  },
];
